import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Swap from './pages/Swap';
import Browse from './pages/Browse';
import List from './pages/List'; // Assuming this is a page, not lucide-react icon
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();

  return (
    <>
      <AuthProvider>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/list" element={<List />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AnimatePresence>
        <ToastContainer position="top-center" autoClose={3000} />
      </AuthProvider>
    </>
  );
};

export default App;
