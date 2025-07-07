import React from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

// Generate 8 dummy products
const products = Array.from({ length: 8 }).map(() => ({
  name: faker.commerce.productName(),
  category: faker.commerce.department(),
  price: faker.commerce.price({ min: 20, max: 500, dec: 2, symbol: '$' }),
  available: faker.datatype.boolean(),
  rating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
}));

export default function Products() {
  return (
    <div className="relative">
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
      <SectionHeader title="Products" subtitle="Manage your product catalog" />
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((p, i) => (
          <Card key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full mb-3 flex items-center justify-center text-2xl font-bold text-blue-700 dark:text-blue-300">
              {p.name[0]}
            </div>
            <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{p.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">{p.category}</div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">{p.price}</div>
            <div className="mb-1">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.available ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                {p.available ? 'Available' : 'Out of Stock'}
              </span>
            </div>
            <div className="flex items-center">
              {[...Array(Math.floor(p.rating))].map((_, idx) => (
                <span key={idx} className="text-yellow-400 text-lg">★</span>
              ))}
              {[...Array(5 - Math.floor(p.rating))].map((_, idx) => (
                <span key={idx} className="text-gray-300 text-lg">★</span>
              ))}
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">{p.rating.toFixed(1)}</span>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
} 