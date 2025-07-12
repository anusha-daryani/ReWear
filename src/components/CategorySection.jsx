import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import local images
import jeansImg from '../assets/images/categories/jeans.jpg';
import tshirtsImg from '../assets/images/categories/tshirts.jpg';
import shirtsImg from '../assets/images/categories/shirts.jpg';
import jacketsImg from '../assets/images/categories/jackets.jpg';
import shoesImg from '../assets/images/categories/shoes.jpg';
import hoodiesImg from '../assets/images/categories/hoodie.jpg';
import watchesImg from '../assets/images/categories/watches.jpg';
import bagsImg from '../assets/images/categories/bags.jpg';

const categories = [
  { title: 'Jeans', image: jeansImg },
  { title: 'T-Shirts', image: tshirtsImg },
  { title: 'Shirts', image: shirtsImg },
  { title: 'Jackets', image: jacketsImg },
  { title: 'Shoes', image: shoesImg },
  { title: 'Hoodies', image: hoodiesImg },
  { title: 'Watches', image: watchesImg },
  { title: 'Bags', image: bagsImg },
];

const CategorySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="px-6 py-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Explore by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`bg-white/30 backdrop-blur-md shadow-lg rounded-xl overflow-hidden transition-all duration-200 transform ${
              hoveredIndex === index
                ? 'scale-105 z-20'
                : hoveredIndex !== null
                ? 'blur-[1px] scale-95 opacity-75'
                : ''
            }`}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 text-center text-lg font-semibold text-gray-800">
              {cat.title}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
