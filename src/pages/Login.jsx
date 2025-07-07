import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { login } from '../utils/auth';
import { FiUser, FiLock } from 'react-icons/fi';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (login(form.username, form.password)) {
        setError('');
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/background.jpg'})` }}
    >
      {/* Overlay for darken effect */}
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm z-0" />
      <div className="relative z-10 w-full flex items-center justify-center min-h-screen p-4">
        <motion.form
          className="w-full max-w-md mx-auto rounded-2xl bg-white/20 dark:bg-gray-800/30 shadow-2xl backdrop-blur-lg border border-white/30 dark:border-gray-700/40 p-8 flex flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-center text-white drop-shadow mb-6">Login</h2>
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full py-3 pl-12 pr-4 rounded-full bg-white/30 dark:bg-gray-900/40 border border-white/40 dark:border-gray-700/40 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-base shadow-inner"
              placeholder="Username"
              autoFocus
              required
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none">
              <FiUser size={20} />
            </span>
          </div>
          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full py-3 pl-12 pr-4 rounded-full bg-white/30 dark:bg-gray-900/40 border border-white/40 dark:border-gray-700/40 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-base shadow-inner"
              placeholder="Password"
              required
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none">
              <FiLock size={20} />
            </span>
          </div>
          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between text-white/90 text-sm mb-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="form-checkbox rounded border-white/40 bg-white/20 focus:ring-blue-400"
              />
              Remember me
            </label>
            <Link to="#" className="hover:underline text-white/80">Forgot password?</Link>
          </div>
          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="text-red-200 bg-red-700/60 rounded p-2 text-center mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Login Button */}
          <motion.button
            type="submit"
            className="w-full py-3 rounded-full bg-white text-blue-700 font-bold text-lg shadow-lg hover:bg-blue-100 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.03, boxShadow: '0 4px 24px rgba(59,130,246,0.15)' }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-6 w-6 mr-2 text-blue-700" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : null}
            Login
          </motion.button>
          {/* Register link */}
          <div className="text-center text-white/90 mt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold underline hover:text-blue-200">Register</Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
} 