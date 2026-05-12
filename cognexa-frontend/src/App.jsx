import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Menu, X, Moon, Sun } from 'lucide-react'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <Router>
      <div className={`min-h-screen ${isDark ? 'dark bg-slate-900' : 'bg-amber-50'}`}>
        {/* Navigation */}
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
                {isAuthenticated && (
                  <Link to="/dashboard" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-slate-900'} transition-colors`}>
                    Dashboard
                  </Link>
                )}
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`p-2 rounded-lg ${isDark ? 'bg-slate-700 text-amber-400' : 'bg-amber-100 text-amber-600'}`}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`md:hidden pb-4 space-y-2`}
              >
                <Link to="/courses" className="block py-2">Courses</Link>
                {isAuthenticated && (
                  <Link to="/dashboard" className="block py-2">Dashboard</Link>
                )}
              </motion.div>
            )}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        {/* Footer */}
        <footer className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-amber-100 border-amber-200'} border-t mt-20`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className={`w-6 h-6 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  <span className="font-bold">CognexaAi</span>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  AI-powered learning platform for Nepali students
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Product</h4>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li><a href="#" className="hover:text-amber-600">Features</a></li>
                  <li><a href="#" className="hover:text-amber-600">Pricing</a></li>
                  <li><a href="#" className="hover:text-amber-600">Courses</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li><a href="#" className="hover:text-amber-600">About</a></li>
                  <li><a href="#" className="hover:text-amber-600">Blog</a></li>
                  <li><a href="#" className="hover:text-amber-600">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li><a href="#" className="hover:text-amber-600">Privacy</a></li>
                  <li><a href="#" className="hover:text-amber-600">Terms</a></li>
                  <li><a href="#" className="hover:text-amber-600">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className={`border-t ${isDark ? 'border-slate-700' : 'border-amber-200'} pt-8 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>&copy; 2026 CognexaAi. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
