'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './MySlider.css';
import API from '@/utils/api';

type Banner = { id: number; image: string };

const PromoSlider = () => {
  const [promoBanners, setPromoBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await API.get('/homepage');
        console.log('PromoSlider API response:', res.data);

        const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || '';
        const banners: Banner[] = [
          res.data.box_img_1,
          res.data.box_img_2,
          res.data.box_img_3,
          res.data.box_img_4,
          res.data.box_img_5,
          res.data.box_img_6,
        ]
          .filter(Boolean) // remove any missing images
          .map((img: string, idx: number) => ({
            id: idx + 1,
            image: `${baseUrl}${img}`,
          }));

        setPromoBanners(banners);
      } catch (error) {
        console.error('Failed to fetch promo banners:', error);
      }
    };

    fetchBanners();
  }, []);

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
