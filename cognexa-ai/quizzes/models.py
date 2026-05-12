from django.db import models
from django.contrib.auth.models import User
from courses.models import Lesson

class Quiz(models.Model):
    id = models.AutoField(primary_key=True)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=255)
    description = models.TextField()
    passing_score = models.IntegerField(default=70)
    time_limit = models.IntegerField(help_text="Time limit in seconds", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    QUESTION_TYPES = [
        ('multiple_choice', 'Multiple Choice'),
        ('true_false', 'True/False'),
        ('short_answer', 'Short Answer'),
    ]

    id = models.AutoField(primary_key=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES, default='multiple_choice')
    correct_answer = models.TextField()
    explanation = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question_text[:100]


class QuestionOption(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    option_text = models.TextField()
    is_correct = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.option_text[:100]


class QuizAttempt(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_attempts')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.IntegerField()
    total_questions = models.IntegerField()
    passed = models.BooleanField()
    time_spent = models.IntegerField(help_text="Time spent in seconds")
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title}"


class Answer(models.Model):
    id = models.AutoField(primary_key=True)
    attempt = models.ForeignKey(QuizAttempt, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_answer = models.TextField()
    is_correct = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.attempt.user.username} - Q{self.question.id}"
