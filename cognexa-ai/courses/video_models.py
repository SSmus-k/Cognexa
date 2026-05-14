from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Video(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(default='No description provided.')
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='videos')
    lesson = models.ForeignKey('Lesson', on_delete=models.CASCADE, related_name='videos', blank=True, null=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='uploaded_videos')
    
    # Video file
    video_file = models.FileField(upload_to='videos/')
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)
    
    # Metadata
    duration = models.IntegerField(help_text="Duration in seconds", blank=True, null=True)
    file_size = models.BigIntegerField(help_text="File size in bytes", blank=True, null=True)
    video_format = models.CharField(max_length=20, blank=True, null=True)
    
    # Status
    is_published = models.BooleanField(default=False)
    views = models.IntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    def increment_views(self):
        self.views += 1
        self.save()
