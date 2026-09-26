import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [wished, setWished] = useState(false);

  const hasDiscount = product.mrp && product.mrp > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleBuyNow = (e) => {
    e.preventDefault();
    addItem(product, 1);
    navigate("/checkout");
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col rounded-xl border border-cocoa-950/10 bg-white p-3 transition-shadow hover:shadow-lg hover:shadow-cocoa-950/10"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          setWished((w) => !w);
        }}
        className="absolute right-4 top-4 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-cocoa-950/50 shadow-sm hover:text-maroon-600"
        aria-label="উইশলিস্টে যোগ করুন"
      >
        <Heart size={14} fill={wished ? "currentColor" : "none"} className={wished ? "text-maroon-600" : ""} />
      </button>

      {hasDiscount && (
        <span className="absolute left-4 top-4 z-10 rounded-md bg-maroon-600 px-1.5 py-0.5 font-body text-[10px] font-semibold text-white">
          {discountPct}% OFF
        </span>
      )}

      <div className="mb-3 aspect-square w-full overflow-hidden rounded-lg bg-cream-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <p className="line-clamp-1 font-body text-sm font-medium text-cocoa-950">{product.name}</p>
      <div className="mt-1 flex items-center gap-1.5">
        <span className="font-body text-sm font-semibold text-cocoa-950">৳{product.price}</span>
        {hasDiscount && (
          <span className="font-body text-xs text-cocoa-950/40 line-through">৳{product.mrp}</span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={handleAddToCart}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-cocoa-950/15 text-cocoa-950 transition-colors hover:bg-cream-100"
          aria-label="কার্টে যোগ করুন"
        >
          <ShoppingCart size={15} />
        </button>
        <button
          onClick={handleBuyNow}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-cocoa-950 py-2 font-body text-xs font-semibold text-cream-50 transition-colors hover:bg-cocoa-800"
        >
          এখনই কিনুন
          <ArrowRight size={13} />
        </button>
      </div>
    </Link>
  );
}
