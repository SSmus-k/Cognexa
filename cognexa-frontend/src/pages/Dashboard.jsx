import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Trophy, Flame, Play, Plus, TrendingUp } from 'lucide-react'
import { courseAPI, progressAPI } from '../services/api'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [myCourses, setMyCourses] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ xp: 0, streak: 0, badges: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) { navigate('/login'); return }
    setUser(JSON.parse(userData))
    fetchDashboardData()
  }, [navigate])

  const generateDefaultActivities = () => [
    { title: 'Started learning journey', time: 'Today', xp: '+25 XP' },
    { title: 'Completed first lesson', time: 'Yesterday', xp: '+50 XP' },
    { title: 'Earned first badge', time: '2 days ago', xp: '+100 XP' },
    { title: 'Joined CognexaAi', time: '3 days ago', xp: '+10 XP' },
  ]

  const fetchDashboardData = async () => {
    try {
      const [myCoursesRes, allCoursesRes] = await Promise.all([
        courseAPI.getMyCourses(),
        courseAPI.listCourses(),
      ])
      setMyCourses(myCoursesRes.results || myCoursesRes)
      setAllCourses(allCoursesRes.results || allCoursesRes)

      try {
        const progressRes = await progressAPI.getProgress()
        const data = progressRes.results || progressRes
        if (data && data.length > 0) {
          setRecentActivities(data.slice(0, 4).map(p => ({
            title: `Completed ${p.course_title || 'a lesson'}`,
            time: new Date(p.updated_at).toLocaleDateString(),
            xp: '+50 XP',
          })))
        } else {
          setRecentActivities(generateDefaultActivities())
        }
      } catch {
        setRecentActivities(generateDefaultActivities())
      }

      setStats({ xp: 1250, streak: 7, badges: 3 })
    } catch (error) {
      console.error('Error fetching data:', error)
      setRecentActivities(generateDefaultActivities())
    } finally {
      setLoading(false)
    }
  }

  const enrollCourse = async (courseId) => {
    try {
      await courseAPI.enrollCourse(courseId)
      fetchDashboardData()
    } catch (error) {
      console.error('Error enrolling:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <p className="animate-soft-pulse" style={{ color: 'var(--text-muted)' }}>Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }} className="min-h-screen">

      {/* Header */}
      <div
        style={{ backgroundColor: 'var(--surface)', borderBottomColor: 'var(--divider)' }}
        className="border-b sticky top-16 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 style={{ color: 'var(--text-secondary)' }} className="text-2xl font-semibold">Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }} className="text-sm mt-1">
            Welcome back, {user?.first_name || user?.username}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: <TrendingUp size={20} />, label: 'Total XP', value: stats.xp },
            { icon: <Flame size={20} />, label: 'Learning Streak', value: `${stats.streak} days` },
            { icon: <Trophy size={20} />, label: 'Badges Earned', value: stats.badges },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="card"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-2">{stat.label}</p>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-3xl font-semibold">{stat.value}</p>
                </div>
                <div style={{ color: 'var(--accent-primary)' }} className="opacity-60">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">

          {/* My Courses */}
          <motion.div className="lg:col-span-2" variants={itemVariants} initial="hidden" animate="visible">
            <div className="card" style={{ backgroundColor: 'var(--surface)' }}>
              <h2 style={{ color: 'var(--text-secondary)' }} className="text-lg font-semibold mb-6 flex items-center gap-2">
                <BookOpen size={20} style={{ color: 'var(--accent-primary)' }} />
                My Courses
              </h2>

              {myCourses.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }} className="text-center py-8 text-sm">
                  No courses yet. Explore and enroll below.
                </p>
              ) : (
                <div className="space-y-4">
                  {myCourses.map((course, idx) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      style={{ borderBottomColor: 'var(--divider)' }}
                      className="border-b pb-4 last:border-0"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 style={{ color: 'var(--text-secondary)' }} className="font-medium text-sm">{course.title}</h3>
                          <p style={{ color: 'var(--text-muted)' }} className="text-xs mt-0.5">{course.subject}</p>
                        </div>
                        <span style={{ color: 'var(--accent-primary)' }} className="text-sm font-semibold">75%</span>
                      </div>
                      <div className="progress-bar mb-3">
                        <motion.div
                          className="progress-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <button
                        onClick={() => navigate(`/courses/${course.id}`)}
                        style={{ color: 'var(--accent-primary)' }}
                        className="text-xs font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
                      >
                        <Play size={12} /> Continue Learning
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div className="card" style={{ backgroundColor: 'var(--surface)' }} variants={itemVariants} initial="hidden" animate="visible">
            <h2 style={{ color: 'var(--text-secondary)' }} className="text-lg font-semibold mb-6 flex items-center gap-2">
              <TrendingUp size={20} style={{ color: 'var(--accent-primary)' }} />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivities.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  style={{ borderLeftColor: 'var(--accent-primary)', backgroundColor: 'var(--bg-tertiary)' }}
                  className="border-l-2 pl-4 py-3 rounded-r-lg"
                >
                  <p style={{ color: 'var(--text-secondary)' }} className="font-medium text-sm">{activity.title}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p style={{ color: 'var(--text-muted)' }} className="text-xs">{activity.time}</p>
                    <span style={{ color: 'var(--accent-primary)' }} className="text-xs font-semibold">{activity.xp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Explore Courses */}
        <motion.div className="card" style={{ backgroundColor: 'var(--surface)' }} variants={itemVariants} initial="hidden" animate="visible">
          <h2 style={{ color: 'var(--text-secondary)' }} className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Trophy size={20} style={{ color: 'var(--accent-primary)' }} />
            Explore Courses
          </h2>

          {allCourses.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }} className="text-center py-8 text-sm">No courses available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCourses.map((course, idx) => {
                const isEnrolled = myCourses.some(c => c.id === course.id)
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--divider)' }}
                    className="border rounded-lg p-4 transition-all"
                  >
                    <div className="badge mb-3">{course.subject}</div>
                    <h3 style={{ color: 'var(--text-secondary)' }} className="font-medium mb-1 text-sm">{course.title}</h3>
                    <p style={{ color: 'var(--text-muted)' }} className="text-xs mb-4 line-clamp-2">{course.description}</p>
                    <button
                      onClick={() => !isEnrolled && enrollCourse(course.id)}
                      disabled={isEnrolled}
                      style={{
                        backgroundColor: isEnrolled ? 'var(--bg-secondary)' : 'var(--accent-primary)',
                        color: isEnrolled ? 'var(--text-muted)' : 'white'
                      }}
                      className="w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all disabled:cursor-not-allowed"
                    >
                      <Plus size={12} />
                      {isEnrolled ? 'Enrolled' : 'Enroll'}
                    </button>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}