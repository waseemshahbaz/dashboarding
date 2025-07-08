import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBox, FiTag, FiDollarSign, FiLayers, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import { validateProduct } from '../utils/productStorage';

const statusOptions = [
  { value: 'Available', label: 'Available' },
  { value: 'Out of Stock', label: 'Out of Stock' },
];

export default function ProductForm({ initialValues = {}, onSubmit, onCancel, loading, mode = 'add' }) {
  const [values, setValues] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Available',
    ...initialValues,
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validateProduct(values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit({ ...values, price: Number(values.price), stock: Number(values.stock) });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Product Name</label>
        <div className="relative">
          <FiBox className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className={`pl-10 pr-3 py-2 w-full rounded border ${errors.name ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100`}
            placeholder="Product Name"
            autoFocus
          />
        </div>
        {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Category</label>
        <div className="relative">
          <FiTag className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="category"
            value={values.category}
            onChange={handleChange}
            className={`pl-10 pr-3 py-2 w-full rounded border ${errors.category ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100`}
            placeholder="Category"
          />
        </div>
        {errors.category && <div className="text-xs text-red-500 mt-1">{errors.category}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Price</label>
        <div className="relative">
          <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
          <input
            type="number"
            name="price"
            value={values.price}
            onChange={handleChange}
            className={`pl-10 pr-3 py-2 w-full rounded border ${errors.price ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100`}
            placeholder="Price"
            min="0"
            step="0.01"
          />
        </div>
        {errors.price && <div className="text-xs text-red-500 mt-1">{errors.price}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Stock Quantity</label>
        <div className="relative">
          <FiLayers className="absolute left-3 top-3 text-gray-400" />
          <input
            type="number"
            name="stock"
            value={values.stock}
            onChange={handleChange}
            className={`pl-10 pr-3 py-2 w-full rounded border ${errors.stock ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100`}
            placeholder="Stock Quantity"
            min="0"
            step="1"
          />
        </div>
        {errors.stock && <div className="text-xs text-red-500 mt-1">{errors.stock}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Status</label>
        <div className="relative">
          <select
            name="status"
            value={values.status}
            onChange={handleChange}
            className={`pl-3 pr-8 py-2 w-full rounded border ${errors.status ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100`}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <span className="absolute right-3 top-3 text-gray-400 pointer-events-none">
            {values.status === 'Available' ? <FiCheckCircle /> : <FiXCircle />}
          </span>
        </div>
        {errors.status && <div className="text-xs text-red-500 mt-1">{errors.status}</div>}
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 flex items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <motion.span
              className="inline-block"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            >
              <FiLoader className="animate-spin" />
            </motion.span>
          ) : (
            mode === 'edit' ? 'Update' : 'Add'
          )}
        </button>
      </div>
    </motion.form>
  );
} 