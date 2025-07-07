import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Settings from './pages/Settings';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import { initAuth, isAuthenticated } from './utils/auth';
import GetStarted from './pages/GetStarted';

function AppRoutes() {
  const location = useLocation();
  // Redirect / to /home or /login based on auth
  if (location.pathname === '/') {
    return isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 p-4 md:p-8">
                  <Dashboard />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 p-4 md:p-8">
                  <Products />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 p-4 md:p-8">
                  <Customers />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 p-4 md:p-8">
                  <Settings />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/get-started"
        element={
          <ProtectedRoute>
            <GetStarted />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
