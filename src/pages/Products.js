import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import ProductForm from '../components/ProductForm';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  seedProducts
} from '../utils/productStorage';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Load products from localStorage
  useEffect(() => {
    seedProducts();
    setProducts(getProducts());
  }, []);

  // Live update on localStorage change (other tabs)
  useEffect(() => {
    const handler = () => setProducts(getProducts());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Reset to first page on search
  useEffect(() => { setCurrentPage(1); }, [search]);

  // Add or update product
  const handleFormSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      if (editProduct) {
        updateProduct(editProduct.id, data);
        toast.success('Product updated!');
      } else {
        addProduct(data);
        toast.success('Product added!');
      }
      setProducts(getProducts());
      setModalOpen(false);
      setEditProduct(null);
      setLoading(false);
    }, 400);
  };

  // Open edit modal
  const handleEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  // Open delete confirmation
  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    deleteProduct(deleteId);
    setProducts(getProducts());
    toast.error('Product deleted!');
    setConfirmOpen(false);
    setDeleteId(null);
  };

  // Filtered products
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate filtered products
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Animation variants
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.1,
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.2 } },
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
      <SectionHeader title="Products" subtitle="Manage your product catalog" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { setModalOpen(true); setEditProduct(null); }}
        >
          <FiPlus />
          Add Product
        </motion.button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-x-hidden"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ overflowY: 'hidden', minHeight: '520px' }}
        >
          {paginated.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center py-8 text-gray-400"
            >No products found.</motion.div>
          )}
          {paginated.map((p) => (
            <motion.div
              key={p.id}
              variants={cardVariants}
              exit="exit"
            >
              <Card
                className="flex flex-col items-center group transition-transform duration-200 hover:scale-[1.005] hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-900"
                style={{ transition: 'box-shadow 0.2s, transform 0.2s' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full mb-3 flex items-center justify-center text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {p.name[0]}
                </div>
                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{p.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">{p.category}</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">${p.price.toFixed(2)}</div>
                <div className="mb-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                    {p.status}
                  </span>
                </div>
                <div className="mb-2 text-xs text-gray-500 dark:text-gray-300">Stock: {p.stock}</div>
                <div className="flex gap-2 mt-2">
                  <motion.button
                    className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-300"
                    whileHover={{ scale: 1.2, rotate: 10, boxShadow: '0 0 8px #3b82f6' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(p)}
                    title="Edit"
                  >
                    <FiEdit2 />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-500"
                    whileHover={{ scale: 1.2, rotate: -10, boxShadow: '0 0 8px #ef4444' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(p.id)}
                    title="Delete"
                  >
                    <FiTrash2 />
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditProduct(null); }}
        title={editProduct ? 'Edit Product' : 'Add Product'}
      >
        <ProductForm
          initialValues={editProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => { setModalOpen(false); setEditProduct(null); }}
          loading={loading}
          mode={editProduct ? 'edit' : 'add'}
        />
      </Modal>
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
} 