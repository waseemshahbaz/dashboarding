import React from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import TableRow from '../components/TableRow';
import SectionHeader from '../components/SectionHeader';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

// Generate 10 dummy customers
const customers = Array.from({ length: 10 }).map(() => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  company: faker.company.name(),
  status: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending']),
  lastOrder: faker.date.recent({ days: 30 }).toLocaleDateString(),
}));

export default function Customers() {
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
      <SectionHeader title="Customers" subtitle="Manage your customer base" />
      <motion.div
        className="overflow-x-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Company</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Last Order</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <TableRow key={i}>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200 font-medium">{c.name}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{c.email}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{c.company}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    c.status === 'Active' ? 'bg-green-100 text-green-700' :
                    c.status === 'Inactive' ? 'bg-gray-200 text-gray-600' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{c.lastOrder}</td>
              </TableRow>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
} 