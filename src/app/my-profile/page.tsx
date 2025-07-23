import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/header/header";
import FeatureArea from "@/components/feature/feature-area";
import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-2";
import Footer from "@/layouts/footer/footer";
import MyOrdersArea from "@/components/my-orders/my-orders-area"; 

export const metadata: Metadata = {
  title: "My Orders - RangMart",
};

export default function MyOrdersPage() {
  return (
    <Wrapper>
      <Header />
      <main>
        <BreadcrumbTwo title="My Orders" />
        <MyOrdersArea />
        <FeatureArea style_2={true} />
      </main>
      <Footer />
    </Wrapper>
  );
}
