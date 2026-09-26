import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const FREE_DELIVERY_THRESHOLD = 3000;

export default function CartDrawer() {
  const { items, updateQty, removeItem, subtotal, count, isDrawerOpen, closeDrawer } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeDrawer();
    navigate("/checkout");
  };

  return (
    <>
      {/* backdrop */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-40 bg-cocoa-950/40 transition-opacity ${
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-cocoa-950/10 px-5 py-4">
          <h2 className="font-display text-lg text-cocoa-950">কার্ট: ({count} আইটেম)</h2>
          <button onClick={closeDrawer} className="text-cocoa-950/60 hover:text-cocoa-950" aria-label="বন্ধ করুন">
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-cocoa-950/10 bg-gold-500/10 px-5 py-2.5 font-body text-xs text-gold-600">
          ৳৩০০০ টাকার বেশি অর্ডারে ফ্রি ডেলিভারি চার্জ!
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag size={36} className="mb-3 text-cocoa-950/20" />
              <p className="font-body text-sm text-cocoa-950/50">আপনার কার্ট খালি।</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold leading-snug text-cocoa-950">{item.name}</p>
                    <p className="font-body text-xs text-cocoa-950/50">৳{item.price}</p>
                    <div className="mt-1.5 flex items-center gap-2 rounded-full border border-cocoa-950/15 px-1.5 py-0.5 w-fit">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="grid h-5 w-5 place-items-center rounded-full hover:bg-cream-100"
                        aria-label="কমান"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-4 text-center font-body text-xs">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="grid h-5 w-5 place-items-center rounded-full hover:bg-cream-100"
                        aria-label="বাড়ান"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-body text-sm font-semibold text-cocoa-950">৳{item.price * item.qty}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-cocoa-950/30 hover:text-maroon-600"
                      aria-label="মুছে ফেলুন"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-cocoa-950/10 bg-cream-50 px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-body text-sm text-cocoa-950/60">সর্বমোট:</span>
            <span className="font-body text-lg font-semibold text-cocoa-950">
              ৳{subtotal.toLocaleString("bn-BD")}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 py-3 font-body font-semibold text-cocoa-950 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            এখনই চেকআউট করুন →
          </button>
        </div>
      </div>
    </>
  );
}
