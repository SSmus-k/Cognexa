const API_BASE_URL = 'http://localhost:8000/api'

// Get token from localStorage
const getToken = () => localStorage.getItem('token')

// API helper function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const headers = {
    ...options.headers,
  }

  const token = getToken()
  if (token) {
    headers['Authorization'] = `Token ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

// Auth APIs
export const authAPI = {
  register: (data) =>
    apiCall('/users/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  login: (data) =>
    apiCall('/users/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  getCurrentUser: () => apiCall('/users/me/'),

  logout: () =>
    apiCall('/users/logout/', {
      method: 'POST',
    }),
}

// Course APIs
export const courseAPI = {
  listCourses: (subject = null) => {
    let url = '/courses/'
    if (subject) url += `?subject=${subject}`
    return apiCall(url)
  },

  getCourse: (id) => apiCall(`/courses/${id}/`),

  createCourse: (data) =>
    apiCall('/courses/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  enrollCourse: (id) =>
    apiCall(`/courses/${id}/enroll/`, {
      method: 'POST',
    }),

  getMyCourses: () => apiCall('/courses/my_courses/'),

  getMyTeachingCourses: () => apiCall('/courses/my_teaching_courses/'),
}

// Video APIs
export const videoAPI = {
  listVideos: (courseId = null) => {
    let url = '/videos/'
    if (courseId) url += `?course_id=${courseId}`
    return apiCall(url)
  },

  getVideo: (id) => apiCall(`/videos/${id}/`),

  uploadVideo: (formData) =>
    apiCall('/videos/', {
      method: 'POST',
      body: formData,
    }),

  incrementViews: (id) =>
    apiCall(`/videos/${id}/increment_views/`, {
      method: 'POST',
    }),
}

// Progress APIs
export const progressAPI = {
  getProgress: () => apiCall('/progress/'),

  updateProgress: (data) =>
    apiCall('/progress/update_progress/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
}

// Enrollment APIs
export const enrollmentAPI = {
  getEnrollments: () => apiCall('/enrollments/'),

  getEnrollment: (id) => apiCall(`/enrollments/${id}/`),
}
