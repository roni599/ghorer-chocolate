import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function FloatingCartBadge() {
  const { count, subtotal, openDrawer } = useCart();

  return (
    <button
      onClick={openDrawer}
      className="fixed right-5 top-1/2 z-30 flex -translate-y-[140px] flex-col items-center gap-0.5 rounded-2xl bg-cocoa-950 px-4 py-3 text-cream-50 shadow-xl shadow-cocoa-950/30 transition-transform hover:scale-105"
      aria-label="কার্ট দেখুন"
    >
      <ShoppingBag size={18} />
      <span className="font-body text-[10px] leading-tight">{count} আইটেম</span>
      <span className="font-body text-xs font-semibold leading-tight">৳{subtotal.toLocaleString("bn-BD")}</span>
    </button>
  );
}
