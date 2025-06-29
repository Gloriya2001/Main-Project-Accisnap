from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import cv2
import json
import ffmpeg
import logging
import uuid
import time
from ultralytics import YOLO  
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# ✅ Configure Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ✅ Define Directories
UPLOAD_FOLDER = "videoUploads"
CLIPS_FOLDER = "detectedAccidentsFromVideo"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CLIPS_FOLDER, exist_ok=True)

# Serve accident clips to frontend
app.mount("/clips", StaticFiles(directory=CLIPS_FOLDER), name="clips")



# ✅ Load the accident detection model
model = YOLO("best.pt")  # Replace with your trained model path

# ✅ CORS Middleware (Allows Frontend Requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Logging Middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Logs incoming requests for debugging."""
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response


def extract_clip(video_path, start_time, duration=10):
    """Extracts a clip from the video at the given timestamp."""
    clip_filename = f"accidentDetected_{int(time.time())}.mp4"
    clip_path = os.path.join(CLIPS_FOLDER, clip_filename)
    try:
        ffmpeg.input(video_path, ss=start_time, t=duration).output(clip_path).run(overwrite_output=True, quiet=True)
        return clip_path
    except Exception as e:
        logger.error(f"Error extracting clip: {e}")
        return None


CONFIDENCE_THRESHOLD = 0.6  # Adjust as needed


def process_full_video(video_path):
    """Processes the entire video for accident detection."""
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        logger.error("Error: Unable to open video file")
        return {"error": "Unable to open video file"}

    fps = cap.get(cv2.CAP_PROP_FPS) or 30  
    frame_no = 0
    detected_accidents = []
    last_detected_time = -10

    try:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            frame_no += 1
            timestamp = frame_no / fps

            # Run YOLO model
            results = model(frame)
            
            accident_detected = False
            confidence_score = 0

            for result in results:
                if result.boxes is not None:
                    for box in result.boxes:
                        confidence = box.conf.item()  # Extract confidence score
                        if confidence >= CONFIDENCE_THRESHOLD:
                            accident_detected = True
                            confidence_score = confidence
                            break

            if accident_detected and timestamp - last_detected_time >= 5:
                last_detected_time = timestamp
                clip_path = extract_clip(video_path, timestamp)

                if clip_path:
                    clip_url = f"http://localhost:8080/clips/{os.path.basename(clip_path)}"  # ✅ Send clip URL to frontend
                    detected_accidents.append({
                        "message": "Accident detected!",
                        "timestamp": timestamp,
                        "clip_url": clip_url,  # ✅ Return clip URL
                        "confidence": confidence_score
                    })

        return {"message": "Processing complete", "detected_accidents": detected_accidents}

    except Exception as e:
        logger.error(f"Error processing video: {e}")
        return {"error": str(e)}

    finally:
        cap.release()



@app.post("/upload-video")
async def detect_accidents_api(video: UploadFile = File(...), email: str = Form(...)):
    """Handles video upload, saves it, and starts accident detection."""
    timestamp = int(time.time())
    video_filename = f"uploadedVideo_{timestamp}.mp4"
    video_path = os.path.join(UPLOAD_FOLDER, video_filename)

    try:
        # Save video
        with open(video_path, "wb") as f:
            f.write(await video.read())

        # Process the entire video
        result = process_full_video(video_path)

        return JSONResponse(content={"message": "Video processed successfully", "result": result})

    except Exception as e:
        logger.error(f"Upload failed: {e}")
        return JSONResponse(content={"error": "Failed to process video"}, status_code=500)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
