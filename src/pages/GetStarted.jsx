import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRightCircle } from 'react-icons/fi';

export default function GetStarted() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-blue-900">
      <motion.div
        className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome to Your Sales Journey!
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Discover powerful insights, track your performance, and manage your business pipeline with ease. Dive into your dashboard to get started!
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Go to Dashboard <FiArrowRightCircle className="text-2xl" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 