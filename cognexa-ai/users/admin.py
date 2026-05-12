from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role', 'first_name', 'last_name', 'created_at']
    list_filter = ['role', 'created_at']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    fieldsets = (
        ('Personal Info', {'fields': ('username', 'email', 'first_name', 'last_name')}),
        ('Role & Access', {'fields': ('role', 'is_staff', 'is_superuser')}),
        ('Profile', {'fields': ('bio', 'profile_picture', 'phone', 'date_of_birth')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )
    readonly_fields = ['created_at', 'updated_at']
