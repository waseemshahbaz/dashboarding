const USERS_KEY = 'users';
const AUTH_KEY = 'isAuthenticated';

// Default user
const defaultUser = { username: 'waseem', password: '12345' };

export function initAuth() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([defaultUser]));
  }
}

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

export function addUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function login(username, password) {
  const users = getUsers();
  const found = users.find(u => u.username === username && u.password === password);
  if (found) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logout() {
  localStorage.setItem(AUTH_KEY, 'false');
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'true';
} 