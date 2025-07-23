'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductSingle from '../product-single/product-single';
import API from '@/utils/api';
import { IProductData } from '@/types/product-d-t';

const slider_setting = {
  slidesPerView: 6,
  spaceBetween: 20,
  observer: true,
  observeParents: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: true,
  },
  breakpoints: {
    '1200': { slidesPerView: 6 },
    '992': { slidesPerView: 4 },
    '768': { slidesPerView: 3 },
    '576': { slidesPerView: 1 },
    '0': { slidesPerView: 1 },
  },
  navigation: {
    nextEl: '.tpproduct-btn__nxt',
    prevEl: '.tpproduct-btn__prv',
  },
};

type IProps = {
  style_2?: boolean;
  style_3?: boolean;
};

const AllProducts = ({ style_2 = false, style_3 = false }: IProps) => {
  const [subcategories, setSubcategories] = useState<string[]>(['All Products']);
  const [activeTab, setActiveTab] = useState('All Products');
  const [allProducts, setAllProducts] = useState<IProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProductData[]>([]);

  // Fetch subcategories and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const subRes = await API.get('/subcategories');
        const productRes = await API.get('/products');

        const uniqueSubs = new Set<string>();
        productRes.data.products.forEach((p: any) => {
          if (p.subcategory_name) uniqueSubs.add(p.subcategory_name);
        });

        setSubcategories(['All Products', ...Array.from(uniqueSubs)]);
        setAllProducts(productRes.data.products);
        console.log(productRes.data.products);
        setFilteredProducts(productRes.data.products);
                console.log("✅ All Products:", productRes.data.products);

        // Check for products without variants
        const badProducts = productRes.data.products.filter((p: any) => !p.variants || typeof p.variants !== 'object');
        if (badProducts.length > 0) {
          console.warn("⚠️ These products have missing or invalid 'variants':", badProducts);
        }

      } catch (error) {
        console.error('Failed to load data:', error);
      }

      
    };

    fetchData();
  }, []);

  // Filter products by subcategory
  const handleFilter = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'All Products') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (p) => p.subcategory_name?.toLowerCase() === tab.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <section className={`weekly-product-area ${style_2 ? 'whight-product pt-75 pb-75' : style_3 ? 'whight-product tpproduct__padding pt-75 pb-75 pl-65 pr-65 fix' : 'grey-bg pb-70'}`}>
      <div className={`${style_3 ? 'container-fluid' : 'container'}`}>
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="tpsection mb-20">
              <h4 className="tpsection__sub-title">~ Special Products ~</h4>
              <h4 className="tpsection__title">Weekly Food Offers</h4>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="row">
          <div className="col-lg-12">
            <div className="tpnavtab__area pb-40">
              <nav>
                <div className="nav nav-tabs" id="nav-tab">
                  {subcategories.map((tab, index) => (
                    <button
                      key={index}
                      className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                      type="button"
                      onClick={() => handleFilter(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Product Slider */}
              <div className="tpproduct__arrow p-relative">
                <Swiper {...slider_setting} modules={[Navigation]} className="swiper-container tpproduct-active tpslider-bottom p-relative">
                  {filteredProducts.map((product, index) => (
                    <SwiperSlide key={index}>
                      <ProductSingle product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="tpproduct-btn">
                  <div className="tpprduct-arrow tpproduct-btn__prv">
                    <a href="#"><i className="icon-chevron-left"></i></a>
                  </div>
                  <div className="tpprduct-arrow tpproduct-btn__nxt">
                    <a href="#"><i className="icon-chevron-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="row">
          <div className="col-lg-12">
            <div className="tpproduct__all-item text-center">
              <span>
                Discover thousands of other quality products.
                <Link href="/shop">Shop All Products <i className="icon-chevrons-right"></i></Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
