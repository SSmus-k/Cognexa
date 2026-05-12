# CognexaAi - Django Backend

AI-powered learning platform backend built with Django REST Framework.

## Features

- 📚 Course management system
- 🧪 Quiz and exam functionality
- 🎮 Gamification with XP, badges, and leaderboards
- 🔔 Notification system
- 👥 User management and authentication
- 📊 Student progress tracking

## Installation

### Prerequisites
- Python 3.8+
- pip

### Setup

1. **Clone or extract the project**
```bash
cd cognexa-ai
```

2. **Create a virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run migrations**
```bash
python manage.py migrate
```

5. **Create a superuser (admin)**
```bash
python manage.py createsuperuser
```

6. **Start the development server**
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

### Courses
- `GET /api/courses/` - List all published courses
- `GET /api/courses/?subject=Math` - Filter by subject
- `POST /api/courses/{id}/enroll/` - Enroll in a course
- `GET /api/courses/my_courses/` - Get user's enrolled courses

### Lessons
- `GET /api/lessons/` - List all lessons
- `GET /api/lessons/?course_id=1` - Get lessons for a course

### Progress
- `GET /api/progress/` - Get user's progress
- `POST /api/progress/update_progress/` - Update lesson progress

### Enrollments
- `GET /api/enrollments/` - Get user's enrollments

## Admin Panel

Access the Django admin at `http://localhost:8000/admin/`

Use the superuser credentials you created to log in and manage:
- Courses
- Lessons
- Quizzes
- Users
- Badges
- Notifications

## Database

The project uses SQLite by default (`db.sqlite3`). For production, configure PostgreSQL in `cognexa/settings.py`.

## CORS Configuration

CORS is enabled for:
- `http://localhost:3000`
- `http://localhost:5173` (React dev server)
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`

Update `CORS_ALLOWED_ORIGINS` in `cognexa/settings.py` for production.

## Project Structure

```
cognexa-ai/
├── cognexa/              # Project settings
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── courses/              # Course app
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
├── quizzes/              # Quiz app
├── gamification/         # Gamification app
├── notifications/        # Notifications app
├── manage.py
├── db.sqlite3            # Database
└── requirements.txt      # Dependencies
```

## Models

### Course
- title, description, subject
- instructor (ForeignKey to User)
- thumbnail, is_published
- lessons (reverse relation)

### Lesson
- course (ForeignKey)
- title, description, video_url
- duration, order

### Quiz
- lesson (ForeignKey)
- title, description, passing_score
- time_limit, questions (reverse relation)

### UserProfile
- user (OneToOneField)
- xp_points, level, current_streak
- subscription_tier (free/premium/school)

### Badge
- name, description, icon
- requirement

## Development

### Create a new app
```bash
python manage.py startapp myapp
```

### Make migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Run tests
```bash
python manage.py test
```

## Deployment

For production deployment:

1. Set `DEBUG = False` in settings.py
2. Configure `ALLOWED_HOSTS`
3. Use PostgreSQL instead of SQLite
4. Set up environment variables for sensitive data
5. Use Gunicorn as WSGI server:
```bash
gunicorn cognexa.wsgi:application
```

## License

MIT License

## Support

For issues or questions, contact the development team.
