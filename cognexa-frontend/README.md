# CognexaAi - React Frontend

Modern, responsive React frontend for the CognexaAi learning platform with dark/light mode and sacred geometry design.

## Features

- 🎨 Beautiful UI with sacred geometry design
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🎬 Smooth animations with Framer Motion
- 🎯 Course filtering and search
- 📊 Student dashboard with progress tracking
- 🔗 Integration with Django REST API

## Prerequisites

- Node.js 16+
- npm or yarn

## Installation

### Setup

1. **Extract the project**
```bash
cd cognexa-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

### Development
```bash
npm run dev
```
Runs the app in development mode with hot module replacement.

### Build
```bash
npm run build
```
Builds the app for production to the `dist` folder.

### Preview
```bash
npm run preview
```
Preview the production build locally.

## Project Structure

```
cognexa-frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Courses.jsx       # Course library
│   │   └── Dashboard.jsx     # Student dashboard
│   ├── App.jsx               # Main app component
│   ├── App.css               # App styles
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

## Configuration

### API Endpoint

Update the API base URL in your components:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';

// Example API call
const response = await axios.get(`${API_BASE_URL}/courses/`);
```

## Pages

### Home (/)
- Hero section with call-to-action
- Feature highlights
- Subject categories showcase

### Courses (/courses)
- Course library with filtering
- Subject-based filtering
- Search functionality

### Dashboard (/dashboard)
- User statistics (XP, rank, streak)
- Enrolled courses with progress bars
- Recent activity feed

## Dependencies

- React 18, React Router
- Vite, Tailwind CSS
- Framer Motion, Lucide React, Axios

## Deployment

```bash
npm run build
```

Deploy the `dist` folder to any static hosting service.

## License

MIT License
