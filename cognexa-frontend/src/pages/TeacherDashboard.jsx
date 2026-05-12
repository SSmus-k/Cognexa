import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, Video, BookOpen, Users, LogOut } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:8000/api'

export default function TeacherDashboard() {
  const [user, setUser] = useState(null)
  const [videos, setVideos] = useState([])
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    course: '',
    video_file: null,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      navigate('/login')
      return
    }
    
    setUser(JSON.parse(userData))
  }, [navigate])

  const handleUploadChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'video_file') {
      setUploadData({ ...uploadData, video_file: files[0] })
    } else {
      setUploadData({ ...uploadData, [name]: value })
    }
  }

  const handleUploadSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('title', uploadData.title)
      formData.append('description', uploadData.description)
      formData.append('course', uploadData.course)
      formData.append('video_file', uploadData.video_file)
      formData.append('is_published', true)

      const token = localStorage.getItem('token')
      const response = await axios.post(`${API_BASE_URL}/videos/`, formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setMessage('Video uploaded successfully!')
      setUploadData({ title: '', description: '', course: '', video_file: null })
      setShowUploadForm(false)
      
      // Refresh videos list
      fetchVideos()
    } catch (error) {
      setMessage('Error uploading video: ' + (error.response?.data?.detail || error.message))
    } finally {
      setLoading(false)
    }
  }

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/videos/`, {
        headers: { 'Authorization': `Token ${token}` },
      })
      setVideos(response.data)
    } catch (error) {
      console.error('Error fetching videos:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Teacher Dashboard
            </h1>
            <p className="text-slate-600 dark:text-gray-400">
              Welcome, {user.first_name || user.username}!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md"
          >
            <Video className="w-8 h-8 text-amber-600 mb-2" />
            <p className="text-slate-600 dark:text-gray-400 text-sm">Videos Uploaded</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{videos.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md"
          >
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-slate-600 dark:text-gray-400 text-sm">Students</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md"
          >
            <BookOpen className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-slate-600 dark:text-gray-400 text-sm">Courses</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
          </motion.div>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Upload size={24} className="text-amber-600" />
              Upload Video
            </h2>
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-all"
            >
              {showUploadForm ? 'Cancel' : 'Upload New Video'}
            </button>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mb-6 p-4 rounded-lg ${
                message.includes('Error')
                  ? 'bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200'
                  : 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200'
              }`}
            >
              {message}
            </motion.div>
          )}

          {showUploadForm && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleUploadSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={uploadData.title}
                    onChange={handleUploadChange}
                    placeholder="Enter video title"
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Course *
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={uploadData.course}
                    onChange={handleUploadChange}
                    placeholder="Enter course ID or name"
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={uploadData.description}
                  onChange={handleUploadChange}
                  placeholder="Enter video description"
                  rows="4"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Video File * (MP4, WebM, etc.)
                </label>
                <input
                  type="file"
                  name="video_file"
                  onChange={handleUploadChange}
                  accept="video/*"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:border-amber-600"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Uploading...' : 'Upload Video'}
              </motion.button>
            </motion.form>
          )}
        </motion.div>

        {/* Videos List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Your Videos
          </h2>

          {videos.length > 0 ? (
            <div className="space-y-4">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-l-4 border-amber-600 pl-4 py-4 bg-slate-50 dark:bg-slate-700 rounded-r-lg"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white">{video.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400">{video.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-slate-500 dark:text-gray-400">
                    <span>Views: {video.views}</span>
                    <span>Published: {video.is_published ? 'Yes' : 'No'}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Video className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-gray-400">No videos uploaded yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
