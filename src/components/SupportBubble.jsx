import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "8801969108969";
const MESSENGER_USERNAME = "shokho.bd"; // replace with your real Facebook Page username

export default function SupportBubble() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {open && (
        <div className="w-52 overflow-hidden rounded-2xl border border-cocoa-950/10 bg-white shadow-2xl shadow-cocoa-950/20">
          <div className="flex items-center justify-between border-b border-cocoa-950/10 px-4 py-3">
            <p className="font-body text-sm font-semibold text-cocoa-950">যোগাযোগ করুন</p>
            <button onClick={() => setOpen(false)} className="text-cocoa-950/40 hover:text-cocoa-950" aria-label="বন্ধ করুন">
              <X size={16} />
            </button>
          </div>
          <a
            href={`https://m.me/${MESSENGER_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 font-body text-sm text-cocoa-950 transition-colors hover:bg-cream-100"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0084FF]">
              <MessengerIcon />
            </span>
            মেসেঞ্জার
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 font-body text-sm text-cocoa-950 transition-colors hover:bg-cream-100"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#25D366]">
              <WhatsAppIcon />
            </span>
            হোয়াটসঅ্যাপ
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="grid h-12 w-12 place-items-center rounded-full bg-maroon-600 text-white shadow-xl shadow-maroon-600/40 transition-transform hover:scale-105"
        aria-label="যোগাযোগের অপশন দেখুন"
      >
        {open ? <X size={20} /> : <MessageCircle size={22} fill="currentColor" strokeWidth={0} />}
      </button>
    </div>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
      <path d="M12 2C6.5 2 2 6.2 2 11.4c0 2.9 1.4 5.5 3.6 7.2V22l3.3-1.8c.9.2 1.8.4 2.8.4 5.5 0 10-4.2 10-9.4S17.5 2 12 2zm1 12.6-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 5-2.7-5.5 5.8z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.2 14.9 3.8 13.5 3.8 12c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4.5.2.9.4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.5-.6 1.6-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3z" />
    </svg>
  );
}
