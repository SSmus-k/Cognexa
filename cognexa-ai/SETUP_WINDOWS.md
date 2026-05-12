# CognexaAi - Windows Setup Guide

## Prerequisites

- Python 3.8+ (Download from [python.org](https://www.python.org/downloads/))
- Git (optional, for version control)

## Installation Steps

### 1. Create Virtual Environment

```bash
# Navigate to project folder
cd cognexa-ai

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate
```

### 2. Upgrade pip

```bash
python -m pip install --upgrade pip
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

**If you get errors with specific packages:**

```bash
# Install packages one by one
pip install Django==5.2.14
pip install djangorestframework==3.14.0
pip install django-cors-headers==4.3.1
pip install Pillow==10.1.0
pip install python-decouple==3.8
pip install gunicorn==21.2.0
```

### 4. Run Database Migrations

```bash
python manage.py migrate
```

### 5. Create Superuser (Admin Account)

```bash
python manage.py createsuperuser
```

Follow the prompts to create your admin account.

### 6. Start Development Server

```bash
python manage.py runserver
```

The API will be available at: **http://localhost:8000/api/**

Admin panel: **http://localhost:8000/admin/**

## Troubleshooting

### Issue: "python: command not found"
**Solution:** Add Python to PATH or use `python.exe` instead of `python`

### Issue: "venv\Scripts\activate" doesn't work
**Solution:** Try using PowerShell instead of Command Prompt, or use:
```bash
venv\Scripts\activate.bat
```

### Issue: "pip install" fails
**Solution:** Upgrade pip first:
```bash
python -m pip install --upgrade pip
```

### Issue: Port 8000 already in use
**Solution:** Use a different port:
```bash
python manage.py runserver 8001
```

### Issue: Database errors
**Solution:** Delete `db.sqlite3` and run migrations again:
```bash
python manage.py migrate
python manage.py createsuperuser
```

## Environment Variables (Optional)

Create a `.env` file in the project root:

```
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

## Next Steps

1. Access the admin panel at http://localhost:8000/admin/
2. Create courses, lessons, and quizzes
3. Start the React frontend (see cognexa-frontend README)
4. Access the frontend at http://localhost:5173

## Deactivate Virtual Environment

When you're done:

```bash
deactivate
```

## Additional Help

For more information, see the main README.md file.
