import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import Layout from "./Layout.jsx";

const INFO = [
  { icon: MapPin, label: "ঠিকানা", value: "১২/এ, ধানমন্ডি, ঢাকা-১২০৯, বাংলাদেশ" },
  { icon: Phone, label: "ফোন", value: "০২৪১২৫৫৫০৩" },
  { icon: MessageCircle, label: "হোয়াটসঅ্যাপ", value: "০১৯৬৯১০৮৯৬৯" },
  { icon: Mail, label: "ইমেইল", value: "support@shokho.bd" },
  { icon: Clock, label: "সেবার সময়", value: "প্রতিদিন সকাল ৯টা - রাত ১০টা" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook this up to your real contact/email API — this UI is ready to wire up.
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <Layout>
      <div className="mx-auto w-full max-w-4xl px-5 py-12 md:px-8">
        <h1 className="text-center font-display text-3xl text-cocoa-950">যোগাযোগ করুন</h1>
        <p className="mt-2 text-center font-body text-sm text-cocoa-950/60">
          কোনো প্রশ্ন বা মতামত থাকলে আমাদের জানান, আমরা দ্রুত উত্তর দেওয়ার চেষ্টা করব
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="space-y-5">
            {INFO.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 rounded-xl border border-cocoa-950/10 bg-white p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream-100 text-cocoa-950">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="font-body text-xs text-cocoa-950/50">{label}</p>
                  <p className="font-body text-sm font-medium text-cocoa-950">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-cocoa-950/10 bg-white p-6">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-body text-xs text-cocoa-950/60">আপনার নাম</label>
                <input
                  required
                  value={form.name}
                  onChange={handleChange("name")}
                  className="w-full rounded-xl border border-cocoa-950/15 px-4 py-2.5 font-body text-sm text-cocoa-950 outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="mb-1 block font-body text-xs text-cocoa-950/60">ইমেইল</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange("email")}
                  className="w-full rounded-xl border border-cocoa-950/15 px-4 py-2.5 font-body text-sm text-cocoa-950 outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="mb-1 block font-body text-xs text-cocoa-950/60">বার্তা</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange("message")}
                  className="w-full rounded-xl border border-cocoa-950/15 px-4 py-2.5 font-body text-sm text-cocoa-950 outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-gold-500 py-3 font-body font-semibold text-cocoa-950 transition-colors hover:bg-gold-300"
            >
              {sent ? "পাঠানো হয়েছে ✓" : "পাঠিয়ে দিন"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
