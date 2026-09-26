import Layout from "./Layout.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";

export default function ShopPage() {
  return (
    <Layout>
      <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
        <h1 className="mb-8 text-center font-display text-3xl text-cocoa-950">সব প্রোডাক্ট</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
