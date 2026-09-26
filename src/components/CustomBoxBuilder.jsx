import { useState } from "react";
import { ChevronRight } from "lucide-react";

const BOX_SIZES = ["৬ পিস", "৯ পিস", "১২ পিস", "১৮ পিস"];
const CHOCOLATE_TYPES = ["ডার্ক", "মিল্ক", "মিশ্র"];

function OptionRow({ title, sub, value, options, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-cocoa-950/10 bg-white px-4 py-3">
      <div>
        <p className="font-body text-sm font-semibold text-cocoa-950">{title}</p>
        <p className="font-body text-xs text-cocoa-950/50">{sub}</p>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-full border border-cocoa-950/15 bg-cream-100 px-3 py-1.5 font-body text-xs font-medium text-cocoa-950 outline-none"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronRight size={16} className="text-cocoa-950/30" />
      </div>
    </div>
  );
}

export default function CustomBoxBuilder() {
  const [boxSize, setBoxSize] = useState(BOX_SIZES[1]);
  const [chocolateType, setChocolateType] = useState(CHOCOLATE_TYPES[0]);
  const [message, setMessage] = useState("");

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
      <h2 className="mb-6 text-center font-display text-2xl text-cocoa-950 sm:text-3xl">
        ইন্টারঅ্যাক্টিভ কাস্টম বক্স
      </h2>

      <div className="grid gap-5 rounded-2xl bg-cocoa-950 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div className="flex flex-col justify-center">
          <h3 className="font-display text-xl leading-snug text-cream-50">
            আপনার নিজস্ব চকোলেট বক্স তৈরি করুন
          </h3>
          <p className="mt-2.5 font-body text-sm leading-relaxed text-cream-100/70">
            বক্সের আকার, চকোলেটের ধরন আর একটি ব্যক্তিগত বার্তা বেছে নিয়ে সম্পূর্ণ
            নিজের মতো সাজানো একটি উপহার বক্স তৈরি করুন।
          </p>
        </div>

        <div className="rounded-2xl bg-cream-100 p-5">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-white p-3">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cocoa-600/10">
              <img src="/images/gift-box.jpg" alt="কাস্টম চকোলেট বক্স" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-cocoa-950">
                {boxSize} · {chocolateType} চকোলেট বক্স
              </p>
              <p className="font-body text-xs text-cocoa-950/50">লাইভ প্রিভিউ</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <OptionRow
              title="বক্স সাইজ বাছুন"
              sub="ছোট থেকে বড় — আপনার প্রয়োজন মতো"
              value={boxSize}
              options={BOX_SIZES}
              onChange={setBoxSize}
            />
            <OptionRow
              title="চকোলেট নির্বাচন করুন"
              sub="ডার্ক, মিল্ক অথবা মিশ্র"
              value={chocolateType}
              options={CHOCOLATE_TYPES}
              onChange={setChocolateType}
            />
            <div className="rounded-xl border border-cocoa-950/10 bg-white px-4 py-3">
              <p className="mb-1.5 font-body text-sm font-semibold text-cocoa-950">
                ব্যক্তিগত বার্তা যোগ করুন
              </p>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="যেমন: শুভ জন্মদিন, প্রিয়!"
                maxLength={40}
                className="w-full bg-transparent font-body text-xs text-cocoa-950 outline-none placeholder:text-cocoa-950/40"
              />
            </div>
          </div>

          <button className="mt-4 w-full rounded-full bg-gold-500 py-3 font-body font-semibold text-cocoa-950 transition-colors hover:bg-gold-300">
            নিজের বক্স তৈরি করুন
          </button>
        </div>
      </div>
    </section>
  );
}
