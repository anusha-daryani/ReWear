import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#e0f7ff] via-white to-[#f9f9f9] text-gray-900 pt-20 pb-10 px-4 overflow-hidden">      
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4 text-[#22333B]">
            Re<span className="text-orange-500">Wear</span>
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Your trusted sustainable clothing exchange platform for a cleaner, greener tomorrow.
          </p>
          <div className="flex space-x-4 mt-4">
            <FaFacebookF className="text-gray-500 hover:text-orange-500 transition text-lg cursor-pointer" />
            <FaInstagram className="text-gray-500 hover:text-orange-500 transition text-lg cursor-pointer" />
            <FaTwitter className="text-gray-500 hover:text-orange-500 transition text-lg cursor-pointer" />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            {['Jeans', 'Shirts', 'T-Shirts', 'Jackets', 'Footwear'].map((cat, i) => (
              <li key={i} className="hover:text-orange-500 transition-colors duration-300 cursor-pointer">
                {cat}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Useful Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            {['About Us', 'Contact', 'Returns', 'Order Tracking', 'Privacy Policy'].map((link, i) => (
              <li key={i} className="hover:text-orange-500 transition-colors duration-300 cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Subscribe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
          <p className="text-sm text-gray-700 mb-3">Stay updated with the latest swaps & styles</p>
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 rounded w-full text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 transition-all rounded text-white font-medium">
            Subscribe
          </button>
        </motion.div>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500 z-10 relative">
        © 2025 ReWear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
