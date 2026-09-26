import Layout from "./Layout.jsx";
import Hero from "../components/Hero.jsx";
import CategoryCarousel from "../components/CategoryCarousel.jsx";
import TrustFeatures from "../components/TrustFeatures.jsx";
import ProductGridSection from "../components/ProductGridSection.jsx";
import CustomBoxBuilder from "../components/CustomBoxBuilder.jsx";
import Reviews from "../components/Reviews.jsx";
import { PRODUCTS } from "../data/products.js";

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <CategoryCarousel />
      <TrustFeatures />
      <ProductGridSection title="জনপ্রিয় প্রোডাক্ট" products={PRODUCTS} />
      <CustomBoxBuilder />
      <Reviews />
    </Layout>
  );
}
