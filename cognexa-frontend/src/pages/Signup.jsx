import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    role: 'student',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/users/register/`, formData)

      setSuccess(true)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      setTimeout(() => {
        if (response.data.user.role === 'teacher') {
          navigate('/teacher-dashboard')
        } else {
          navigate('/dashboard')
        }
      }, 2000)
    } catch (err) {
      const errorMsg = err.response?.data
      if (typeof errorMsg === 'object') {
        setError(Object.values(errorMsg)[0]?.[0] || 'Signup failed')
      } else {
        setError('Signup failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Account Created Successfully!
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            Redirecting you to your dashboard...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Join CognexaAi
          </h1>
          <p className="text-slate-600 dark:text-gray-400">
            Start your learning journey today
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg flex gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-200 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                I am a:
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-slate-700 dark:text-gray-300">Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="teacher"
                    checked={formData.role === 'teacher'}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-slate-700 dark:text-gray-300">Teacher</span>
                </label>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-amber-600"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-amber-600"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-amber-600"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-amber-600"
                  required
                />
              </div>
            </div>

            {/* Signup Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 dark:text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="text-amber-600 hover:text-amber-700 font-semibold">
                Login here
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
