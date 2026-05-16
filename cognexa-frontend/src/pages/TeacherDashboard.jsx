import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Video, BookOpen, Users, Plus, X, CheckCircle, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { videoAPI, courseAPI } from '../services/api'

export default function TeacherDashboard() {
  const [user, setUser] = useState(null)
  const [videos, setVideos] = useState([])
  const [courses, setCourses] = useState([])
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    course: '',
    video_file: null,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (!token || !userData) {
      navigate('/login')
      return
    }
    setUser(JSON.parse(userData))
    fetchVideos()
    fetchCourses()
  }, [navigate])

  const fetchCourses = async () => {
    try {
      const data = await courseAPI.getMyTeachingCourses()
      setCourses(data.results || data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const fetchVideos = async () => {
    try {
      const data = await videoAPI.listVideos()
      setVideos(data.results || data)
    } catch (error) {
      console.error('Error fetching videos:', error)
    }
  }

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
    setMessage({ text: '', type: '' })

    try {
      const formData = new FormData()
      formData.append('title', uploadData.title)
      formData.append('description', uploadData.description)
      formData.append('course', uploadData.course)
      formData.append('video_file', uploadData.video_file)
      formData.append('is_published', true)

      await videoAPI.uploadVideo(formData)

      setMessage({ text: 'Video uploaded successfully!', type: 'success' })
      setUploadData({ title: '', description: '', course: '', video_file: null })
      setShowUploadForm(false)
      fetchVideos()
    } catch (error) {
      setMessage({ text: 'Error uploading video: ' + error.message, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    )
  }

  const stats = [
    { icon: <Video size={20} />, label: 'Videos Uploaded', value: videos.length },
    { icon: <Users size={20} />, label: 'Students', value: 0 },
    { icon: <BookOpen size={20} />, label: 'Courses', value: courses.length },
  ]

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }} className="min-h-screen">

      {/* Header */}
      <div
        style={{ backgroundColor: 'var(--surface)', borderBottomColor: 'var(--divider)' }}
        className="border-b sticky top-16 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 style={{ color: 'var(--text-secondary)' }} className="text-2xl font-semibold">
            Teacher Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)' }} className="text-sm mt-1">
            Welcome back, {user.first_name || user.username}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-2">
                    {stat.label}
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-3xl font-semibold">
                    {stat.value}
                  </p>
                </div>
                <div style={{ color: 'var(--accent-primary)' }} className="opacity-60">
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 style={{ color: 'var(--text-secondary)' }} className="text-lg font-semibold flex items-center gap-2">
              <Upload size={20} style={{ color: 'var(--accent-primary)' }} />
              Upload Video
            </h2>
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: showUploadForm ? 'var(--bg-secondary)' : 'var(--accent-primary)',
                color: showUploadForm ? 'var(--text-muted)' : 'white'
              }}
            >
              {showUploadForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Upload New Video</>}
            </button>
          </div>

          {/* Message */}
          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 rounded-lg flex items-center gap-3"
                style={{
                  backgroundColor: message.type === 'error' ? '#FEF2F2' : '#F0FDF4',
                  color: message.type === 'error' ? '#DC2626' : '#16A34A'
                }}
              >
                {message.type === 'error'
                  ? <AlertCircle size={18} />
                  : <CheckCircle size={18} />
                }
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload Form */}
          <AnimatePresence>
            {showUploadForm && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleUploadSubmit}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label style={{ color: 'var(--text-secondary)' }} className="block text-sm font-medium mb-2">
                      Video Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={uploadData.title}
                      onChange={handleUploadChange}
                      placeholder="Enter video title"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ color: 'var(--text-secondary)' }} className="block text-sm font-medium mb-2">
                      Course *
                    </label>
                    <select
                      name="course"
                      value={uploadData.course}
                      onChange={handleUploadChange}
                      required
                    >
                      <option value="">Select a course</option>
                      {courses.length > 0 ? (
                        courses.map(course => (
                          <option key={course.id} value={course.id}>{course.title}</option>
                        ))
                      ) : (
                        <>
                          <option value="1">Math 101</option>
                          <option value="2">Science 101</option>
                          <option value="3">English 101</option>
                          <option value="4">Nepali 101</option>
                          <option value="5">Social Studies 101</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ color: 'var(--text-secondary)' }} className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={uploadData.description}
                    onChange={handleUploadChange}
                    placeholder="Enter video description"
                    rows="3"
                  />
                </div>

                <div>
                  <label style={{ color: 'var(--text-secondary)' }} className="block text-sm font-medium mb-2">
                    Video File * (MP4, WebM, etc.)
                  </label>
                  <input
                    type="file"
                    name="video_file"
                    onChange={handleUploadChange}
                    accept="video/*"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                >
                  {loading ? 'Uploading...' : 'Upload Video'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Videos List */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <h2 style={{ color: 'var(--text-secondary)' }} className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Video size={20} style={{ color: 'var(--accent-primary)' }} />
            Your Videos
          </h2>

          {videos.length > 0 ? (
            <div className="space-y-6">
              {videos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{
                    borderLeftColor: 'var(--accent-primary)',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderBottomColor: 'var(--divider)'
                  }}
                  className="border-l-2 pl-4 py-4 rounded-r-lg border-b last:border-b-0"
                >
                  {/* Fixed video player — constrained height, black background for portrait */}
                  {video.video_file && (
                    <div className="mb-4 rounded-lg overflow-hidden bg-black flex items-center justify-center"
                      style={{ maxHeight: '280px' }}
                    >
                      <video
                        controls
                        style={{ maxHeight: '280px', maxWidth: '100%', objectFit: 'contain' }}
                        src={video.video_file}
                      />
                    </div>
                  )}

                  <h3 style={{ color: 'var(--text-secondary)' }} className="font-medium mb-1">
                    {video.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)' }} className="text-sm mb-3">
                    {video.description}
                  </p>
                  <div className="flex gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>Views: {video.views}</span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: video.is_published ? 'var(--accent-pale)' : 'var(--bg-secondary)',
                        color: video.is_published ? 'var(--accent-primary)' : 'var(--text-muted)'
                      }}
                    >
                      {video.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Video className="w-10 h-10 mx-auto mb-4 opacity-30" style={{ color: 'var(--text-muted)' }} />
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">No videos uploaded yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}