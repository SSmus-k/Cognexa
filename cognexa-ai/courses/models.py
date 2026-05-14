from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class Course(models.Model):
    SUBJECT_CHOICES = [
        ('Math', 'Math'),
        ('Science', 'Science'),
        ('English', 'English'),
        ('Nepali', 'Nepali'),
        ('SocialStudies', 'Social Studies'),
    ]

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES)
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses_taught')
    thumbnail = models.ImageField(upload_to='course_thumbnails/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    level = models.CharField(max_length=50, choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')], default='beginner')

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
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='uploaded_videos')
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class Lesson(models.Model):
    """Legacy model - now using Video model instead"""
    id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    description = models.TextField()
    video_url = models.URLField()
    duration = models.IntegerField(help_text="Duration in seconds")
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class UserProgress(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress')
    video = models.ForeignKey(Video, on_delete=models.CASCADE, null=True, blank=True)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, null=True, blank=True)
    completed = models.BooleanField(default=False)
    progress_percentage = models.IntegerField(default=0)
    last_watched_at = models.DateTimeField(null=True, blank=True)
    watch_time = models.IntegerField(default=0, help_text="Watch time in seconds")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'video')

    def __str__(self):
        video_title = self.video.title if self.video else self.lesson.title
        return f"{self.user.username} - {video_title}"


class Enrollment(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    progress_percentage = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f"{self.user.username} - {self.course.title}"
