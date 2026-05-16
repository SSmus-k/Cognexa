from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta

class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    xp_points = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    current_streak = models.IntegerField(default=0)
    longest_streak = models.IntegerField(default=0)
    last_activity_date = models.DateField(null=True, blank=True)
    subscription_tier = models.CharField(max_length=20, choices=[
        ('free', 'Free'),
        ('premium', 'Premium'),
        ('school', 'School Partnership'),
    ], default='free')
    ai_questions_used_today = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def calculate_level(self):
        # Every 500 XP = 1 level
        return max(1, self.xp_points // 500 + 1)

    def reset_ai_questions_if_new_day(self):
        today = timezone.now().date()
        if self.last_activity_date != today:
            self.ai_questions_used_today = 0
            self.last_activity_date = today
            self.save()
            
    def __str__(self):
        return f"{self.user.username}'s Profile"


class Badge(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.ImageField(upload_to='badge_icons/')
    requirement = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class UserBadge(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='badges')
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'badge')

    def __str__(self):
        return f"{self.user.username} - {self.badge.name}"




class Activity(models.Model):
    ACTIVITY_TYPES = [
        ('lesson_completed', 'Lesson Completed'),
        ('quiz_passed', 'Quiz Passed'),
        ('badge_earned', 'Badge Earned'),
        ('streak_milestone', 'Streak Milestone'),
    ]

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=30, choices=ACTIVITY_TYPES)
    description = models.TextField()
    xp_earned = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.activity_type}"
