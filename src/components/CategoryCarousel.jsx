import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS } from "../data/products.js";

const VISIBLE = 4;

export default function CategoryCarousel() {
  const [start, setStart] = useState(0);
  const maxStart = Math.max(0, PRODUCTS.length - VISIBLE);

  const visible = PRODUCTS.slice(start, start + VISIBLE);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
      <h2 className="mb-6 text-center font-display text-2xl text-cocoa-950 sm:text-3xl">
        পণ্যের ক্যাটাগরি
      </h2>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setStart((s) => Math.max(0, s - 1))}
          disabled={start === 0}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cocoa-950/15 text-cocoa-950 transition-colors hover:bg-cocoa-950 hover:text-cream-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cocoa-950 sm:flex"
          aria-label="আগেরটা দেখুন"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
          {visible.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group flex flex-col items-center rounded-xl border border-cocoa-950/10 bg-cream-50 p-4 text-center transition-shadow hover:shadow-lg hover:shadow-cocoa-950/10 sm:p-5"
            >
              <div className="mb-3 aspect-[3/2] w-full overflow-hidden rounded-lg bg-cream-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="font-body text-sm font-semibold leading-snug text-cocoa-950 sm:text-base">
                {product.name}
              </p>
              <p className="mt-1 font-body text-xs text-gold-600">{product.tag}</p>
            </Link>
          ))}
        </div>

        <button
          onClick={() => setStart((s) => Math.min(maxStart, s + 1))}
          disabled={start === maxStart}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cocoa-950/15 text-cocoa-950 transition-colors hover:bg-cocoa-950 hover:text-cream-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cocoa-950 sm:flex"
          aria-label="পরেরটা দেখুন"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
