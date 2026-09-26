import { MapPin, MessageCircle } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden bg-cocoa-950 sm:block">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-2 font-body text-sm text-cream-100/90 md:px-8">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gold-300" />
            অর্ডার ট্র্যাক করুন: ০২৪১২৫৫৫০৩
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle size={14} className="text-emerald-400" />
            হোয়াটসঅ্যাপ: ০১৯৬৯১০৮৯৬৯
          </span>
        </div>
        <button className="tracking-wide hover:text-gold-300 transition-colors">
          বাংলা / English
        </button>
      </div>
    </div>
  );
}
