import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Fashion Blogger',
    comment:
      'Absolutely love the variety and quality. The jeans section is my favorite — durable and trendy!',
  },
  {
    name: 'Neha Kapoor',
    role: 'College Student',
    comment:
      'The t-shirts are so comfy and stylish. Delivery was super fast too!',
  },
  {
    name: 'Raj Mehta',
    role: 'Working Professional',
    comment:
      'Great price, premium quality. I’ve recommended this platform to my friends as well.',
  },
];

const Testimonials = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#e0f7ff] via-white to-[#f9f9f9] py-16 px-4 md:px-20 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#22333B] mb-12">
        What Our Customers Say
      </h2>
      <div className="grid md:grid-cols-3 gap-8 z-10 relative">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <FaQuoteLeft className="text-[#004479] text-3xl mb-3" />
            <p className="text-gray-800 font-light leading-relaxed mb-4">
              "{testimonial.comment}"
            </p>
            <div>
              <p className="font-semibold text-lg text-[#22333B]">
                {testimonial.name}
              </p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating effect - optional */}
      <div className="absolute -top-20 right-0 w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-16 left-0 w-36 h-36 bg-yellow-100 rounded-full blur-2xl opacity-40 animate-pulse"></div>
    </section>
  );
};

export default Testimonials;
