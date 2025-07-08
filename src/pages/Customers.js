import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableRow from '../components/TableRow';
import SectionHeader from '../components/SectionHeader';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import CustomerForm from '../components/CustomerForm';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  seedCustomers
} from '../utils/customerStorage';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Load customers from localStorage
  useEffect(() => {
    seedCustomers();
    setCustomers(getCustomers());
  }, []);

  // Live update on localStorage change (other tabs)
  useEffect(() => {
    const handler = () => setCustomers(getCustomers());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Reset to first page on search
  useEffect(() => { setCurrentPage(1); }, [search]);

  // Add or update customer
  const handleFormSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      if (editCustomer) {
        updateCustomer(editCustomer.id, data);
        toast.success('Customer updated!');
      } else {
        addCustomer(data);
        toast.success('Customer added!');
      }
      setCustomers(getCustomers());
      setModalOpen(false);
      setEditCustomer(null);
      setLoading(false);
    }, 400);
  };

  // Open edit modal
  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setModalOpen(true);
  };

  // Open delete confirmation
  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    deleteCustomer(deleteId);
    setCustomers(getCustomers());
    toast.error('Customer deleted!');
    setConfirmOpen(false);
    setDeleteId(null);
  };

  // Filtered customers
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate filtered customers
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Animation variants
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar theme="colored" />
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search customers..." />
        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { setModalOpen(true); setEditCustomer(null); }}
        >
          <FiPlus />
          Add Customer
        </motion.button>
      </div>
      <motion.div
        className="relative overflow-x-auto overflow-x-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ minHeight: '520px' }}
      >
        <motion.table
          className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Phone</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Company</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <AnimatePresence mode="wait">
            <motion.tbody
              key={currentPage}
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ overflowY: 'hidden', display: 'table-row-group' }}
            >
              {paginated.length === 0 && (
                <motion.tr
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={6} className="text-center py-8 text-gray-400">No customers found.</td>
                </motion.tr>
              )}
              {paginated.map((c, i) => (
                <motion.tr
                  key={c.id}
                  variants={rowVariants}
                  exit="exit"
                  className="group transition-transform duration-200 hover:scale-[1.005] hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-900"
                  style={{ transition: 'box-shadow 0.2s, transform 0.2s' }}
                >
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200 font-medium">{c.name}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{c.email}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{c.phone}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{c.company}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      c.status === 'Active' ? 'bg-green-100 text-green-700' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <motion.button
                      className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-300"
                      whileHover={{ scale: 1.2, rotate: 10, boxShadow: '0 0 8px #3b82f6' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(c)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </motion.button>
                    <motion.button
                      className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-500"
                      whileHover={{ scale: 1.2, rotate: -10, boxShadow: '0 0 8px #ef4444' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(c.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </AnimatePresence>
        </motion.table>
      </motion.div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditCustomer(null); }}
        title={editCustomer ? 'Edit Customer' : 'Add Customer'}
      >
        <CustomerForm
          initialValues={editCustomer}
          onSubmit={handleFormSubmit}
          onCancel={() => { setModalOpen(false); setEditCustomer(null); }}
          loading={loading}
          mode={editCustomer ? 'edit' : 'add'}
        />
      </Modal>
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
        message="Are you sure you want to delete this customer? This action cannot be undone."
      />
    </div>
  );
} 