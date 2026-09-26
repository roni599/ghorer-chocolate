import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart, ChevronRight, Check } from "lucide-react";
import Layout from "./Layout.jsx";
import { PRODUCTS, getProductById } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = getProductById(id);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="px-6 py-20 text-center md:px-14">
          <p className="font-body text-cocoa-950">পণ্যটি পাওয়া যায়নি।</p>
          <Link to="/" className="mt-4 inline-block font-body text-gold-600 underline">
            হোমপেজে ফিরে যান
          </Link>
        </div>
      </Layout>
    );
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <Layout>
      <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
        <nav className="mb-6 flex items-center gap-1.5 font-body text-xs text-cocoa-950/50">
          <Link to="/" className="hover:text-gold-600">
            হোম
          </Link>
          <ChevronRight size={12} />
          <span className="text-cocoa-950">{product.name}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-cream-100">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div>
            <span className="inline-block rounded-full bg-cream-100 px-3 py-1 font-body text-xs text-gold-600">
              {product.tag}
            </span>
            <h1 className="mt-4 font-display text-3xl text-cocoa-950 sm:text-4xl">{product.name}</h1>
            <p className="mt-4 font-body text-2xl font-semibold text-cocoa-950">
              ৳{product.price.toLocaleString("bn-BD")}
            </p>
            <p className="mt-5 max-w-md font-body leading-relaxed text-cocoa-950/70">
              {product.description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="font-body text-sm text-cocoa-950/60">পরিমাণ</span>
              <div className="flex items-center gap-3 rounded-full border border-cocoa-950/15 px-2 py-1.5">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-8 w-8 place-items-center rounded-full bg-cream-100 text-cocoa-950 hover:bg-cocoa-950 hover:text-cream-50 transition-colors"
                  aria-label="কমান"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-body font-semibold text-cocoa-950">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  className="grid h-8 w-8 place-items-center rounded-full bg-cream-100 text-cocoa-950 hover:bg-cocoa-950 hover:text-cream-50 transition-colors"
                  aria-label="বাড়ান"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3 font-body font-semibold text-cocoa-950 transition-colors hover:bg-gold-300"
              >
                {justAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
                {justAdded ? "কার্টে যোগ হয়েছে" : "কার্টে যোগ করুন"}
              </button>
              <button
                onClick={() => {
                  addItem(product, qty);
                  navigate("/checkout");
                }}
                className="rounded-full border border-cocoa-950/20 px-7 py-3 font-body font-semibold text-cocoa-950 transition-colors hover:bg-cocoa-950 hover:text-cream-50"
              >
                এখনই কিনুন
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-6 font-display text-2xl text-cocoa-950">আরও পছন্দ হতে পারে</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group rounded-2xl border border-cocoa-950/10 bg-white p-3 transition-shadow hover:shadow-lg hover:shadow-cocoa-950/10"
              >
                <div className="mb-3 h-24 w-full overflow-hidden rounded-xl bg-cream-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="px-1 font-body text-sm font-semibold text-cocoa-950">{p.name}</p>
                <p className="px-1 font-body text-xs text-gold-600">৳{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
