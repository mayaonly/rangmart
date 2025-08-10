import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/header/header";
import HeroBanner from "@/components/hero-banner/hero-banner";
import CategoryArea from "@/components/category/category-area";
import ProductArea from "@/components/product/home/product-area";
import ProductFeatureArea from "@/components/product/feature/product-feature-area";
import OfferCountdownBanner from "@/components/product/countdown-banner/offer-countdown-banner";
import ProductBannerArea from "@/components/banner/product-banner-area";
import AllProducts from "@/components/product/home/all-products";
import BlogItems from "@/components/blogs/blog-items";
import FeatureArea from "@/components/feature/feature-area";
import Footer from "@/layouts/footer/footer";
import MySlider from '@/components/PromoSlider';
import CategoryProductSection from '@/components/CategoryProductSection';

export const metadata: Metadata = {
  title: "RangMart"
};

export default function HomePage() {
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      <main>
        {/* hero start */}
        {/* <HeroBanner /> */}
        {/* hero end */}

         <MySlider />

        {/* category start */}
        {/* <section className="category-area grey-bg pb-40 pt-50">
          <div className="container">
            <CategoryArea cls="category-active "/>
          </div>
        </section> */}
        
        {/* category end */}
        
        <CategoryProductSection />

        {/* weekly product start */}
        <ProductArea />
        {/* weekly product end */}

        {/* product feature start */}
        <ProductFeatureArea />
        {/* product feature end */}

        {/* product banner start */}
        <ProductBannerArea />
        {/* product banner end */}

        {/* all products start */}
        <AllProducts />
        {/* all products end */}

        {/* deal offer start */}
        <OfferCountdownBanner />
        {/* deal offer end */}

        {/* blogs start */}
        <BlogItems />
        {/* blogs end */}

        {/* feature area start */}
        <FeatureArea />
        {/* feature area end */}
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
