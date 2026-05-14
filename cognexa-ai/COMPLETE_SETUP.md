# CognexaAi - Complete Setup Guide

This guide covers the complete setup for both Django backend and React frontend with authentication and video upload features.

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## Backend Setup (Django)

### 1. Extract and Navigate
```bash
cd cognexa-ai
```

### 2. Create Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run Migrations
```bash
python manage.py migrate
```

### 5. Create Superuser (Admin)
```bash
python manage.py createsuperuser
```

### 6. Create Demo Users
```bash
python manage.py shell
```

Then in the Python shell:
```python
from users.models import User

# Create demo student
User.objects.create_user(
    username='student1',
    email='student@example.com',
    password='password123',
    role='student',
    first_name='John',
    last_name='Student'
)

# Create demo teacher
User.objects.create_user(
    username='teacher1',
    email='teacher@example.com',
    password='password123',
    role='teacher',
    first_name='Jane',
    last_name='Teacher'
)

exit()
```

### 7. Start Django Server
```bash
python manage.py runserver
```

Django will run on: **http://localhost:8000**
Admin panel: **http://localhost:8000/admin/**

## Frontend Setup (React)

### 1. Extract and Navigate
```bash
cd cognexa-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

React will run on: **http://localhost:5173**

## Features Available

### Authentication
- ✅ Student Login/Signup
- ✅ Teacher Login/Signup
- ✅ Role-based access control
- ✅ Token-based authentication

### Student Features
- ✅ View courses
- ✅ Enroll in courses
- ✅ Track progress
- ✅ Student dashboard

### Teacher Features
- ✅ Upload videos
- ✅ Manage courses
- ✅ View student enrollments
- ✅ Teacher dashboard

### Admin Features
- ✅ User management
- ✅ Course management
- ✅ Video management
- ✅ Admin panel

## API Endpoints

### Authentication
- `POST /api/users/register/` - Register new user
- `POST /api/users/login/` - Login user
- `GET /api/users/me/` - Get current user
- `POST /api/users/logout/` - Logout user

### Courses
- `GET /api/courses/` - List all courses
- `POST /api/courses/` - Create course (teacher/admin)
- `GET /api/courses/{id}/` - Get course details
- `POST /api/courses/{id}/enroll/` - Enroll in course

### Videos
- `GET /api/videos/` - List all videos
- `POST /api/videos/` - Upload video (teacher/admin)
- `GET /api/videos/{id}/` - Get video details

### Progress
- `GET /api/progress/` - Get user progress
- `POST /api/progress/update_progress/` - Update progress

## Demo Credentials

### Student Account
- **Username:** student1
- **Password:** password123

### Teacher Account
- **Username:** teacher1
- **Password:** password123

### Admin Account
- Use the superuser credentials you created

## Troubleshooting

### Django Issues

**Port 8000 already in use:**
```bash
python manage.py runserver 8001
```

**Database errors:**
```bash
python manage.py migrate --run-syncdb
```

**Module not found:**
```bash
pip install -r requirements.txt
```

### React Issues

**Port 5173 already in use:**
```bash
npm run dev -- --port 3000
```

**Styles not loading:**
```bash
rm -rf node_modules
npm install
npm run dev
```

**API connection errors:**
- Check if Django server is running on port 8000
- Verify CORS is enabled in Django settings
- Check browser console for detailed errors

## File Structure

```
cognexa-ai/
├── cognexa/              # Project settings
├── users/                # User authentication app
├── courses/              # Course management app
├── quizzes/              # Quiz app
├── gamification/         # Gamification app
├── notifications/        # Notifications app
├── manage.py
└── db.sqlite3

cognexa-frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── TeacherDashboard.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Next Steps

1. Create courses in admin panel
2. Upload videos as teacher
3. Enroll students in courses
4. Track progress and manage gamification
5. Send notifications to students

## Production Deployment

### Django
1. Set `DEBUG = False` in settings.py
2. Configure `ALLOWED_HOSTS`
3. Use PostgreSQL instead of SQLite
4. Set up environment variables
5. Use Gunicorn as WSGI server

### React
1. Build for production: `npm run build`
2. Deploy `dist` folder to hosting service
3. Configure API endpoint for production

## Support

For issues or questions, check:
- Django logs: `python manage.py runserver`
- React console: Browser DevTools (F12)
- API responses: Network tab in DevTools

## License

MIT License
