import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import ProductListing from '../components/ProductListing';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-[#f0f4f8] to-[#e6ebf2] text-gray-800">
      <main className="flex-grow space-y-12">
        <Hero />
        <SearchBar />
        <Carousel/>
        <CategorySection />
        <ProductListing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
