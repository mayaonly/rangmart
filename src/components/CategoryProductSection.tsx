'use client';
import React, { useEffect, useState } from 'react';
import API from '@/utils/api';
import { IProductData } from '@/types/product-d-t';
import Image from "next/image";

const imgStyle = {
  width: "100%",
  height: "100%",
};

const CategoryProductSection = () => {
  const [products, setProducts] = useState<IProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data.products || []);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Group products by subcategory
  const groupedBySubcategory = products.reduce((acc: any, product) => {
    const subcat = product.subcategory_name || 'Others';
    if (!acc[subcat]) acc[subcat] = [];
    acc[subcat].push(product);
    return acc;
  }, {});

  return (
    <section className="category-product-section pb-100 pt-50">
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          Object.entries(groupedBySubcategory).map(([subcategory, items]: any) => (
            <div key={subcategory} className="mb-50">
              <h3 className="mb-30">{subcategory.toUpperCase()}</h3>
              <div className="row">
                {items.slice(0, 8).map((item: IProductData) => (
                  <div className="col-xl-2 col-lg-3 col-md-4 col-6 mb-4" key={item.id}>
                    <div className="product-card text-center ">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image_url}`}
                        alt="product-img"
                        width={217}
                        height={217}
                        style={imgStyle}
                      />
                      <p className="product-name">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CategoryProductSection;
