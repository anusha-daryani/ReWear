import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clothing from '../assets/images/clothing.jpg';

const Hero = () => {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 bg-gradient-to-r from-[#f0f4f8] to-[#d9e4f5] text-[#22333B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className=" p-6 md:p-10 rounded-xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Swap Clothes. <span className="text-[#FFC857]">Refresh Your Style.</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-[#333]">
            Join ReWear — your eco-friendly fashion community. Give unused clothes a second life and earn rewards.
          </p>

          <ul className="list-disc list-inside mb-6 text-[#444] text-sm md:text-base space-y-2">
            <li>Earn points for listing unused clothes</li>
            <li>Swap directly or redeem via points</li>
            <li>Support sustainable fashion choices</li>
          </ul>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              to="/signup"
              className="bg-[#22333B] text-white px-6 py-3 rounded-full shadow hover:bg-[#1a252b] transition"
            >
              Start Swapping
            </Link>
            <Link
              to="/browse"
              className="bg-transparent border border-[#22333B] text-[#22333B] px-6 py-3 rounded-full hover:bg-[#22333B] hover:text-white transition"
            >
              Browse Items
            </Link>
          </div>
        </motion.div>

        {/* Right Image with glow */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#4A90E2] to-[#FFC857] opacity-30 rounded-xl blur-xl z-0" />
          <img
            src={clothing}
            alt="Clothing swap"
            className="relative z-10 w-full h-auto rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
