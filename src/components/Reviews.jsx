import { Star } from "lucide-react";
import { REVIEWS } from "../data/content.js";

export default function Reviews() {
  return (
    <section className="bg-cream-100 py-10">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <h2 className="mb-6 text-center font-display text-2xl text-cocoa-950 sm:text-3xl">
          গ্রাহকের মতামত
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {REVIEWS.map((r) => (
            <div key={r.name} className="rounded-xl border border-cocoa-950/10 bg-cream-50 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-cocoa-950">
                  <img src={r.photo} alt={r.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-cocoa-950">{r.name}</p>
                  <p className="font-body text-xs text-cocoa-950/50">{r.location}</p>
                </div>
              </div>
              <div className="mb-2.5 flex gap-0.5 text-gold-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-body text-sm leading-relaxed text-cocoa-950/80">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
