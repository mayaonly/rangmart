'use client';

import React, { useEffect, useState } from 'react';
import API from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';

const imgStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
};

interface Subcategory {
  id: number | string;
  category_id: number | string;
  name: string;
  slug: string;
  image: string;
}

interface Category {
  id: number | string;
  name: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}

const CategorySubcategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/subcategories_and_categories');
        setCategories(res.data || []);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="category-subcategory-section pb-100 pt-50">
      <div className="container">
        {categories.map(category => (
          <div key={category.id} className="mb-50">
            {/* Category Title with Icon */}
            <div className="d-flex align-items-center mb-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${category.image}`}
                alt={category.name}
                width={50}
                height={50}
                style={{ objectFit: 'contain' }}
              />
              <h3 className="ms-3">{category.name}</h3>
            </div>

            {/* Subcategories */}
            <div className="row">
              {category.subcategories.map(sub => (
                <div className="col-xl-2 col-lg-3 col-md-4 col-6 mb-4" key={sub.id}>
                  <div className="subcategory-card text-center p-3 border rounded">
                    <Link href={`/search?category=${sub.name}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${sub.image}`}
                        alt={sub.name}
                        width={120}
                        height={120}
                        style={{ objectFit: 'contain' } as React.CSSProperties}
                      />
                      <p className="mt-2">{sub.name}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySubcategorySection;
