import { motion } from 'framer-motion'
import { Sparkles, BookOpen, Brain, Zap, Users, Trophy, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  }

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "500+ Video Lessons",
      description: "Comprehensive courses in Math, Science, English, Nepali, and Social Studies"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Tutor",
      description: "Get instant explanations and personalized learning recommendations"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Gamified Learning",
      description: "Earn XP, badges, and climb the leaderboard while learning"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Support",
      description: "Learn together with 10,000+ Nepali students"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Track Progress",
      description: "Detailed analytics and personalized learning paths"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Premium Content",
      description: "Unlock advanced courses with expert instructors"
    }
  ]

  const subjects = [
    { name: "Math", emoji: "📐" },
    { name: "Science", emoji: "🔬" },
    { name: "English", emoji: "📚" },
    { name: "Nepali", emoji: "🇳🇵" },
    { name: "Social Studies", emoji: "🌍" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center space-y-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-16 h-16 text-amber-600" />
              </motion.div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-slate-900 dark:text-white">
              Welcome to CognexaAi
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-slate-700 dark:text-gray-300">
              Master Math, Science, English, Nepali, and Social Studies with AI-powered tutoring, gamified learning, and personalized education paths designed for Nepali students.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link to="/courses">
                <button className="btn btn-primary flex items-center gap-2">
                  Start Learning <ArrowRight size={20} />
                </button>
              </Link>
              <button className="btn btn-secondary">
                Learn More
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 pt-12">
              <div>
                <div className="text-3xl font-bold text-amber-600">10,000+</div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Students Learning</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">500+</div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Video Lessons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">5</div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Subject Areas</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-800 bg-opacity-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-slate-900 dark:text-white mb-4">Why Choose CognexaAi?</h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for successful learning in one platform
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card group"
              >
                <div className="text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-slate-900 dark:text-white mb-4">Our Subject Categories</h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive courses across all major subjects
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {subjects.map((subject, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card text-center cursor-pointer hover:scale-105"
              >
                <div className="text-5xl mb-4">{subject.emoji}</div>
                <h3 className="text-slate-900 dark:text-white font-semibold">{subject.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            <h2 className="text-white">Ready to Transform Your Learning?</h2>
            <p className="text-lg text-amber-100">
              Join thousands of Nepali students already learning with CognexaAi
            </p>
            <Link to="/courses">
              <button className="bg-white text-amber-600 font-semibold px-8 py-3 rounded-lg hover:bg-amber-50 transition-all">
                Get Started Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
