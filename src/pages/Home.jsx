import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { FiLogOut } from 'react-icons/fi';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'footer', label: 'Footer' },
];

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-4 md:p-8 relative">
          {/* Navigation */}
          <nav className="w-full bg-white/80 dark:bg-gray-900/80 shadow z-30 flex justify-center items-center py-3 space-x-6 backdrop-blur mb-8 rounded-xl">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors px-2"
              >
                {s.label}
              </button>
            ))}
            <motion.div
              whileHover={{ scale: 1.08, boxShadow: '0 4px 16px rgba(59,130,246,0.10)' }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="ml-4"
            >
              <Link
                to="/logout"
                className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 dark:text-blue-300 bg-white dark:bg-gray-900 rounded-lg font-semibold shadow-sm hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <FiLogOut className="text-lg" />
                <span>Logout</span>
              </Link>
            </motion.div>
          </nav>

          {/* Hero Section */}
          <section id="hero" className="pt-8 pb-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-blue-700 dark:text-blue-400 mb-4"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Simple Sales Dashboard
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-200 mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Effortlessly track sales, customers, and products in one place.
            </motion.p>
            <motion.button
              className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg font-semibold text-lg hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/get-started'}
            >
              Get Started
            </motion.button>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-5xl mx-auto px-4">
              <SectionHeader title="Features" subtitle="Everything you need to manage your sales" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
                {[
                  {
                    icon: '📊',
                    title: 'Dashboard',
                    desc: 'Visualize sales and growth with interactive charts.'
                  },
                  {
                    icon: '👥',
                    title: 'Customers',
                    desc: 'Manage customer data and track engagement.'
                  },
                  {
                    icon: '📦',
                    title: 'Products',
                    desc: 'Organize your product catalog and inventory.'
                  },
                  {
                    icon: '⚙️',
                    title: 'Settings',
                    desc: 'Customize your experience and preferences.'
                  },
                ].map((f, i) => (
                  <motion.div
                    key={f.title}
                    className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-lg"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <div className="text-4xl mb-3">{f.icon}</div>
                    <div className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-1">{f.title}</div>
                    <div className="text-gray-600 dark:text-gray-200 text-center">{f.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Stack Section */}
          <section id="tech" className="py-20">
            <div className="max-w-4xl mx-auto px-4">
              <SectionHeader title="Technology Stack" subtitle="Modern tools for a seamless experience" />
              <motion.ul
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {[
                  { name: 'React', desc: 'UI Library' },
                  { name: 'Tailwind CSS', desc: 'Utility-first CSS' },
                  { name: 'Framer Motion', desc: 'Animations' },
                  { name: 'Recharts', desc: 'Charts' },
                ].map((tech) => (
                  <motion.li
                    key={tech.name}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="font-bold text-blue-700 dark:text-blue-300 text-lg mb-1">{tech.name}</div>
                    <div className="text-gray-500 dark:text-gray-300">{tech.desc}</div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" className="py-20 bg-blue-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4">
              <SectionHeader title="Why Use This App?" subtitle="Key benefits for your business" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                {[
                  {
                    icon: '🚀',
                    title: 'Fast Setup',
                    desc: 'Get started in minutes with no complex setup.'
                  },
                  {
                    icon: '🔒',
                    title: 'Secure',
                    desc: 'Your data is safe and private.'
                  },
                  {
                    icon: '📱',
                    title: 'Responsive',
                    desc: 'Works on any device, anywhere.'
                  },
                ].map((b, i) => (
                  <motion.div
                    key={b.title}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-lg"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <div className="text-4xl mb-3">{b.icon}</div>
                    <div className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-1">{b.title}</div>
                    <div className="text-gray-600 dark:text-gray-200 text-center">{b.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer id="footer" className="py-10 bg-white dark:bg-gray-900 text-center text-gray-500 dark:text-gray-400">
            <div className="max-w-4xl mx-auto px-4">
              <div className="mb-2 font-semibold">Simple Sales Dashboard</div>
              <div>&copy; {new Date().getFullYear()} All rights reserved.</div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
} 