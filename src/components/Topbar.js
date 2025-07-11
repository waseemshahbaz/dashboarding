import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Topbar() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-gray-900/80 shadow-md transition-colors duration-500 sticky top-0 z-10">
      <div className="flex items-center space-x-2 md:hidden">
        <button className="text-2xl text-blue-600 dark:text-blue-400 focus:outline-none">
          <FaBars />
        </button>
      </div>
      <motion.div
        whileHover={{ scale: 1.05, color: '#2563eb', textShadow: '0 2px 8px #3b82f6' }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="flex-1 flex justify-center"
      >
        <Link
          to="/home"
          className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight hover:underline focus:outline-none transition-colors duration-200"
          aria-label="Go to Home"
        >
          Simple Sales Dashboard
        </Link>
      </motion.div>
      <button
        className="ml-4 p-2 rounded-full bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-300 shadow hover:scale-110 transition-transform"
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle dark mode"
      >
        {dark ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
} 