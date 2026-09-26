import { CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Toast() {
  const { toast } = useAuth();

  if (!toast) return null;

  return (
    <div className="fixed left-1/2 top-5 z-[60] -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-full bg-cocoa-950 px-5 py-3 text-cream-50 shadow-xl shadow-cocoa-950/30">
        <CheckCircle2 size={18} className="text-emerald-400" />
        <span className="font-body text-sm font-medium">{toast}</span>
      </div>
    </div>
  );
}
