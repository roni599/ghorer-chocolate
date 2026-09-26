import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

export default function ProductGridSection({ title, products, seeAllHref = "/shop" }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
      <h2 className="mb-6 text-center font-display text-2xl text-cocoa-950 sm:text-3xl">{title}</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-7 text-center">
        <Link
          to={seeAllHref}
          className="inline-block rounded-full border border-cocoa-950/15 px-6 py-2.5 font-body text-sm font-semibold text-cocoa-950 transition-colors hover:bg-cocoa-950 hover:text-cream-50"
        >
          সব দেখুন
        </Link>
      </div>
    </section>
  );
}
