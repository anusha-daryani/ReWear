import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const suggestions = ['Jeans', 'Shirts', 'T-Shirts', 'Watches', 'Bags', 'Shoes', 'Jackets', 'Hoodies'];

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 0) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (value) => {
    setInput(value);
    setShowSuggestions(false);
  };

  return (
    <motion.div
      className="w-full flex justify-center py-10 px-4 bg-transparent relative z-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full max-w-3xl">
        <div className="flex items-center backdrop-blur-md bg-white/30 border border-white/20 rounded-full shadow-lg overflow-hidden">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Search for products, brands and more..."
            className="flex-1 px-5 py-3 text-black placeholder-black/80 text-sm bg-transparent focus:outline-none"
          />
          <button className="bg-[#22333B] hover:bg-[#1c2a30] text-white px-6 py-3 rounded-l-none rounded-r-full transition-all">
            <FaSearch />
          </button>
        </div>

        <AnimatePresence>
          {showSuggestions && (
            <motion.ul
              className="absolute w-full mt-2 bg-white text-sm rounded-xl shadow-lg overflow-hidden z-20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(suggestion)}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    {suggestion}
                  </li>
                ))
              ) : (
                <li className="px-5 py-3 text-gray-400">No results found</li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchBar;
