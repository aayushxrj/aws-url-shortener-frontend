import { useNavigate } from 'react-router-dom';
import ColorBends from '../components/ColorBends';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/app');
  };

  return (
    <div className="landing-page">
      <ColorBends
        colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
        rotation={30}
        speed={0.3}
        scale={1.2}
        frequency={1.4}
        warpStrength={1.2}
        mouseInfluence={0.8}
        parallax={0.6}
        noise={0.08}
        transparent
      />
      <div className="landing-content">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="landing-title">Cloud-Native gRPC URL Shortener</h1>
          <p className="landing-subtitle">
            A modern, highly scalable URL shortening service powered by gRPC-Web protocol
          </p>
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started →
          </button>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>gRPC-Web protocol ensures &lt;100ms API response times with high-performance communication</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Analytics</h3>
            <p>Track clicks, monitor statistics, and analyze URL performance with live data updates</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure & Scalable</h3>
            <p>Deployed on AWS ECS with DynamoDB, ensuring enterprise-grade security and infinite scalability</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful UI</h3>
            <p>Glassmorphic design with WebGL animations and smooth transitions for delightful user experience</p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="tech-stack-section">
          <h2 className="section-title">Built with Modern Technologies</h2>
          <div className="tech-badges">
            <div className="tech-badge">
              <span className="tech-name">React 19</span>
              <span className="tech-desc">Core Framework</span>
            </div>
            <div className="tech-badge">
              <span className="tech-name">Three.js</span>
              <span className="tech-desc">WebGL Animation</span>
            </div>
            <div className="tech-badge">
              <span className="tech-name">gRPC-Web</span>
              <span className="tech-desc">Protocol</span>
            </div>
            <div className="tech-badge">
              <span className="tech-name">Vite</span>
              <span className="tech-desc">Build Tool</span>
            </div>
            <div className="tech-badge">
              <span className="tech-name">AWS ECS</span>
              <span className="tech-desc">Deployment</span>
            </div>
            <div className="tech-badge">
              <span className="tech-name">DynamoDB</span>
              <span className="tech-desc">Database</span>
            </div>
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="architecture-section">
          <h2 className="section-title">Cloud-Native Architecture</h2>
          <div className="architecture-flow">
            <div className="flow-item">
              <div className="flow-icon">🌐</div>
              <h4>Browser</h4>
              <p>User Interface</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-item">
              <div className="flow-icon">🔄</div>
              <h4>Envoy Proxy</h4>
              <p>Protocol Translation</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-item">
              <div className="flow-icon">⚙️</div>
              <h4>Go Backend</h4>
              <p>gRPC Services</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-item">
              <div className="flow-icon">💾</div>
              <h4>DynamoDB</h4>
              <p>Data Storage</p>
            </div>
          </div>
        </div>

        {/* Key Features List */}
        <div className="capabilities-section">
          <h2 className="section-title">Powerful Capabilities</h2>
          <div className="capabilities-grid">
            <div className="capability-item">
              <span className="capability-icon">✅</span>
              <span>Instant URL shortening with Base62 encoding</span>
            </div>
            <div className="capability-item">
              <span className="capability-icon">✅</span>
              <span>Custom expiration times for temporary links</span>
            </div>
            <div className="capability-item">
              <span className="capability-icon">✅</span>
              <span>Comprehensive click tracking & analytics</span>
            </div>
            <div className="capability-item">
              <span className="capability-icon">✅</span>
              <span>Bulk URL management with pagination</span>
            </div>
            <div className="capability-item">
              <span className="capability-icon">✅</span>
              <span>Update & delete existing URL mappings</span>
            </div>
            <div className="capability-item">
              <span className="capability-icon">✅</span>
              <span>Health monitoring & error handling</span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="performance-section">
          <h2 className="section-title">Performance Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-value">&lt; 2s</div>
              <div className="metric-label">Initial Load</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">&lt; 100ms</div>
              <div className="metric-label">API Response</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">&lt; 50ms</div>
              <div className="metric-label">URL Redirect</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">90+</div>
              <div className="metric-label">Lighthouse Score</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">Start shortening URLs with our powerful, cloud-native solution</p>
          <button className="cta-button" onClick={handleGetStarted}>
            Launch Application →
          </button>
        </div>

        {/* Footer */}
        <div className="landing-footer">
          <p>Made with ❤️ using React, gRPC-Web, and AWS</p>
          <div className="footer-links">
            <a href="https://github.com/aayushxrj/aws-url-shortener-frontend" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span>•</span>
            <a href="https://github.com/aayushxrj/aws-url-shortener-backend" target="_blank" rel="noopener noreferrer">
              Backend
            </a>
            <span>•</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
