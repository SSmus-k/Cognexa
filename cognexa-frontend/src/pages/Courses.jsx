import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Filter, Search } from 'lucide-react'
import axios from 'axios'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const subjects = ['all', 'Math', 'Science', 'English', 'Nepali', 'SocialStudies']

  useEffect(() => {
    // Fetch courses from Django API
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses/')
        setCourses(response.data)
        setFilteredCourses(response.data)
      } catch (error) {
        console.error('Error fetching courses:', error)
        // Mock data for demo
        setCourses([
          { id: 1, title: 'Algebra Basics', subject: 'Math', description: 'Learn fundamentals of algebra' },
          { id: 2, title: 'Physics 101', subject: 'Science', description: 'Introduction to physics' },
          { id: 3, title: 'English Grammar', subject: 'English', description: 'Master English grammar' },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  useEffect(() => {
    let filtered = courses

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(course => course.subject === selectedSubject)
    }

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredCourses(filtered)
  }, [selectedSubject, searchTerm, courses])

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-slate-900 dark:text-white mb-4">Explore Courses</h1>
          <p className="text-slate-600 dark:text-gray-400 text-lg">
            Choose from our comprehensive collection of courses
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:border-amber-600"
            />
          </div>

          {/* Subject Filter */}
          <div className="flex flex-wrap gap-3">
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedSubject === subject
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300'
                }`}
              >
                {subject === 'all' ? 'All Subjects' : subject === 'SocialStudies' ? 'Social Studies' : subject}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <BookOpen className="w-8 h-8 text-amber-600" />
            </div>
            <p className="mt-4 text-slate-600 dark:text-gray-400">Loading courses...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card group cursor-pointer"
              >
                <div className="mb-4 h-40 bg-gradient-to-br from-amber-200 to-amber-400 rounded-lg group-hover:shadow-lg transition-all" />
                <h3 className="text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">
                  {course.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-amber-600 bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full">
                    {course.subject}
                  </span>
                  <button className="text-amber-600 hover:text-amber-700 font-semibold">
                    Enroll →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-gray-400">No courses found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
