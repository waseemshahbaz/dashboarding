import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addUser } from '../utils/auth';

export default function Signup() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    addUser({ username: form.username, password: form.password });
    setError('');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-blue-900">
      <motion.form
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-4">Sign Up</h2>
        <div>
          <label className="block text-gray-600 dark:text-gray-300 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        {error && (
          <motion.div
            className="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded p-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create Account
        </button>
        <div className="text-center text-gray-500 dark:text-gray-300 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Sign In</Link>
        </div>
      </motion.form>
    </div>
  );
} 