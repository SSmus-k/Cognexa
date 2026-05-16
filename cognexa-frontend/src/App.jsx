import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Menu, X, Moon, Sun, LogOut } from 'lucide-react'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TeacherDashboard from './pages/TeacherDashboard'
import './App.css'

function Navigation({ isDark, setIsDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <nav className={`sticky top-0 z-50 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-200'} border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className={`w-8 h-8 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            </motion.div>
            <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CognexaAi
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/courses" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-slate-900'} transition-colors`}>
              Courses
            </Link>
            {user && (
              <>
                {user.role === 'teacher' ? (
                  <Link to="/teacher-dashboard" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-slate-900'} transition-colors`}>
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/dashboard" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-slate-900'} transition-colors`}>
                    Dashboard
                  </Link>
                )}
              </>
            )}

            {/* Auth Buttons */}
            {!user ? (
              <>
                <Link to="/login" className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-lg border-2 border-amber-600 text-amber-600 hover:bg-amber-50 transition-colors">
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg ${isDark ? 'bg-slate-700 text-yellow-400' : 'bg-amber-100 text-amber-600'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg ${isDark ? 'bg-slate-700 text-yellow-400' : 'bg-amber-100 text-amber-600'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-amber-100'}`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden py-4 space-y-2 ${isDark ? 'bg-slate-700' : 'bg-amber-50'}`}
          >
            <Link to="/courses" className="block px-4 py-2 hover:bg-amber-100 dark:hover:bg-slate-600 rounded">
              Courses
            </Link>
            {user && (
              <Link to="/dashboard" className="block px-4 py-2 hover:bg-amber-100 dark:hover:bg-slate-600 rounded">
                Dashboard
              </Link>
            )}
            {!user ? (
              <>
                <Link to="/login" className="block px-4 py-2 hover:bg-amber-100 dark:hover:bg-slate-600 rounded">
                  Login
                </Link>
                <Link to="/signup" className="block px-4 py-2 hover:bg-amber-100 dark:hover:bg-slate-600 rounded">
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

function App() {
  const [isDark, setIsDark] = useState(() => {
  return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])
  return (
    <Router>
      <div className={`min-h-screen ${isDark ? 'dark bg-slate-900' : 'bg-amber-50'}`}>
        <Navigation isDark={isDark} setIsDark={setIsDark} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
