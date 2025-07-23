"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import API from '@/utils/api';
import axios from "axios";


// prop type
type IProps = {
  cls?: string;
  perView?: number;
  showCount?: boolean;
};

// API response type
interface Category {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  image: string;
  total_products: string;
}


const CategoryArea = ({cls,perView=8,showCount=true}:IProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/subcategories"); 
        console.log("API response:", res.data);
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);
  
  // slider setting
  const slider_setting = {
    slidesPerView: perView,
    spaceBetween: 20,
    autoplay: {
      delay: 3500,
      disableOnInteraction: true,
    },
    breakpoints: {
      "1400": {
        slidesPerView: perView,
      },
      "1200": {
        slidesPerView: 6,
      },
      "992": {
        slidesPerView: 5,
      },
      "768": {
        slidesPerView: 4,
      },
      "576": {
        slidesPerView: 3,
      },
      "0": {
        slidesPerView: 2,
      },
    },
  };

  // handle search 
  const handleCategorySearch = (title:string) => {
    router.push(`/search?category=${title.split(" ").join("-").toLowerCase()}`);
  }
  return (
    <>
      <Swiper {...slider_setting} className={`swiper-container ${cls}`}>
        {categories.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="category__item mb-30">
              <div className="category__thumb fix mb-15">
                <a onClick={() => handleCategorySearch(item.name)} className="pointer">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image}`}
                      width={80}
                      height={80}
                      alt={item.name}
                    />
                </a>
              </div>
              <div className="category__content">
                <h5 className="category__title">
                  <Link href="/shop">{item.name}</Link>
                </h5>
                {showCount && (
                <span className="category__count">
                  {parseInt(item.total_products) < 10
                    ? `0${item.total_products}`
                    : item.total_products}{" "}
                  items
                </span>
              )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CategoryArea;


