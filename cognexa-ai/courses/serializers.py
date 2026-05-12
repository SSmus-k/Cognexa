from rest_framework import serializers
from .models import Course, Lesson, Enrollment, UserProgress

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'description', 'video_url', 'duration', 'order', 'created_at']

class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    instructor_name = serializers.CharField(source='instructor.username', read_only=True)
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'subject', 'instructor', 'instructor_name', 'thumbnail', 'lessons', 'is_published', 'created_at']

class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = Enrollment
        fields = ['id', 'user', 'course', 'course_title', 'enrolled_at', 'completed']

class UserProgressSerializer(serializers.ModelSerializer):
    lesson_title = serializers.CharField(source='lesson.title', read_only=True)
    
    class Meta:
        model = UserProgress
        fields = ['id', 'user', 'lesson', 'lesson_title', 'completed', 'progress_percentage', 'last_watched_at']
