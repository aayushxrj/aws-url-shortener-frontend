# Cloud-Native gRPC URL Shortener - Frontend

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF.svg)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.181.1-black.svg)](https://threejs.org/)
[![gRPC-Web](https://img.shields.io/badge/gRPC--Web-2.0.2-blue.svg)](https://github.com/grpc/grpc-web)

A modern, highly scalable URL shortening service frontend built with React and powered by gRPC-Web protocol. Features a stunning WebGL-animated landing page and a sleek glassmorphic interface for managing shortened URLs.

---

## 📋 Table of Contents

- [Abstract](#abstract)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Performance](#performance)
- [Security](#security)
- [Testing](#testing)
- [Contributing](#contributing)

---

## 🎯 Abstract

The Cloud-Native gRPC URL Shortener Frontend is a modern, high-performance web application designed to provide an intuitive user interface for URL shortening services. Built entirely with React 19 and Vite, it leverages cutting-edge web technologies including Three.js for stunning WebGL animations and gRPC-Web for high-performance communication with the backend.

This frontend is part of a larger cloud-native architecture deployed on Amazon Web Services (AWS), featuring:

- **Modern UI/UX**: Glassmorphic design with animated gradient backgrounds powered by WebGL shaders
- **High-Performance Communication**: gRPC-Web protocol for efficient, strongly-typed API calls
- **Responsive Design**: Fully responsive interface that works seamlessly across all device sizes
- **Real-time Analytics**: Live click tracking and URL statistics
- **Container-Ready**: Dockerized for deployment on AWS ECS (Elastic Container Service)

The application communicates with a Go-based gRPC backend through an Envoy proxy, which translates browser-compatible gRPC-Web requests into native gRPC. This architecture ensures low-latency operations and high throughput, making it suitable for production use at scale.

---

## ✨ Features

### 🎨 User Interface
- **Animated Landing Page**: Stunning WebGL background with interactive color-bending effects using Three.js
- **Glassmorphic Design**: Modern, translucent UI elements with backdrop blur effects
- **Gradient Accents**: Beautiful purple (#8a5cff), pink (#ff5c7a), and cyan (#00ffd1) color scheme
- **Smooth Animations**: Fade-in effects, hover transitions, and micro-interactions
- **Dark Theme**: Elegant black background with neon accents

### 🔗 URL Management
- **Instant URL Shortening**: Convert long URLs into compact 6-character Base62 codes
- **Click Analytics**: Real-time tracking of clicks, creation time, and expiration
- **URL Statistics**: Detailed view of individual URL performance
- **Bulk URL Listing**: View all shortened URLs with pagination support
- **Update & Delete**: Modify or remove shortened URLs as needed

### ⚡ Performance
- **gRPC-Web Protocol**: High-performance, strongly-typed communication
- **Fast Load Times**: Vite-powered build process for optimized bundles
- **Lazy Loading**: Code splitting for improved initial load performance
- **Responsive Tables**: Horizontal scroll with custom purple-themed scrollbar

### 🛡️ Additional Features
- **Health Monitoring**: Backend health check endpoint
- **Error Handling**: Comprehensive error messages and loading states
- **Copy to Clipboard**: Quick copy functionality for shortened URLs
- **External Link Handling**: Safe external link opening with proper security attributes

---

## 🏗️ System Architecture

### Overall Architecture

The frontend is part of a multi-tier, container-based architecture:

```
┌─────────────┐
│   Browser   │
│   (User)    │
└──────┬──────┘
       │ DNS Request
       ▼
┌─────────────────┐
│  AWS Route 53   │
│  (DNS Service)  │
└────────┬────────┘
         │
         ▼
┌──────────────────────┐
│  AWS Application     │
│  Load Balancer (ALB) │
└─────────┬────────────┘
          │
          ├─────────────────────┐
          │                     │
          ▼                     ▼
┌──────────────────┐   ┌─────────────────┐
│  React Frontend  │   │  Envoy Proxy    │
│  Service (ECS)   │   │  Service (ECS)  │
└──────────────────┘   └────────┬────────┘
                                │ gRPC
                                ▼
                       ┌─────────────────┐
                       │  Go gRPC        │
                       │  Backend (ECS)  │
                       └────────┬────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  Amazon         │
                       │  DynamoDB       │
                       └─────────────────┘
```

### Data Flow

1. **User Interaction**: User enters a URL in the frontend form
2. **gRPC-Web Request**: Frontend sends a gRPC-Web request to the Envoy proxy
3. **Protocol Translation**: Envoy translates gRPC-Web to native gRPC
4. **Backend Processing**: Go backend validates and processes the request
5. **Database Operation**: DynamoDB stores/retrieves URL mappings
6. **Response Path**: Data flows back through Envoy to the frontend
7. **UI Update**: React updates the interface with the shortened URL

---

## 🛠️ Technology Stack

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | Core UI framework |
| **React Router** | 7.0.2 | Client-side routing |
| **Vite** | 7.1.7 | Build tool and dev server |

### Styling & Animation
| Technology | Version | Purpose |
|------------|---------|---------|
| **Three.js** | 0.181.1 | WebGL animations |
| **Custom CSS** | - | Glassmorphic UI |

### Communication Protocol
| Technology | Version | Purpose |
|------------|---------|---------|
| **gRPC-Web** | 2.0.2 | Browser gRPC client |
| **Google Protobuf** | 4.0.0 | Serialization |
| **Axios** | 1.13.1 | HTTP client |

---

## 📦 Prerequisites

### Hardware Requirements (Development)
- **Processor**: Dual-core minimum (Quad-core recommended)
- **Memory**: 8 GB RAM minimum (16 GB recommended)
- **Storage**: 10 GB free space (SSD preferred)
- **OS**: Windows 10, macOS, or Linux

### Software Requirements
```bash
# Required
Node.js: 18.x or higher
npm: 9.x or higher
Git: Latest version

# Optional
Docker: Latest version
AWS CLI: Latest version
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/aayushxrj/aws-url-shortener-frontend.git
cd aws-url-shortener-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate Protocol Buffer Stubs (if needed)

```bash
# Install protoc compiler globally
npm install -g protoc-gen-grpc-web
npm install -g protoc-gen-js

# Install local dependencies
npm install grpc-web google-protobuf

# Generate gRPC-Web code
protoc -I=src/proto src/proto/main.proto \
  --js_out=import_style=commonjs:src/proto/gen \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/proto/gen
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Backend gRPC Host (Envoy Proxy)
VITE_API_HOST=http://localhost:8081

# Short URL Root (for displaying shortened links)
VITE_SHORT_ROOT=http://localhost:8080

# Environment
VITE_ENV=development
```

### Production Configuration

```env
VITE_API_HOST=https://api.your-domain.com
VITE_SHORT_ROOT=https://your-domain.com
```

---

## 💻 Usage

### Development Mode

```bash
npm run dev
```
Available at `http://localhost:5173`

### Production Build

```bash
npm run build
```
Output in `dist/` directory

### Preview Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
url-shortner-frontend/
│
├── src/
│   ├── components/          # Reusable components
│   │   ├── ColorBends.jsx   # WebGL animation
│   │   └── ColorBends.css
│   │
│   ├── pages/               # Page components
│   │   ├── LandingPage.jsx
│   │   └── LandingPage.css
│   │
│   ├── proto/               # gRPC definitions
│   │   ├── main.proto
│   │   └── gen/             # Generated stubs
│   │
│   ├── rpcs/                # RPC service components
│   │   ├── HealthCheck.jsx
│   │   ├── GetOriginalURL.jsx
│   │   ├── IncrementClick.jsx
│   │   ├── GetURLStats.jsx
│   │   ├── UpdateURL.jsx
│   │   ├── DeleteURL.jsx
│   │   └── ListAllURLs.jsx
│   │
│   ├── App.jsx              # Main app component
│   ├── App.css
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
│
├── .env                     # Environment variables
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md
```

---

## 📡 API Documentation

### gRPC Services

#### 1. ShortenURL
Create a new shortened URL
```javascript
{
  originalUrl: string,
  expireInSeconds: number  // Optional
}
```

#### 2. GetOriginalURL
Retrieve original URL from short ID
```javascript
{
  shortId: string
}
```

#### 3. GetURLStats
Get detailed URL statistics
```javascript
{
  shortId: string,
  originalUrl: string,
  clicks: number,
  createdAt: string,
  expireAt: number
}
```

#### 4. ListAllURLs
List all URLs with pagination
```javascript
{
  limit: number,
  lastEvaluatedKey: string  // For pagination
}
```

#### 5. UpdateURL
Update existing URL mapping
```javascript
{
  shortId: string,
  newOriginalUrl: string,      // Optional
  newExpireInSeconds: number   // Optional
}
```

#### 6. DeleteURL
Delete a shortened URL
```javascript
{
  shortId: string
}
```

#### 7. HealthCheck
Check backend service health
```javascript
{
  status: string  // "OK" if healthy
}
```

---

## 🚢 Deployment

### AWS ECS Deployment

#### Build Docker Image

```bash
# Build
docker build -t url-shortener-frontend:latest .

# Tag for ECR
docker tag url-shortener-frontend:latest \
  <account-id>.dkr.ecr.<region>.amazonaws.com/url-shortener-frontend:latest
```

#### Push to ECR

```bash
# Authenticate
aws ecr get-login-password --region <region> | \
  docker login --username AWS --password-stdin \
  <account-id>.dkr.ecr.<region>.amazonaws.com

# Push
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/url-shortener-frontend:latest
```

#### Deploy to ECS

```bash
aws ecs create-service \
  --cluster url-shortener-cluster \
  --service-name frontend-service \
  --task-definition url-shortener-frontend \
  --desired-count 2 \
  --launch-type FARGATE
```

---

## ⚡ Performance

### Expected Metrics

| Metric | Expected Result |
|--------|----------------|
| Initial Load | < 2 seconds |
| Time to Interactive | < 3 seconds |
| API Response | < 100ms |
| URL Redirect | < 50ms |
| Lighthouse Score | 90+ |

### Optimizations

- Code splitting with React Router
- Minified JavaScript and CSS
- Tree-shaking unused code
- gRPC-Web binary protocol
- HTTP/2 multiplexing

---

## 🔒 Security

### Security Measures

1. **HTTPS Enforcement**
   - All production traffic over TLS 1.2+
   - HSTS headers enabled

2. **Input Validation**
   - URL validation before submission
   - XSS protection via React escaping

3. **Secure Communication**
   - gRPC-Web over HTTPS
   - No sensitive data in URLs
   - Proper CORS configuration

4. **AWS Security**
   - VPC isolation
   - Security groups
   - IAM roles with least privilege
   - AWS Secrets Manager

---

## 🧪 Testing

### Manual Testing Checklist

#### Landing Page
- [ ] ColorBends animation loads smoothly
- [ ] "Get Started" button works
- [ ] Responsive on all devices

#### Main Application
- [ ] URL shortening works
- [ ] All RPC services functional
- [ ] Error handling works
- [ ] Table pagination works

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👥 Authors

**Aayush Raj** - [@aayushxrj](https://github.com/aayushxrj)

---

## 🙏 Acknowledgments

- React Team - Frontend framework
- Vite Team - Build tool
- Three.js Community - WebGL support
- gRPC Team - High-performance protocol
- AWS - Cloud infrastructure

---

## 📞 Support

- Open an issue on GitHub
- Check documentation
- Review [Backend Repository](https://github.com/aayushxrj/aws-url-shortener-backend)

---

## 🗺️ Roadmap

### Upcoming Features
- [ ] Custom vanity URLs
- [ ] QR code generation
- [ ] Advanced analytics dashboard
- [ ] Bulk URL upload (CSV)
- [ ] Dark/Light theme toggle
- [ ] PWA support

### Future Enhancements
- [ ] ElastiCache integration
- [ ] Real-time collaboration
- [ ] URL preview
- [ ] Browser extension

---

## 📊 Project Status

**Status**: ✅ Active Development  
**Version**: 1.0.0  
**Last Updated**: November 2025

---

**Made with ❤️ using React, gRPC-Web, and AWS**
