'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IProductData } from '@/types/product-d-t';
import { FourColDots, ListDots, ThreeColDots } from '../svg';
import usePagination from '@/hooks/use-pagination';
import CategoryArea from '../category/category-area';
import NiceSelect from '../ui/nice-select';
import ShopItems from '../shop/shop-items';
import Pagination from '../ui/pagination';
import API from '@/utils/api';


// Layout tabs
const col_tabs = [
  { title: 'four-col', icon: <FourColDots /> },
  { title: 'three-col', icon: <ThreeColDots /> },
  { title: 'list', icon: <ListDots /> },
];

const SearchArea = () => {
  const [productItems, setProductItems] = useState<IProductData[]>([]);
  const [activeTab, setActiveTab] = useState(col_tabs[0].title);
  const [loading, setLoading] = useState<boolean>(false);

  const pagination_per_page = activeTab === 'four-col' ? 12 : 9;
  const { currentItems, handlePageClick, pageCount } = usePagination<IProductData>(
    productItems,
    pagination_per_page
  );

  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const searchText = searchParams.get('searchText');

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await API.get('/products');
      if (response.data?.status && response.data.products) {
        let data: IProductData[] = response.data.products;

        // Filter by category
        if (category) {
          const catSlug = category.toLowerCase().replace(/-/g, ' ');
          data = data.filter((item) =>
            item.subcategory_name?.toLowerCase().includes(catSlug)
          );
        }

        // Filter by searchText
        if (searchText) {
          data = data.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          );
        }

        setProductItems(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sort handler
  const handleSorting = (item: { value: string; label: string }) => {
    let sorted = [...productItems];

    if (item.value === 'new') {
      sorted = sorted.reverse(); // Assuming new products are last
    } else if (item.value === 'high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (item.value === 'low') {
      sorted.sort((a, b) => a.price - b.price);
    }

    setProductItems(sorted);
  };

  useEffect(() => {
    fetchProducts();
  }, [category, searchText]);

  return (
    <section className="shop-area-start grey-bg pb-200">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="tpshop__details">
              <div className="tpshop__category">
                <CategoryArea cls="inner-category-two" showCount={false} />
              </div>

              <div className="product__filter-content mb-30">
                <div className="row align-items-center">
                  <div className="col-sm-4">
                    <div className="product__item-count">
                      <span>
                        Showing {currentItems.length} of {productItems.length} Products
                      </span>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="tpproductnav tpnavbar product-filter-nav d-flex align-items-center justify-content-center">
                      <nav>
                        <div className="nav nav-tabs">
                          {col_tabs.map((tab, index) => (
                            <button
                              key={index}
                              className={`nav-link ${activeTab === tab.title ? 'active' : ''}`}
                              onClick={() => setActiveTab(tab.title)}
                            >
                              <i>{tab.icon}</i>
                            </button>
                          ))}
                        </div>
                      </nav>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="product__navtabs d-flex justify-content-end align-items-center">
                      <div className="tp-shop-selector">
                        <NiceSelect
                          options={[
                            { value: '', label: 'Default sorting' },
                            { value: 'new', label: 'New Arrivals' },
                            { value: 'high', label: 'Price High To Low' },
                            { value: 'low', label: 'Price Low To High' },
                          ]}
                          defaultCurrent={0}
                          onChange={(item) => handleSorting(item)}
                          name="Sorting"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shop Items */}
              {loading ? (
                <p className="text-center py-5">Loading products...</p>
              ) : (
                <ShopItems
                  products={currentItems}
                  activeTab={activeTab}
                  currentItems={currentItems}
                />
              )}

              {/* Pagination */}
              <div className="basic-pagination text-center mt-35">
                <nav>
                  <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchArea;
