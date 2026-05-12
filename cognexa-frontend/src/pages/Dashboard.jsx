import { motion } from 'framer-motion'
import { Zap, Trophy, Flame, BookOpen, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { icon: <Zap className="w-6 h-6" />, label: 'Total XP', value: '2,450', color: 'text-amber-600' },
    { icon: <Trophy className="w-6 h-6" />, label: 'Rank', value: '#42', color: 'text-blue-600' },
    { icon: <Flame className="w-6 h-6" />, label: 'Current Streak', value: '15 days', color: 'text-red-600' },
    { icon: <BookOpen className="w-6 h-6" />, label: 'Courses Enrolled', value: '8', color: 'text-green-600' },
  ]

  const recentActivity = [
    { title: 'Completed Algebra Basics', time: '2 hours ago', xp: '+50 XP' },
    { title: 'Earned "Math Master" Badge', time: '1 day ago', xp: '+100 XP' },
    { title: 'Completed Physics Quiz', time: '2 days ago', xp: '+75 XP' },
    { title: 'Started English Grammar Course', time: '3 days ago', xp: '+25 XP' },
  ]

  const enrolledCourses = [
    { name: 'Algebra Basics', progress: 75, subject: 'Math' },
    { name: 'Physics 101', progress: 50, subject: 'Science' },
    { name: 'English Grammar', progress: 90, subject: 'English' },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-slate-900 dark:text-white mb-2">Welcome back, Student!</h1>
          <p className="text-slate-600 dark:text-gray-400">Keep up your learning streak and reach new heights</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card"
            >
              <div className={`${stat.color} mb-4`}>{stat.icon}</div>
              <p className="text-sm text-slate-600 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 card"
          >
            <h2 className="text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              Your Courses
            </h2>
            <div className="space-y-6">
              {enrolledCourses.map((course, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b dark:border-slate-700 pb-6 last:border-0"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{course.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-gray-400">{course.subject}</p>
                    </div>
                    <span className="text-sm font-bold text-amber-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-600" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-l-4 border-amber-600 pl-4 py-2"
                >
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">{activity.title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-slate-600 dark:text-gray-400">{activity.time}</p>
                    <span className="text-xs font-bold text-amber-600">{activity.xp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-2">Continue Learning</h3>
          <p className="text-amber-100 mb-6">You're on a 15-day streak! Keep it going!</p>
          <button className="bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-amber-50 transition-all">
            Start Next Lesson
          </button>
        </motion.div>
      </div>
    </div>
  )
}
