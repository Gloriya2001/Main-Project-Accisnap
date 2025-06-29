from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import cv2
import uvicorn
from ultralytics import YOLO
import asyncio
import os
import subprocess
import time
from datetime import datetime
from fastapi.staticfiles import StaticFiles
import requests

import httpx

app = FastAPI()

# Store active camera streams
active_cameras = {}

# Store active WebSocket connections (one per camera_id)
active_websockets = {}

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict origins appropriately
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLOv8s model
model = YOLO("test/best.pt")

# Create folder for accident clips if it doesn't exist
accident_clip_folder = "liveAccidentClips"
os.makedirs(accident_clip_folder, exist_ok=True)


app.mount("/liveAccidentClips", StaticFiles(directory=os.path.abspath("liveAccidentClips")), name="videos")



# Pydantic models
class CameraConnectionRequest(BaseModel):
    cameraId: str
    url: str

class StopCameraRequest(BaseModel):
    cameraId: str



async def send_accident_details(camera_id, video_filename):
    express_api_url = "http://localhost:5000/live-accidents"
    data = {"cameraId": camera_id, "accidentClip": video_filename}
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(express_api_url, json=data)
            if response.status_code == 200:
                print(f"✅ Accident details sent successfully: {data}")
            else:
                print(f"❌ Failed to send accident details: {response.status_code}, {response.text}")
        except Exception as e:
            print(f"🔥 Error sending accident details: {e}")



# Function to stream frames and record a 20-second clip upon accident detection.
async def generate_frames(url: str, camera_id: str, websocket: WebSocket):
    # Use webcam if url equals "webcam", else use provided URL.
    cap = cv2.VideoCapture(0) if url.lower() == "webcam" else cv2.VideoCapture(url)
    if not cap.isOpened():
        raise HTTPException(status_code=404, detail="Failed to connect to camera")
    
    active_cameras[camera_id] = True  # Mark camera as active
    accident_detected_count = 0

    # Recording variables
    recording = False
    ffmpeg_process = None
    last_detected_time = 0
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    if not fps or fps < 1:
        fps = 30
    fps = int(fps)
    start_time = None
    video_filename = None
    max_frames = fps * 5  # Record for 20 seconds
    frame_count = 0

    while active_cameras.get(camera_id, False):
        ret, frame = cap.read()
        if not ret:
            break

        # Run YOLOv8 model on the frame
        results = model(frame)
        let_accident = False
        
        # Process detections
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = float(box.conf[0])
                cls = int(box.cls[0])
                # Example: accident detection if class 0 with confidence > 0.5
                if cls == 0 and conf > 0.7:
                    let_accident = True
                    accident_detected_count += 1
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 3)
                    label = f"Accident detected: {conf * 100:.2f}%"
                    cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX,
                                0.7, (0, 0, 255), 2, cv2.LINE_AA)
        
        # If accident is detected consistently, send alert and start recording
        if let_accident and accident_detected_count >= 3:
            accident_detected_count = 0
            cv2.putText(frame, "Accident Detected!", (50, 50), cv2.FONT_HERSHEY_SIMPLEX,
                        1.0, (0, 0, 255), 3)
            try:
                await websocket.send_json({"alert": "Accident Detected!", "cameraId": camera_id})
            except Exception as e:
                print(f"Error sending alert via WebSocket: {e}")
            
            current_time = time.time()
            # Start recording if not already recording and at least 10 seconds have passed since the last recording start
            if not recording and (current_time - last_detected_time >= 10):
                last_detected_time = current_time
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                video_filename = os.path.join(accident_clip_folder, f"{camera_id}_{timestamp}.mp4")
                ffmpeg_process = subprocess.Popen(
                    [
                        "ffmpeg", "-y",
                        "-f", "rawvideo", "-vcodec", "rawvideo",
                        "-pix_fmt", "bgr24", "-s", f"{frame_width}x{frame_height}",
                        "-r", str(fps), "-i", "-",
                        "-c:v", "libx264", "-preset", "ultrafast",
                        "-pix_fmt", "yuv420p",
                        "-movflags", "+faststart",
                        "-t", "5", video_filename,  # Record for 20 seconds\n                    ],
                    ],
                    stdin=subprocess.PIPE,
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                )
                recording = True
                start_time = current_time
                frame_count = 0
                print(f"Recording started: {video_filename}")

        # If recording, write frame to video file
        if recording and ffmpeg_process is not None:
            try:
                ffmpeg_process.stdin.write(frame.tobytes())
            except Exception as e:
                print("Error writing frame to ffmpeg:", e)
            
            frame_count += 1
            if frame_count >= max_frames:
                recording = False
                ffmpeg_process.stdin.close()
                ffmpeg_process.wait()
                ffmpeg_process = None
                print(f"Recording stopped: {video_filename}")
                # Optionally, send the video URL to the frontend
                video_url = f"/liveAccidentClips/{os.path.basename(video_filename)}"
                try:
                    await websocket.send_json({"video_url": video_url, "cameraId": camera_id})
                except Exception as e:
                    print(f"Error sending video URL: {e}")

                # ✅ Now send the details to the Node.js API
                asyncio.create_task(send_accident_details(camera_id, video_url))
                
        # Encode the processed frame as JPEG
        ret, jpeg = cv2.imencode('.jpg', frame)
        if not ret:
            continue
        frame_bytes = jpeg.tobytes()

        # Yield the frame in MJPEG format
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n\r\n')

        await asyncio.sleep(0.03)  # Control CPU usage

    cap.release()
    if ffmpeg_process is not None:
        ffmpeg_process.stdin.close()
        ffmpeg_process.wait()
    active_cameras.pop(camera_id, None)

# WebSocket endpoint for accident alerts (one connection per camera)
@app.websocket("/ws/{camera_id}")
async def websocket_endpoint(websocket: WebSocket, camera_id: str):
    await websocket.accept()
    active_websockets[camera_id] = websocket
    try:
        while True:
            # Keep connection alive; no data is expected from client.
            await websocket.receive_text()
    except WebSocketDisconnect:
        active_websockets.pop(camera_id, None)
        print(f"WebSocket disconnected for camera {camera_id}")

# GET endpoint for live streaming; requires an active WebSocket for alerts
@app.get("/camera-live-connect")
async def camera_live_connect(cameraId: str, url: str):
    if cameraId in active_cameras:
        raise HTTPException(status_code=400, detail="Camera is already streaming.")
    if cameraId not in active_websockets:
        raise HTTPException(status_code=400, detail="WebSocket connection required for alerts.")

    return StreamingResponse(
        generate_frames(url, cameraId, active_websockets[cameraId]),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

@app.post("/camera-stop")
async def camera_stop(request: StopCameraRequest):
    camera_id = request.cameraId
    if camera_id in active_cameras:
        active_cameras[camera_id] = False  # Stop the stream
        return {"message": f"Camera {camera_id} stopped successfully"}
    return {"error": "Camera is not currently streaming"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
