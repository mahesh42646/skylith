# Skylith - Company Website

A modern, responsive company website built with Next.js, featuring service-based and product-based solutions.

## Features

- 🎨 Modern UI with glassmorphism effects
- 🎭 GSAP animations and parallax scrolling
- 📱 Fully responsive design
- 🔐 Admin dashboard with JWT authentication
- 💾 MongoDB integration for contact and help data
- 🎯 Bootstrap-based components
- 🌈 Custom purple theme (dark purple, light purple, white)

## Tech Stack

- **Frontend**: Next.js 16, React 19, Bootstrap 5
- **Animations**: GSAP with ScrollTrigger
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running on localhost:27017)

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Start MongoDB (if not running):
```bash
mongod
```

4. Start the Express server:
```bash
cd server
npm start
```

5. Start the Next.js development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Dashboard

Access the admin dashboard at `/admin`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

The admin dashboard allows you to:
- View all contact submissions
- View and manage help requests
- Update help request status
- Delete contacts and help requests
- View statistics

## Project Structure

```
Skylith/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes
│   │   ├── contact/        # Contact page
│   │   ├── services/       # Services page
│   │   ├── terms/          # Terms & Conditions
│   │   ├── globals.css     # Global styles and theme
│   │   └── layout.js       # Root layout
│   └── components/
│       ├── Header.js       # Navigation header
│       ├── Footer.js       # Footer component
│       └── FloatingHelpPopup.js  # Help popup
├── server/
│   ├── index.js            # Express server
│   └── package.json
└── package.json
```

## API Endpoints

### Public Endpoints
- `POST /api/contact` - Submit contact form
- `POST /api/help` - Submit help request
- `POST /api/admin/login` - Admin login

### Protected Endpoints (require JWT)
- `GET /api/admin/contacts` - Get all contacts
- `GET /api/admin/help` - Get all help requests
- `GET /api/admin/stats` - Get statistics
- `DELETE /api/admin/contacts/:id` - Delete contact
- `DELETE /api/admin/help/:id` - Delete help request
- `PUT /api/admin/help/:id` - Update help request status

## Theme Colors

- **Dark Purple**: `#2D1B4E`
- **Light Purple**: `#6B46C1`
- **Purple Accent**: `#8B5CF6`
- **White**: `#FFFFFF`

## License

This project is private and proprietary.
# Skylith
# skylith
# skylith
# skylith
