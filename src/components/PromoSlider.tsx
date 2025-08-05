'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './MySlider.css'; 

const promoBanners = [
  { id: 1, image: '/assets/img/banner/1.jpg' },
  { id: 2, image: '/assets/img/banner/2.jpg' },
  { id: 3, image: '/assets/img/banner/3.jpg' },
  { id: 4, image: '/assets/img/banner/4.jpg' },
  { id: 5, image: '/assets/img/banner/5.jpg' },
  { id: 6, image: '/assets/img/banner/6.jpg' },
];

const PromoSlider = () => {
  return (
    <div className="w-full py-8 bg-white relative mt-10">
      <div className="container-fluid mx-auto px-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation, Autoplay]}
        >
          {promoBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src={banner.image}
                  alt={`Promo ${banner.id}`}
                  width={400}
                  height={100}
                  className="w-full h-auto object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="slider-nav-buttons">
          <div className="custom-prev">&#10094;</div>
          <div className="custom-next">&#10095;</div>
        </div>
      </div>
    </div>
  );
};

export default PromoSlider;
