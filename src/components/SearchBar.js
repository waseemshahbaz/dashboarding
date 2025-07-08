import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <motion.div
      className="relative w-full max-w-xs"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <FiSearch className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-10 pr-3 py-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100"
        placeholder={placeholder}
      />
    </motion.div>
  );
} 