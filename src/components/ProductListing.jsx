import React, { useState } from "react";
import jeansImg from "../assets/products/jeans.jpg";
import shirtImg from "../assets/products/shirt.jpg";
import tshirtImg from "../assets/products/tshirt.jpg";
import jacketImg from "../assets/products/jacket.jpg";
import sneakersImg from "../assets/products/sneakers.jpg";

const ProductListing = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const products = [
    {
      name: "Classic Blue Jeans",
      price: "₹1,499",
      image: jeansImg,
    },
    {
      name: "Casual Cotton Shirt",
      price: "₹999",
      image: shirtImg,
    },
    {
      name: "Graphic T-Shirt",
      price: "₹799",
      image: tshirtImg,
    },
    {
      name: "Denim Jacket",
      price: "₹1,999",
      image: jacketImg,
    },
    {
      name: "Stylish Sneakers",
      price: "₹2,499",
      image: sneakersImg,
    },
  ];

  return (
    <section className="px-4 md:px-12 lg:px-24 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 transform ${
              hoveredIndex === index
                ? "scale-105 z-20"
                : hoveredIndex !== null
                ? "blur-[1px] scale-90 opacity-98"
                : "hover:shadow-2xl"
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-indigo-600 font-semibold mt-2">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductListing;
