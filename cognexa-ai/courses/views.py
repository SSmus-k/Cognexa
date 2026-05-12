from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Course, Lesson, Enrollment, UserProgress
from .serializers import CourseSerializer, LessonSerializer, EnrollmentSerializer, UserProgressSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Course.objects.filter(is_published=True)
        subject = self.request.query_params.get('subject', None)
        if subject:
            queryset = queryset.filter(subject=subject)
        return queryset
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def enroll(self, request, pk=None):
        course = self.get_object()
        enrollment, created = Enrollment.objects.get_or_create(user=request.user, course=course)
        if created:
            return Response({'status': 'enrolled'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'already enrolled'}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_courses(self, request):
        enrollments = Enrollment.objects.filter(user=request.user)
        courses = [e.course for e in enrollments]
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        course_id = self.request.query_params.get('course_id', None)
        if course_id:
            return Lesson.objects.filter(course_id=course_id)
        return Lesson.objects.all()

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user)

class UserProgressViewSet(viewsets.ModelViewSet):
    queryset = UserProgress.objects.all()
    serializer_class = UserProgressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def update_progress(self, request):
        lesson_id = request.data.get('lesson_id')
        progress_percentage = request.data.get('progress_percentage', 0)
        
        progress, created = UserProgress.objects.get_or_create(
            user=request.user,
            lesson_id=lesson_id
        )
        progress.progress_percentage = progress_percentage
        if progress_percentage >= 100:
            progress.completed = True
        progress.save()
        
        serializer = UserProgressSerializer(progress)
        return Response(serializer.data)
