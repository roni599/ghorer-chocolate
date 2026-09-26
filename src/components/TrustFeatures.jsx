import { Wallet, Truck, BadgeCheck, Gift } from "lucide-react";
import { FEATURES } from "../data/content.js";

const ICONS = { cash: Wallet, truck: Truck, badge: BadgeCheck, gift: Gift };

export default function TrustFeatures() {
  return (
    <section className="bg-cream-100 py-10">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <h2 className="mb-6 text-center font-display text-2xl text-cocoa-950 sm:text-3xl">
          লোকাল আস্থা ও সুবিধা
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {FEATURES.map(({ title, sub, icon }) => {
            const Icon = ICONS[icon];
            return (
              <div
                key={title}
                className="flex flex-col items-center rounded-xl border border-cocoa-950/10 bg-cream-50 p-4 text-center sm:p-5"
              >
                <div className="mb-2.5 grid h-10 w-10 place-items-center rounded-full bg-cocoa-950 text-gold-300">
                  <Icon size={17} />
                </div>
                <p className="font-body text-sm font-semibold leading-snug text-cocoa-950 sm:text-base">
                  {title}
                </p>
                <p className="mt-1 font-body text-xs text-cocoa-950/60">{sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
