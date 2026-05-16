from rest_framework import serializers
from .models import Course, Video,  Enrollment, UserProgress
from users.serializers import UserSerializer



class VideoSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only=True)
    
    class Meta:
        model = Video
        fields = ['id', 'course', 'title', 'description', 'video_file', 'thumbnail', 'duration', 'order', 'is_published', 'uploaded_by', 'views', 'created_at', 'updated_at']
        read_only_fields = ['id', 'uploaded_by', 'created_at', 'updated_at', 'views']

class CourseSerializer(serializers.ModelSerializer):
    videos = VideoSerializer(many=True, read_only=True)
   
    instructor_name = serializers.CharField(source='instructor.username', read_only=True)
    instructor = UserSerializer(read_only=True)
    enrollment_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'subject', 'instructor', 'instructor_name', 'thumbnail', 'videos', 'lessons', 'is_published', 'price', 'level', 'enrollment_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'instructor', 'created_at', 'updated_at']
    
    def get_enrollment_count(self, obj):
        return obj.enrollments.count()

class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = Enrollment
        fields = ['id', 'user', 'course', 'course_title', 'enrolled_at', 'completed', 'progress_percentage']
        read_only_fields = ['id', 'enrolled_at']

class UserProgressSerializer(serializers.ModelSerializer):
    video = VideoSerializer(read_only=True)
    
    lesson_title = serializers.CharField(source='lesson.title', read_only=True)
    
    class Meta:
        model = UserProgress
        fields = ['id', 'user', 'video', 'lesson', 'lesson_title', 'completed', 'progress_percentage', 'last_watched_at', 'watch_time', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
