import { Link } from "react-router-dom";
import styles from "../css/Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>
          <span className={styles.logoHighlight}>Acci</span>snap
        </h1>
        <div className={styles.navLinks}>
          <Link to="/login" className={styles.navBtn}>Login</Link>
          <Link to="/signup" className={styles.navBtn}>Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            AI-Powered <br></br> <span className={styles.heroHighlight}>Accident Detection </span>
           with clip extraction </h1>
          <p className={styles.heroSubtitle}>
            Real-time accident monitoring with instant alerts for a safer tomorrow.
          </p>
          <Link to="/signup" className={styles.ctaBtn}>Get Started Now</Link>
        </div>
        <div className={styles.heroVisual}></div> {/* Placeholder for an image or animation */}
      </header>

      {/* About Section */}
      <section className={styles.about}>
        <h2 className={styles.sectionTitle}>What is Accisnap?</h2>
        <p className={styles.sectionText}>
          Accisnap harnesses cutting-edge AI to transform road safety. By analyzing live video feeds, 
          our system detects accidents instantly and extract the accident clips, empowering faster emergency responses and 
          saving lives with precision and speed.
        </p>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Choose Accisnap?</h2>
        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>🔍 AI-Powered Detection</h3>
            <p>Leverages YOLOv8s for unmatched accuracy.</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>📹 Video Processing</h3>
            <p>Seamlessly handles real-time and recorded footage.</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>🚨 Instant Alerts</h3>
            <p>Email with accident clips and SMS notifications in seconds.</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>📡 Live Streaming</h3>
            <p>Integrates with CCTV for real-time insights.</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>📊 Reports & Insights</h3>
            <p>Detailed analytics to understand accident trends.</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>⚡ High Accuracy</h3>
            <p>Combines detection and classification for precision.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <h3>Connect</h3>
            <p>Link a live feed or upload video.</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <h3>Analyze</h3>
            <p>AI scans for accident patterns.</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            <h3>Detect</h3>
            <p>Records incidents with precision.</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>4</span>
            <h3>Alert</h3>
            <p>Notifies authorities instantly.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Make Roads Safer?</h2>
        <Link to="/signup" className={styles.ctaBtn}>Join Now</Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 Accisnap | Pioneering AI for Road Safety</p>
      </footer>
    </div>
  );
}

export default Home;