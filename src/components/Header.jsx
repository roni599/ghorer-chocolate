import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import TopBar from "./TopBar.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { count, openDrawer } = useCart();
  const { user, openAuthFlow } = useAuth();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (user) navigate("/profile");
    else openAuthFlow();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-cocoa-950/10 bg-cream-50/95 backdrop-blur">
      <TopBar />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3 md:px-8">
        <Link to="/" className="shrink-0">
          <p className="font-display text-2xl leading-none text-cocoa-950">শোখো</p>
          <p className="-mt-0.5 font-body text-[10px] tracking-[0.2em] text-gold-600">SHOKHO</p>
        </Link>

        <div className="hidden justify-center md:flex">
          <div className="flex w-full max-w-sm items-center overflow-hidden rounded-full border border-cocoa-950/15 bg-white">
            <input
              type="text"
              placeholder="কী খুঁজছেন লিখুন…"
              className="w-full flex-1 bg-transparent px-4 py-2 font-body text-sm text-cocoa-950 outline-none placeholder:text-cocoa-950/40"
            />
            <button className="bg-cocoa-950 px-3.5 py-2 text-cream-50 transition-colors hover:bg-cocoa-800">
              <Search size={15} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 text-cocoa-950">
          <button className="md:hidden" aria-label="খুঁজুন">
            <Search size={19} />
          </button>
          <button onClick={handleAccountClick} className="transition-colors hover:text-gold-600" aria-label="অ্যাকাউন্ট">
            <User size={19} />
          </button>
          <button
            onClick={openDrawer}
            className="relative transition-colors hover:text-gold-600"
            aria-label="কার্ট"
          >
            <ShoppingCart size={19} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-maroon-600 font-body text-[10px] text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
