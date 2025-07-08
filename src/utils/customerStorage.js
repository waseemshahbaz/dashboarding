// Customer fields: name, email, phone, company, status (Active/Inactive), id

const CUSTOMER_KEY = 'customers';

export function getCustomers() {
  const data = localStorage.getItem(CUSTOMER_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCustomers(customers) {
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customers));
}

export function addCustomer(customer) {
  const customers = getCustomers();
  const newCustomer = { ...customer, id: Date.now().toString() };
  customers.push(newCustomer);
  saveCustomers(customers);
  return newCustomer;
}

export function updateCustomer(id, updated) {
  const customers = getCustomers().map(c => c.id === id ? { ...c, ...updated } : c);
  saveCustomers(customers);
}

export function deleteCustomer(id) {
  const customers = getCustomers().filter(c => c.id !== id);
  saveCustomers(customers);
}

export function getCustomerById(id) {
  return getCustomers().find(c => c.id === id);
}

// Validation helper
export function validateCustomer(customer) {
  const errors = {};
  if (!customer.name) errors.name = 'Name is required';
  if (!customer.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer.email)) errors.email = 'Valid email required';
  if (!customer.phone || !/^\+?\d{7,15}$/.test(customer.phone)) errors.phone = 'Valid phone required';
  if (!customer.company) errors.company = 'Company is required';
  if (!['Active','Inactive'].includes(customer.status)) errors.status = 'Status required';
  return errors;
}

export function seedCustomers() {
  if (getCustomers().length > 0) return;
  const names = [
    'Alice Johnson', 'Bob Smith', 'Charlie Lee', 'Diana Prince', 'Ethan Clark', 'Fiona Adams', 'George Brown', 'Hannah Davis',
    'Ian Miller', 'Julia Wilson', 'Kevin Moore', 'Laura Taylor', 'Mike Anderson', 'Nina Thomas', 'Oscar Harris', 'Paula Martin',
    'Quentin Lewis', 'Rachel Young', 'Sam Walker', 'Tina Hall', 'Uma King', 'Victor Allen', 'Wendy Scott', 'Xander Evans',
    'Yara Turner', 'Zane Baker', 'Amber Reed', 'Brian Cox', 'Cathy Ward', 'Derek Gray', 'Eva Price', 'Frank Bell',
    'Grace Wood', 'Henry Stone', 'Isabel Fox', 'Jack Knight', 'Kara Lane', 'Liam Hunt', 'Mona Page', 'Noah Ray'
  ];
  const companies = ['Globex', 'Initech', 'Umbrella', 'Wayne Enterprises', 'Stark Industries', 'Wonka Inc', 'Acme Corp', 'Hooli', 'Massive Dynamic', 'Cyberdyne'];
  const customers = Array.from({ length: 40 }).map((_, i) => ({
    id: Date.now().toString() + i,
    name: names[i % names.length],
    email: names[i % names.length].toLowerCase().replace(/ /g, '.') + '@example.com',
    phone: '+1' + (Math.floor(1000000000 + Math.random() * 9000000000)),
    company: companies[Math.floor(Math.random() * companies.length)],
    status: Math.random() > 0.2 ? 'Active' : 'Inactive',
  }));
  saveCustomers(customers);
} 