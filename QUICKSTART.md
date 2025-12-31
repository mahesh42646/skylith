# Quick Start Guide

## Prerequisites
- Node.js (v18+)
- MongoDB installed and running on localhost:27017

## Setup Steps

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 2. Start MongoDB

Make sure MongoDB is running:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# Or start manually
mongod
```

### 3. Start the Backend Server

In one terminal:
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

### 4. Start the Frontend

In another terminal:
```bash
npm run dev
# Frontend runs on http://localhost:3000
```

## Access Points

- **Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **API Server**: http://localhost:5000

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

## Features

✅ Modern landing page with glassmorphism
✅ GSAP animations and parallax effects
✅ Contact form (saves to MongoDB)
✅ Help popup (saves to MongoDB)
✅ Services page
✅ Terms & Conditions page
✅ Admin dashboard with JWT authentication
✅ Responsive design
✅ Purple theme (dark purple, light purple, white)

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or `brew services start mongodb-community`
- Check if MongoDB is on port 27017

### Server Not Starting
- Check if port 5000 is available
- Ensure all server dependencies are installed

### Frontend Not Loading
- Check if port 3000 is available
- Ensure all frontend dependencies are installed
- Clear `.next` folder and rebuild: `rm -rf .next && npm run dev`



