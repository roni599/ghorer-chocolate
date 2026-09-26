import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { PAYMENT_METHODS, FOOTER_LINKS } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="bg-cocoa-950 text-cream-100/70">
      <div className="mx-auto w-full max-w-6xl px-5 pb-6 pt-10 md:px-8">
        <div className="mb-6 text-center">
          <p className="mb-3 font-body text-xs tracking-wide text-cream-50">পেমেন্ট পদ্ধতি</p>
          <div className="flex flex-wrap justify-center gap-3">
            {PAYMENT_METHODS.map((m) => (
              <div
                key={m.name}
                className="flex h-12 items-center justify-center rounded-md bg-white/95 px-3.5 py-2"
              >
                <img src={m.logo} alt={m.name} className="h-full w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 border-t border-cream-100/10 pt-6 text-center sm:grid-cols-4 sm:text-left">
          <div className="sm:col-span-2">
            <p className="font-display text-lg text-cream-50">শোখো</p>
            <p className="mx-auto mt-2 max-w-xs font-body text-sm sm:mx-0">
              হাতে তৈরি খাঁটি চকোলেট, সরাসরি আপনার দরজায়।
            </p>
            <div className="mt-3 flex justify-center gap-3 sm:justify-start">
              <Facebook size={16} className="cursor-pointer transition-colors hover:text-gold-300" />
              <Instagram size={16} className="cursor-pointer transition-colors hover:text-gold-300" />
            </div>
          </div>

          <div>
            <p className="font-body text-sm font-semibold text-cream-50">সহায়তা</p>
            <ul className="mt-2 space-y-1.5 font-body text-sm">
              {FOOTER_LINKS.support.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-gold-300 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-sm font-semibold text-cream-50">যোগাযোগ করুন</p>
            <p className="mt-2 flex items-center justify-center gap-1.5 font-body text-sm sm:justify-start">
              <Mail size={13} /> support@shokho.bd
            </p>
            <p className="mt-1.5 flex items-center justify-center gap-1.5 font-body text-sm sm:justify-start">
              <Phone size={13} /> ০২৪১২৫৫৫০৩
            </p>
          </div>
        </div>

        <p className="mt-6 border-t border-cream-100/10 pt-5 text-center font-body text-xs text-cream-100/40">
          © ২০২৬ শোখো — সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
}
