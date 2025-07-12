import React from 'react';
import { useNavigate } from 'react-router-dom';
import { productsData } from '../data/productsData';

const Browse= () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-[#f6f8ff] to-white">
      <div className="text-left mb-10">
        <h1 className="font-playfair text-4xl md:text-[40px] text-[#22333B]">Browse Products</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2 max-w-2xl">
          Discover premium clothing items that fit your style. High quality, stylish and ready to ship.
        </p>
      </div>

      {productsData.map((product) => (
        <div
          key={product._id}
          className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:border-0 hover:shadow-xl transition-all rounded-xl bg-white/70 backdrop-blur-sm hover:scale-[1.01]"
        >
          <img
            src={product.image}
            alt={product.name}
            title="View Product"
            onClick={() => navigate(`/products/${product._id}`)}
            className="max-h-64 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
          />
          <div className="md:w-1/2 flex flex-col gap-2">
            <p className="text-gray-500">{product.category}</p>
            <h2
              className="text-gray-800 text-3xl font-playfair cursor-pointer"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm">{product.description}</p>

            <div className="flex flex-wrap items-center mt-3 mb-6 gap-3">
              {product.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#F5F5FF]/70 text-xs rounded-full border border-gray-300"
                >
                  {feature}
                </span>
              ))}
            </div>

            <p className="text-xl font-semibold text-gray-700">₹{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Browse;
