import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import images
import img1 from '../assets/carousel/carousel1.jpg';
import img2 from '../assets/carousel/carousel2.jpg';
import img3 from '../assets/carousel/carousel3.jpg';
import img4 from '../assets/carousel/carousel4.jpg';
import img5 from '../assets/carousel/carousel5.jpg';

const Carousel = () => {
  const images = [img1, img2, img3, img4, img5];

  return (
    <div className="w-full bg-white rounded-lg shadow-xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`carousel-slide-${index}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
