import React from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from '../data/productsData'; // Assume your products are stored in this file

const AllProductsPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-[#f6f8ff] to-white min-h-screen pt-28 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="mb-10">
        <h1 className="text-4xl md:text-[40px] font-playfair text-[#22333B]">All Products</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2 max-w-3xl">
          Discover a wide range of quality fashion items handpicked just for you. Click any item to see more details.
        </p>
      </div>

      {productsData.map((product) => (
        <div
          key={product._id}
          className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:border-0 hover:shadow-xl transition-all rounded-xl bg-white/70 backdrop-blur-sm hover:scale-[1.01]"
        >
          <img
            onClick={() => {
              navigate(`/products/${product._id}`);
              scrollTo(0, 0);
            }}
            src={product.image}
            alt={product.name}
            title="View Product Details"
            className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
          />
          <div className="md:w-1/2 flex flex-col gap-2">
            <p className="text-gray-500">{product.category}</p>
            <p
              onClick={() => {
                navigate(`/products/${product._id}`);
                scrollTo(0, 0);
              }}
              className="text-gray-800 text-3xl font-playfair cursor-pointer"
            >
              {product.name}
            </p>
            <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
              <span>{product.description}</span>
            </div>

            {/* Tags / Features */}
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-3">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-[#F5F5FF]/70 rounded-lg text-xs text-gray-700"
                >
                  {feature}
                </div>
              ))}
            </div>

            <p className="text-xl font-medium text-gray-700">₹{product.price}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AllProductsPage;
