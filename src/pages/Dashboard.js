import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

// Dummy data
const stats = [
  { label: 'Total Revenue', value: 15480, growth: 8.2, color: 'blue' },
  { label: 'Customers', value: 1486, growth: 2.5, color: 'green' },
  { label: 'Active Users', value: 435, growth: 1.1, color: 'pink' },
];

const barData = [
  { name: 'Jan', sales: 4532 },
  { name: 'Feb', sales: 3458 },
  { name: 'Mar', sales: 5123 },
  { name: 'Apr', sales: 4456 },
  { name: 'May', sales: 5845 },
  { name: 'Jun', sales: 4145 },
];

const lineData = [
  { name: 'Mon', users: 215 },
  { name: 'Tue', users: 245 },
  { name: 'Wed', users: 158 },
  { name: 'Thu', users: 189 },
  { name: 'Fri', users: 355 },
  { name: 'Sat', users: 254 },
  { name: 'Sun', users: 345 },
];

const pieData = [
  { name: 'Logo Mouse Pads', value: 400 },
  { name: 'Personalized Pens', value: 300 },
  { name: 'Instant Noodles', value: 300 },
  { name: 'Barcode Scanners', value: 200 },
];
const pieColors = ['#3b82f6', '#10b981', '#f472b6', '#f59e42'];

const topProducts = [
  { name: 'Logo Mouse Pads', sales: 320, color: 'from-blue-200 to-blue-400' },
  { name: 'Personalized Pens', sales: 280, color: 'from-green-200 to-green-400' },
  { name: 'Instant Noodles', sales: 210, color: 'from-pink-200 to-pink-400' },
  { name: 'Barcode Scanners', sales: 180, color: 'from-yellow-200 to-yellow-400' },
];

const transactions = [
  { date: '2024-07-07', customer: 'John Doe', product: 'Product A', amount: 123.45 },
  { date: '2024-07-06', customer: 'Jane Smith', product: 'Product B', amount: 99.99 },
  { date: '2024-07-05', customer: 'Alice Brown', product: 'Product C', amount: 75.50 },
  { date: '2024-07-04', customer: 'Bob Lee', product: 'Product D', amount: 150.00 },
];

export default function Dashboard() {
  return (
    <div className="space-y-12 relative">
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
      {/* Stats Cards */}
      <SectionHeader title="Dashboard Overview" />
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        {stats.map((stat, i) => (
          <Card key={stat.label} className="flex flex-col items-center">
            <div className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.label === 'Total Revenue' ? `$${stat.value.toLocaleString()}` : stat.value.toLocaleString()}</div>
            <div className="text-gray-500 dark:text-gray-300 mb-2">{stat.label}</div>
            <motion.div
              className={`flex items-center text-sm font-semibold text-${stat.color}-600 dark:text-${stat.color}-400`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <span className="mr-1">▲</span>
              {stat.growth}%
              <span className="ml-1 text-gray-400">growth</span>
            </motion.div>
          </Card>
        ))}
      </motion.div>

      {/* Charts */}
      <SectionHeader title="Sales & Users" />
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="h-64 flex flex-col">
          <div className="font-semibold mb-2">Monthly Sales</div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="h-64 flex flex-col">
          <div className="font-semibold mb-2">Active Users</div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="h-64 flex flex-col">
          <div className="font-semibold mb-2">Product Share</div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {pieData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={pieColors[i % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Top Products Grid */}
      <SectionHeader title="Top Selling Products" />
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        {topProducts.map((p) => (
          <Card key={p.name} className="flex flex-col items-center">
            <div className={`w-16 h-16 bg-gradient-to-br ${p.color} rounded-full mb-2`} />
            <div className="font-medium text-gray-800 dark:text-gray-100">{p.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300">{p.sales} sales</div>
          </Card>
        ))}
      </motion.div>

      {/* Recent Transactions Table */}
      <SectionHeader title="Recent Transactions" />
      <motion.div className="overflow-x-auto" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Customer</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Product</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-b dark:border-gray-700">
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{t.date}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{t.customer}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{t.product}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">${t.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
} 