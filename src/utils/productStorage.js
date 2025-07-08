// Product fields: name, category, price, stock, status (Available/Out of Stock), id

const PRODUCT_KEY = 'products';

export function getProducts() {
  const data = localStorage.getItem(PRODUCT_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProducts(products) {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
}

export function addProduct(product) {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now().toString() };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id, updated) {
  const products = getProducts().map(p => p.id === id ? { ...p, ...updated } : p);
  saveProducts(products);
}

export function deleteProduct(id) {
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
}

export function getProductById(id) {
  return getProducts().find(p => p.id === id);
}

// Validation helper
export function validateProduct(product) {
  const errors = {};
  if (!product.name) errors.name = 'Product name is required';
  if (!product.category) errors.category = 'Category is required';
  if (product.price === undefined || isNaN(Number(product.price)) || Number(product.price) < 0) errors.price = 'Valid price required';
  if (product.stock === undefined || isNaN(Number(product.stock)) || Number(product.stock) < 0) errors.stock = 'Valid stock required';
  if (!['Available','Out of Stock'].includes(product.status)) errors.status = 'Status required';
  return errors;
}

export function seedProducts() {
  if (getProducts().length > 0) return;
  const productNames = [
    'Laptop', 'Smartphone', 'Tablet', 'Monitor', 'Keyboard', 'Mouse', 'Printer', 'Camera', 'Speaker', 'Headphones',
    'Router', 'Smartwatch', 'TV', 'Projector', 'Microphone', 'Webcam', 'SSD', 'HDD', 'RAM', 'GPU',
    'CPU', 'Motherboard', 'Power Supply', 'Case', 'Fan', 'Charger', 'Cable', 'Adapter', 'Dock', 'Switch',
    'Light', 'Thermostat', 'Sensor', 'Drone', 'VR Headset', 'Gamepad', 'E-reader', 'Fitness Tracker', 'Smart Plug', 'Alarm'
  ];
  const categories = ['Electronics', 'Computers', 'Accessories', 'Audio', 'Networking', 'Smart Home', 'Gaming'];
  const products = Array.from({ length: 40 }).map((_, i) => ({
    id: Date.now().toString() + i,
    name: productNames[i % productNames.length] + ' ' + (i + 1),
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Number((20 + Math.random() * 480).toFixed(2)),
    stock: Math.floor(Math.random() * 200),
    status: Math.random() > 0.15 ? 'Available' : 'Out of Stock',
  }));
  saveProducts(products);
} 