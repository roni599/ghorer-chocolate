import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Truck, Plus, Banknote, Wallet } from "lucide-react";
import Layout from "./Layout.jsx";
import { useCart } from "../context/CartContext.jsx";

const DELIVERY_AREAS = [
  { id: "inside", label: "ঢাকার ভিতরে", fee: 60 },
  { id: "outside", label: "ঢাকার বাইরে", fee: 130 },
];

function saveOrder(order) {
  try {
    const all = JSON.parse(localStorage.getItem("shokho_orders") || "{}");
    all[order.id] = order;
    localStorage.setItem("shokho_orders", JSON.stringify(all));
  } catch {
    /* ignore storage errors */
  }
}

function generateOrderId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `SHK-${n}`;
}

export default function CheckoutPage() {
  const { items, subtotal, count, clearCart } = useCart();
  const navigate = useNavigate();

  const [deliveryArea, setDeliveryArea] = useState("outside");
  const [couponCode, setCouponCode] = useState("");
  const [couponOpen, setCouponOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState("cod");
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", phone: "", note: "" });
  const [errors, setErrors] = useState({});

  const deliveryFee = DELIVERY_AREAS.find((a) => a.id === deliveryArea)?.fee ?? 0;
  const totalWithDiscount = Math.max(0, subtotal - discount);
  const grandTotal = totalWithDiscount + deliveryFee;

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const applyCoupon = () => {
    // Placeholder logic — wire this up to your real coupon/validation API.
    if (couponCode.trim().toUpperCase() === "SHOKHO10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else {
      setDiscount(0);
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "নাম লিখুন";
    if (!form.address.trim()) next.address = "ঠিকানা লিখুন";
    if (!/^0\d{10}$/.test(form.phone.trim())) next.phone = "সঠিক ১১ সংখ্যার নাম্বার দিন";
    if (!agreed) next.agreed = "শর্তাবলীতে সম্মত হতে হবে";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleOrder = () => {
    if (!items.length) return;
    if (!validate()) return;

    const order = {
      id: generateOrderId(),
      items,
      subtotal,
      discount,
      deliveryFee,
      deliveryArea,
      total: grandTotal,
      payment,
      customer: form,
      placedAt: new Date().toISOString(),
    };
    saveOrder(order);
    clearCart();
    navigate(`/order/${order.id}`);
  };

  const canOrder = useMemo(() => items.length > 0, [items]);

  return (
    <Layout>
      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <nav className="mb-6 flex items-center gap-1.5 font-body text-xs text-cocoa-950/50">
          <Link to="/" className="hover:text-gold-600">
            হোম
          </Link>
          <ChevronRight size={12} />
          <span className="text-cocoa-950">চেকআউট</span>
        </nav>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-cocoa-950/10 bg-white p-10 text-center">
            <p className="font-body text-cocoa-950/70">আপনার কার্ট খালি।</p>
            <Link
              to="/"
              className="mt-4 inline-block rounded-full bg-gold-500 px-6 py-2.5 font-body font-semibold text-cocoa-950 hover:bg-gold-300 transition-colors"
            >
              কেনাকাটা চালিয়ে যান
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {/* left column: bag, delivery area, bill */}
            <div className="rounded-2xl border border-cocoa-950/10 bg-white p-6">
              <h2 className="mb-4 font-display text-lg text-cocoa-950">
                আপনার ব্যাগে {count} আইটেম
              </h2>

              <div className="mb-6 space-y-3 border-b border-cocoa-950/10 pb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-sm font-semibold text-cocoa-950">{item.name}</p>
                      <p className="font-body text-xs text-cocoa-950/50">{item.qty} × ৳{item.price}</p>
                    </div>
                    <p className="font-body text-sm font-semibold text-cocoa-950">৳{item.qty * item.price}</p>
                  </div>
                ))}
              </div>

              <h3 className="mb-3 font-body text-sm font-semibold text-cocoa-950">ডেলিভারি এলাকা বাছুন</h3>
              <div className="mb-6 space-y-2.5">
                {DELIVERY_AREAS.map((area) => (
                  <label
                    key={area.id}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
                      deliveryArea === area.id
                        ? "border-gold-500 bg-gold-500/10"
                        : "border-cocoa-950/15 hover:border-cocoa-950/30"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 font-body text-sm text-cocoa-950">
                      <input
                        type="radio"
                        name="deliveryArea"
                        checked={deliveryArea === area.id}
                        onChange={() => setDeliveryArea(area.id)}
                        className="accent-gold-500"
                      />
                      <Truck size={16} className="text-cocoa-950/60" />
                      {area.label}
                    </span>
                    <span className="font-body text-sm font-semibold text-cocoa-950">৳{area.fee}</span>
                  </label>
                ))}
              </div>

              <div className="mb-4">
                <button
                  onClick={() => setCouponOpen((o) => !o)}
                  className="flex w-full items-center justify-between font-body text-sm font-semibold text-cocoa-950"
                >
                  কুপন কোড
                  <Plus size={16} className={`transition-transform ${couponOpen ? "rotate-45" : ""}`} />
                </button>
                {couponOpen && (
                  <div className="mt-3 flex gap-2">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="কুপন কোড লিখুন"
                      className="flex-1 rounded-lg border border-cocoa-950/15 px-3 py-2 font-body text-sm text-cocoa-950 outline-none focus:border-gold-500"
                    />
                    <button
                      onClick={applyCoupon}
                      className="rounded-lg bg-cocoa-950 px-4 py-2 font-body text-sm font-semibold text-cream-50 hover:bg-cocoa-800 transition-colors"
                    >
                      প্রয়োগ করুন
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2 border-t border-cocoa-950/10 pt-4 font-body text-sm text-cocoa-950/80">
                <div className="flex justify-between">
                  <span>মোট</span>
                  <span>৳{subtotal.toLocaleString("bn-BD")}</span>
                </div>
                <div className="flex justify-between">
                  <span>ছাড়ের পরিমাণ</span>
                  <span>-৳{discount.toLocaleString("bn-BD")}</span>
                </div>
                <div className="flex justify-between font-semibold text-cocoa-950">
                  <span>ছাড়ের পর মোট</span>
                  <span>৳{totalWithDiscount.toLocaleString("bn-BD")}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ</span>
                  <span>৳{deliveryFee}</span>
                </div>
                <div className="flex justify-between border-t border-cocoa-950/10 pt-2 text-base font-semibold text-cocoa-950">
                  <span>সর্বমোট</span>
                  <span>৳{grandTotal.toLocaleString("bn-BD")}</span>
                </div>
              </div>
            </div>

            {/* right column: shipping + payment */}
            <div className="rounded-2xl border border-cocoa-950/10 bg-white p-6">
              <h2 className="mb-4 font-display text-lg text-cocoa-950">শিপিং ঠিকানা</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block font-body text-xs text-cocoa-950/60">নাম</label>
                  <input
                    value={form.name}
                    onChange={handleChange("name")}
                    className="w-full rounded-xl border border-cocoa-950/15 px-4 py-2.5 font-body text-sm text-cocoa-950 outline-none focus:border-gold-500"
                  />
                  {errors.name && <p className="mt-1 font-body text-xs text-maroon-600">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1 block font-body text-xs text-cocoa-950/60">ঠিকানা</label>
                  <input
                    value={form.address}
                    onChange={handleChange("address")}
                    className="w-full rounded-xl border border-cocoa-950/15 px-4 py-2.5 font-body text-sm text-cocoa-950 outline-none focus:border-gold-500"
                  />
                  {errors.address && <p className="mt-1 font-body text-xs text-maroon-600">{errors.address}</p>}
                </div>
                <div>
                  <label className="mb-1 block font-body text-xs text-cocoa-950/60">মোবাইল নাম্বার</label>
                  <input
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-xl border border-cocoa-950/15 px-4 py-2.5 font-body text-sm text-cocoa-950 outline-none focus:border-gold-500"
                  />
                  {errors.phone && <p className="mt-1 font-body text-xs text-maroon-600">{errors.phone}</p>}
                </div>
                <div>
                  <label className="mb-1 block font-body text-xs text-cocoa-950/60">নোট (ঐচ্ছিক)</label>
                  <textarea
                    value={form.note}
                    onChange={handleChange("note")}
                    rows={2}
                    className="w-full rounded-xl border border-cocoa-950/15 px-4 py-2.5 font-body text-sm text-cocoa-950 outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <h2 className="mb-3 mt-6 font-display text-lg text-cocoa-950">পেমেন্ট অপশন</h2>
              <div className="space-y-2.5">
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
                    payment === "cod" ? "border-gold-500 bg-gold-500/10" : "border-cocoa-950/15 hover:border-cocoa-950/30"
                  }`}
                >
                  <span className="flex items-center gap-2.5 font-body text-sm text-cocoa-950">
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                      className="accent-gold-500"
                    />
                    <Banknote size={16} className="text-cocoa-950/60" />
                    ক্যাশ অন ডেলিভারি
                  </span>
                  <span className="font-body text-sm font-semibold text-cocoa-950">৳{deliveryFee}</span>
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
                    payment === "full" ? "border-gold-500 bg-gold-500/10" : "border-cocoa-950/15 hover:border-cocoa-950/30"
                  }`}
                >
                  <span className="flex items-center gap-2.5 font-body text-sm text-cocoa-950">
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "full"}
                      onChange={() => setPayment("full")}
                      className="accent-gold-500"
                    />
                    <Wallet size={16} className="text-cocoa-950/60" />
                    সম্পূর্ণ টাকা পরিশোধ করুন
                  </span>
                  <span className="font-body text-sm font-semibold text-cocoa-950">৳{grandTotal}</span>
                </label>
              </div>

              <label className="mt-5 flex items-start gap-2.5 font-body text-xs text-cocoa-950/70">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-gold-500"
                />
                <span>
                  আমি ওয়েবসাইটের{" "}
                  <span className="text-gold-600 underline">শর্তাবলী</span> পড়েছি এবং সম্মত আছি। ৩-৭ কর্মদিবসের
                  মধ্যে ডেলিভারি করা হবে, ইনশাআল্লাহ, এর মধ্যে কল দেওয়া হবে না।
                </span>
              </label>
              {errors.agreed && <p className="mt-1 font-body text-xs text-maroon-600">{errors.agreed}</p>}

              <button
                onClick={handleOrder}
                disabled={!canOrder}
                className="mt-5 w-full rounded-full bg-gold-500 py-3 font-body font-semibold text-cocoa-950 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                অর্ডার করুন
              </button>
            </div>
          </div>
        )}
      </div>

    </Layout>
  );
}
