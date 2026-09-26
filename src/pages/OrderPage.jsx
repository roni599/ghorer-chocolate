import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Package, Truck, Home } from "lucide-react";
import Layout from "./Layout.jsx";

const STAGES = [
  { key: "confirmed", label: "অর্ডার কনফার্ম", icon: CheckCircle2 },
  { key: "packed", label: "প্যাকিং সম্পন্ন", icon: Package },
  { key: "shipped", label: "পথে আছে", icon: Truck },
  { key: "delivered", label: "ডেলিভারি সম্পন্ন", icon: Home },
];

function loadOrder(id) {
  try {
    const all = JSON.parse(localStorage.getItem("shokho_orders") || "{}");
    return all[id] || null;
  } catch {
    return null;
  }
}

export default function OrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setOrder(loadOrder(orderId));
  }, [orderId]);

  if (!order) {
    return (
      <Layout>
        <div className="px-6 py-20 text-center md:px-14">
          <p className="font-body text-cocoa-950">এই অর্ডার নাম্বারটি খুঁজে পাওয়া যায়নি।</p>
          <Link to="/" className="mt-4 inline-block font-body text-gold-600 underline">
            হোমপেজে ফিরে যান
          </Link>
        </div>
      </Layout>
    );
  }

  const placedDate = new Date(order.placedAt).toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Purely illustrative progress for a freshly placed order.
  const currentStageIndex = 0;

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-6 py-14 md:px-0">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="font-display text-3xl text-cocoa-950">ধন্যবাদ, আপনার অর্ডার সফল হয়েছে!</h1>
          <p className="mt-2 font-body text-cocoa-950/60">অর্ডার নাম্বার: {order.id}</p>
        </div>

        <div className="mb-8 rounded-2xl border border-cocoa-950/10 bg-white p-6">
          <div className="flex items-center justify-between">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              const active = i <= currentStageIndex;
              return (
                <div key={stage.key} className="flex flex-1 flex-col items-center text-center">
                  <div
                    className={`mb-2 grid h-10 w-10 place-items-center rounded-full ${
                      active ? "bg-gold-500 text-cocoa-950" : "bg-cream-100 text-cocoa-950/30"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <p
                    className={`font-body text-[11px] leading-tight ${
                      active ? "text-cocoa-950" : "text-cocoa-950/40"
                    }`}
                  >
                    {stage.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-cocoa-950/10 bg-white p-6">
          <h2 className="mb-4 font-body text-sm font-semibold uppercase tracking-wide text-cocoa-950/50">
            অর্ডারের বিবরণ
          </h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-cocoa-950">{item.name}</p>
                  <p className="font-body text-xs text-cocoa-950/50">{item.qty} × ৳{item.price}</p>
                </div>
                <p className="font-body text-sm font-semibold text-cocoa-950">
                  ৳{item.qty * item.price}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-1.5 border-t border-cocoa-950/10 pt-4 font-body text-sm text-cocoa-950/80">
            <div className="flex justify-between">
              <span>সাবটোটাল</span>
              <span>৳{order.subtotal.toLocaleString("bn-BD")}</span>
            </div>
            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ</span>
              <span>৳{order.deliveryFee}</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-cocoa-950">
              <span>সর্বমোট</span>
              <span>৳{order.total.toLocaleString("bn-BD")}</span>
            </div>
          </div>

          <div className="mt-5 border-t border-cocoa-950/10 pt-4 font-body text-sm text-cocoa-950/70">
            <p>অর্ডারের তারিখ: {placedDate}</p>
            <p className="mt-1">ডেলিভারি ঠিকানা: {order.customer.address}</p>
            <p className="mt-1">যোগাযোগ: {order.customer.name} · {order.customer.phone}</p>
          </div>
        </div>

        <Link
          to="/"
          className="mt-8 block w-full rounded-full bg-cocoa-950 py-3 text-center font-body font-semibold text-cream-50 transition-colors hover:bg-cocoa-800"
        >
          আরও কেনাকাটা করুন
        </Link>
      </div>
    </Layout>
  );
}
