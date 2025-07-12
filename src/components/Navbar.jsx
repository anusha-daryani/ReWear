import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = 'hover:text-[#22333B] transition-all';
  const activeLink = 'text-[#22333B] font-semibold';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out 
    ${scrolling ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'}
  `}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-[#22333B]">
          Re<span className="text-orange-500">Wear</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
          <Link to="/swap" className={`${linkClass} ${location.pathname === '/swap' ? activeLink : ''}`}>
            Start Swapping
          </Link>
          <Link to="/browse" className={`${linkClass} ${location.pathname === '/browse' ? activeLink : ''}`}>
            Browse Items
          </Link>
          <Link to="/list" className={`${linkClass} ${location.pathname === '/list' ? activeLink : ''}`}>
            List an Item
          </Link>
          <Link to="/dashboard" className={`${linkClass} ${location.pathname === '/dashboard' ? activeLink : ''}`}>
            Dashboard
          </Link>
          <Link
            to="/login"
            className="border border-[#22333B] text-[#22333B] px-4 py-2 rounded-full hover:bg-[#22333B] hover:text-white transition"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-[#22333B]">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white/95 backdrop-blur-sm shadow-sm">
          <Link to="/swap" onClick={() => setOpen(false)} className={linkClass}>
            Start Swapping
          </Link>
          <Link to="/browse" onClick={() => setOpen(false)} className={linkClass}>
            Browse Items
          </Link>
          <Link to="/list" onClick={() => setOpen(false)} className={linkClass}>
            List an Item
          </Link>
          <Link to="/dashboard" onClick={() => setOpen(false)} className={linkClass}>
            Dashboard
          </Link>
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block text-center border border-[#22333B] text-[#22333B] py-2 rounded-full hover:bg-[#22333B] hover:text-white"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
