from django.db import models
from django.contrib.auth.models import AbstractUser
role = [
    ('student', 'Student'),
    ('teacher', 'Teacher'),
    
]
class User(AbstractUser):
    
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=10, blank=True, null=True)
    role = models.CharField(max_length=50, choices=role, default='student')
    
    def is_teacher(self):
        return self.role == 'teacher'

    def is_student(self):
        return self.role == 'student'
    
    def __str__(self):
        return self.username

class TeacherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    subjects = models.TextField()

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    grade = models.CharField(max_length=10)