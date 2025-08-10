'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Menus from './menus';
import cart_icon from '@/assets/img/icon/cart-1.svg';
import useSticky from '@/hooks/use-sticky';
import HeaderTop from './header-top';
import SearchPopup from '@/components/common/modal/search-popup';
import CartSidebar from '@/components/sidebar/cart-sidebar';
import useCartInfo from '@/hooks/use-cart-info';
import MobileSidebar from '@/components/sidebar/mobile-sidebar';
import API from '@/utils/api';

const Header = () => {
  const { sticky } = useSticky();
  const { quantity } = useCartInfo();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("mobile");
    localStorage.removeItem("email");
    localStorage.removeItem("cart_products");
    setIsLoggedIn(false);
    router.push('/login');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const res = await API.get("/homepage");
        console.log("Homepage API response:", res.data);
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      }
    };

    fetchHomepage();
  }, []);

  return (
    <>
      <header>
        <HeaderTop />
        <div id="header-sticky" className={`header__main-area d-none d-xl-block ${sticky ? 'header-sticky' : ''}`}>
          <div className="container">
            <div className="header__for-megamenu p-relative">
              <div className="row align-items-center">
                <div className="col-xl-3">
                  <div className="header__logo">
                    <Link href="/">
                      {data?.logo ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.logo}`}
                          alt="logo"
                          width={100}
                          height={80}
                        />
                      ) : (
                        <span></span>
                      )}
                    </Link>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="header__menu main-menu text-center">
                    <Menus />
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className="header__info d-flex align-items-center">
                    {isLoggedIn && (
                      <a href="#" onClick={handleLogout} className="text-red-600 hover:underline">
                        Logout
                      </a>
                    )}
                    <div className="header__info-search tpcolor__purple ml-10">
                      <button onClick={() => setIsSearchOpen(true)} className="tp-search-toggle"><i className="icon-search"></i></button>
                    </div>
                    <div className="header__info-user tpcolor__yellow ml-10">
                      <Link href={isLoggedIn ? "/my-profile" : "/login"}><i className="icon-user"></i></Link>
                    </div>
                    <div className="header__info-cart tpcolor__oasis ml-10 tp-cart-toggle">
                      <button onClick={() => setIsCartOpen(true)}>
                        <i><Image src={cart_icon} alt="icon" /></i>
                        <span>{quantity}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile header */}
        <div id="header-sticky-2" className={`tpmobile-menu secondary-mobile-menu d-xl-none ${sticky ? 'header-sticky' : ''}`}>
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-3">
                <div className="mobile-menu-icon">
                  <button onClick={() => setIsMobileSidebarOpen(true)} className="tp-menu-toggle"><i className="icon-menu1"></i></button>
                </div>
              </div>
              <div className="col-6 text-center">
                <div className="header__logo">
                  <Link href="/">
                    {data?.logo ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.logo}`}
                        alt="logo"
                        width={100}
                        height={50}
                      />
                    ) : (
                      <span>Loading...</span>
                    )}
                  </Link>
                </div>
              </div>
              <div className="col-3">
                <div className="header__info d-flex align-items-center justify-content-end">
                  <div className="header__info-cart tpcolor__oasis ml-10 tp-cart-toggle">
                    <button onClick={() => setIsCartOpen(true)}>
                      <i><Image src={cart_icon} alt="icon" /></i>
                      <span>{quantity}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SearchPopup isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
        <CartSidebar isCartSidebarOpen={isCartOpen} setIsCartSidebarOpen={setIsCartOpen} />
        <MobileSidebar isSidebarOpen={isMobileSidebarOpen} setIsSidebarOpen={setIsMobileSidebarOpen} />
      </header>
    </>
  );
};

export default Header;
