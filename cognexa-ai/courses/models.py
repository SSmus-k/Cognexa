from django.db import models
from django.conf import settings
from django.utils import timezone


class Grade(models.Model):
    GRADE_CHOICES = [
        ('8', 'Grade 8'),
        ('9', 'Grade 9'),
        ('10', 'Grade 10'),
        ('11_12_science', 'Grade 11-12 Science'),
        ('11_12_management', 'Grade 11-12 Management'),
        ('11_12_humanities', 'Grade 11-12 Humanities'),
        ('11_12_education', 'Grade 11-12 Education'),
        ('11_12_law', 'Grade 11-12 Law'),
        ('technical', 'Technical / Vocational'),
    ]
    name = models.CharField(max_length=50, choices=GRADE_CHOICES, unique=True)

    def __str__(self):
        return self.get_name_display()


class Subject(models.Model):
    name = models.CharField(max_length=100)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, related_name='subjects')

    class Meta:
        unique_together = ('name', 'grade')
        ordering = ['name']

    def __str__(self):
        return f"{self.name} — {self.grade}"


class Course(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    grade = models.ForeignKey(Grade, on_delete=models.SET_NULL, null=True, blank=True, related_name='courses')
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True, blank=True, related_name='courses')
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='courses_taught')
    thumbnail = models.ImageField(upload_to='course_thumbnails/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    level = models.CharField(max_length=50, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced')
    ], default='beginner')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Video(models.Model):
    """Model for storing uploaded videos"""
    id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='videos')
    title = models.CharField(max_length=255)
    description = models.TextField(default='No description provided.')
    video_file = models.FileField(upload_to='videos/%Y/%m/%d/')
    thumbnail = models.ImageField(upload_to='video_thumbnails/', null=True, blank=True)
    duration = models.IntegerField(help_text="Duration in seconds", default=0)
    order = models.IntegerField(default=0)
    is_published = models.BooleanField(default=False)
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='uploaded_videos')
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.course.title} - {self.title}"




class UserProgress(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='progress')
    video = models.ForeignKey(Video, on_delete=models.CASCADE, null=True, blank=True)
    completed = models.BooleanField(default=False)
    progress_percentage = models.IntegerField(default=0)
    last_watched_at = models.DateTimeField(null=True, blank=True)
    watch_time = models.IntegerField(default=0, help_text="Watch time in seconds")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'video')

    def __str__(self):
        video_title = self.video.title if self.video else "Unknown Video"
        return f"{self.user.username} - {video_title}"


class Enrollment(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    progress_percentage = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f"{self.user.username} - {self.course.title}"
