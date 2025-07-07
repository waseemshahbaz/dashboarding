import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

export default function Settings() {
  const [profile, setProfile] = useState({ name: 'Jane Doe', email: 'jane.doe@email.com' });
  const [notifications, setNotifications] = useState({
    sales: true,
    customers: false,
    products: true,
  });
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleThemeToggle = () => {
    setDarkMode((d) => {
      const newMode = !d;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  return (
    <div className="max-w-xl mx-auto relative">
      {/* Home Button */}
      <motion.div
        className="absolute top-0 right-0 mt-2 mr-2 z-20"
        whileHover={{ scale: 1.08, boxShadow: '0 4px 16px rgba(59,130,246,0.10)' }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          to="/home"
          className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 dark:text-blue-300 bg-white dark:bg-gray-900 rounded-lg font-semibold shadow-sm hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FiHome className="text-lg" />
          <span>Home</span>
        </Link>
      </motion.div>
      <SectionHeader title="Settings" subtitle="Adjust your preferences" />
      <motion.form
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={e => e.preventDefault()}
      >
        {/* Profile Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Notification Preferences</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sales"
                checked={notifications.sales}
                onChange={handleNotificationChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-200">Sales Updates</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="customers"
                checked={notifications.customers}
                onChange={handleNotificationChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-200">Customer Activity</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="products"
                checked={notifications.products}
                onChange={handleNotificationChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-200">Product Changes</span>
            </label>
          </div>
        </div>

        {/* Theme Mode */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Theme Mode</h3>
          <button
            type="button"
            onClick={handleThemeToggle}
            className={`px-4 py-2 rounded font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </motion.form>
    </div>
  );
} 