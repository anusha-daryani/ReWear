import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Swap = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !type || !size || !price) {
      toast.error('Please fill in all fields!');
      return;
    }

    toast.success('50 points credited to your account!');
    
    // Reset form
    setImage(null);
    setType('');
    setSize('');
    setPrice('');
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-20 bg-gradient-to-br from-white to-[#f0f5ff]">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-3xl mx-auto backdrop-blur-lg bg-opacity-80">
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#22333B]">Add Clothing Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-4 h-48 w-full object-cover rounded-md shadow-md"
              />
            )}
          </div>

          {/* Clothing Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Clothing Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Type</option>
              <option value="Shirt">Shirt</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Jeans">Jeans</option>
              <option value="Jacket">Jacket</option>
              <option value="Kurti">Kurti</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter price for reference"
              min="0"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#22333B] text-white py-3 rounded-md hover:bg-[#1a2730] transition"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Swap;
