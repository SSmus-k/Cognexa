import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Brain, Zap, Users, ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }} className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 md:py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Subtle background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 rounded-full"
            style={{ backgroundColor: 'rgba(92, 124, 111, 0.03)' }}
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full"
            style={{ backgroundColor: 'rgba(92, 124, 111, 0.03)' }}
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--accent-pale)' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ color: 'var(--accent-primary)' }} className="text-sm font-medium">Welcome to CognexaAi</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              style={{ color: 'var(--text-secondary)' }}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Learn with Purpose.
              <br />
              <span style={{ color: 'var(--accent-primary)' }}>Grow with Intention.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              style={{ color: 'var(--text-muted)' }}
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            >
              CognexaAi is an AI-powered learning platform designed for Nepali students. Learn at your pace, master new skills, and track your progress with intelligent insights.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Start Learning <ArrowRight size={18} />
              </Link>
              <Link
                to="/courses"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Explore Courses
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto">
              <div>
                <div style={{ color: 'var(--accent-primary)' }} className="text-3xl font-bold">10,000+</div>
                <div style={{ color: 'var(--text-muted)' }} className="text-sm">Students</div>
              </div>
              <div>
                <div style={{ color: 'var(--accent-primary)' }} className="text-3xl font-bold">500+</div>
                <div style={{ color: 'var(--text-muted)' }} className="text-sm">Lessons</div>
              </div>
              <div>
                <div style={{ color: 'var(--accent-primary)' }} className="text-3xl font-bold">5</div>
                <div style={{ color: 'var(--text-muted)' }} className="text-sm">Subjects</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 md:py-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              style={{ color: 'var(--text-secondary)' }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Why Choose CognexaAi?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              style={{ color: 'var(--text-muted)' }}
              className="text-lg max-w-2xl mx-auto"
            >
              Designed for focused learning with minimal distractions
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <Brain size={24} />, title: 'AI Tutor', desc: 'Get instant answers powered by AI' },
              { icon: <BookOpen size={24} />, title: '5 Subjects', desc: 'Math, Science, English, Nepali, Social Studies' },
              { icon: <Zap size={24} />, title: 'Gamified', desc: 'Earn XP, badges, and climb leaderboards' },
              { icon: <Users size={24} />, title: 'Community', desc: 'Learn together with peers' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card group"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: 'var(--accent-pale)', color: 'var(--accent-primary)' }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ color: 'var(--text-secondary)' }} className="font-semibold mb-2">{feature.title}</h3>
                <p style={{ color: 'var(--text-muted)' }} className="text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Subjects Section */}
      <motion.section
        className="py-20 md:py-32 grid-bg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              style={{ color: 'var(--text-secondary)' }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Study Any Subject
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {['Math', 'Science', 'English', 'Nepali', 'Social Studies'].map((subject, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card text-center"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <h3 style={{ color: 'var(--text-secondary)' }} className="font-semibold">{subject}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 md:py-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="card text-center"
            style={{ backgroundColor: 'var(--accent-primary)', color: 'white' }}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg mb-8 opacity-90">Join thousands of Nepali students mastering new skills with CognexaAi</p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all"
              style={{ backgroundColor: 'white', color: 'var(--accent-primary)' }}
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--surface)', borderTopColor: 'var(--divider)' }} className="border-t py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 style={{ color: 'var(--text-secondary)' }} className="font-semibold mb-4">CognexaAi</h3>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">AI-powered learning for Nepali students</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-secondary)' }} className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/courses" style={{ color: 'var(--text-muted)' }} className="text-sm hover:opacity-70">Courses</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-secondary)' }} className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" style={{ color: 'var(--text-muted)' }} className="text-sm hover:opacity-70">About</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-secondary)' }} className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" style={{ color: 'var(--text-muted)' }} className="text-sm hover:opacity-70">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTopColor: 'var(--divider)' }} className="border-t pt-8 text-center">
            <p style={{ color: 'var(--text-muted)' }} className="text-sm">© 2024 CognexaAi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
