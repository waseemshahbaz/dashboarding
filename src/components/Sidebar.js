import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { FaChartBar, FaBoxOpen, FaUsers, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <FaChartBar /> },
  { name: 'Products', path: '/products', icon: <FaBoxOpen /> },
  { name: 'Customers', path: '/customers', icon: <FaUsers /> },
  { name: 'Settings', path: '/settings', icon: <FaCog /> },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden md:flex flex-col w-20 bg-white dark:bg-gray-900 shadow-lg transition-colors duration-500 z-20">
      <div className="flex flex-col items-center py-6 space-y-8 h-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8"
        >
          <Link
            to="/home"
            className="block rounded-full focus:outline-none"
          >
            <motion.span
              whileHover={{ scale: 1.15, boxShadow: '0 0 16px #3b82f6' }}
              whileTap={{ scale: 0.95, boxShadow: '0 0 24px #2563eb' }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="inline-block px-3 py-1 cursor-pointer select-none"
              aria-label="Go to Home"
            >
              S
            </motion.span>
          </Link>
        </motion.div>
        <nav className="flex flex-col space-y-6 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 text-xl ${
                  isActive || location.pathname === item.path
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 shadow-lg scale-110'
                    : 'text-gray-400 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-gray-800 dark:hover:text-blue-300'
                }`
              }
            >
              {item.icon}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
} 