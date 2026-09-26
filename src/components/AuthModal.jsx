import { useRef, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

function PhoneStep() {
  const { sendOtp, closeModal } = useAuth();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^0\d{10}$/.test(value.trim())) {
      setError("সঠিক ১১ সংখ্যার মোবাইল নাম্বার দিন");
      return;
    }
    sendOtp(value.trim());
  };

  return (
    <>
      <div className="mb-5">
        <p className="font-display text-2xl text-cocoa-950">শোখো</p>
      </div>
      <p className="mb-6 font-body text-sm leading-relaxed text-cocoa-950/70">
        মোবাইল নাম্বার ভেরিফাই করে শোখো পরিবারের সদস্য হয়ে যান
      </p>

      <form onSubmit={handleSubmit}>
        <label className="mb-1.5 block font-body text-sm font-medium text-cocoa-950">মোবাইল নাম্বার</label>
        <div className="flex overflow-hidden rounded-xl border border-cocoa-950/15">
          <span className="flex items-center bg-cream-100 px-3 font-body text-sm text-cocoa-950/60">
            (BD) +৮৮
          </span>
          <input
            type="tel"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="01XXXXXXXXX"
            className="w-full px-3 py-3 font-body text-sm text-cocoa-950 outline-none placeholder:text-cocoa-950/40"
          />
        </div>
        {error && <p className="mt-1.5 font-body text-xs text-maroon-600">{error}</p>}

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-cocoa-950 py-3.5 font-body font-semibold text-cream-50 transition-colors hover:bg-cocoa-800"
        >
          OTP পাঠান
        </button>
      </form>
    </>
  );
}

function OtpStep() {
  const { phone, confirmOtp } = useAuth();
  const [digits, setDigits] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    const v = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = v;
    setDigits(next);
    if (v && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (digits.some((d) => d === "")) {
      setError("সম্পূর্ণ ৬ সংখ্যার কোড দিন");
      return;
    }
    confirmOtp();
  };

  return (
    <>
      <div className="mb-5">
        <p className="font-display text-2xl text-cocoa-950">শোখো</p>
      </div>
      <p className="mb-6 font-body text-sm leading-relaxed text-cocoa-950/70">
        আমরা মাত্র আপনার মোবাইল নাম্বারে (+৮৮{phone}) একটি ৬ সংখ্যার OTP কোড পাঠিয়েছি
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-2 flex items-center justify-between gap-1.5">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              className="h-12 w-10 rounded-lg border border-cocoa-950/20 text-center font-body text-lg text-cocoa-950 outline-none focus:border-gold-500 sm:w-11"
            />
          ))}
        </div>
        {error && <p className="mb-2 font-body text-xs text-maroon-600">{error}</p>}

        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-cocoa-950 py-3.5 font-body font-semibold text-cream-50 transition-colors hover:bg-cocoa-800"
        >
          কোড কনফার্ম করুন
        </button>
      </form>
    </>
  );
}

export default function AuthModal() {
  const { isModalOpen, step, closeModal } = useAuth();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-950/50 px-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-xl text-cocoa-950">স্বাগতম</h2>
          <button onClick={closeModal} className="text-cocoa-950/50 hover:text-cocoa-950" aria-label="বন্ধ করুন">
            <X size={20} />
          </button>
        </div>

        {step === 1 ? <PhoneStep /> : <OtpStep />}
      </div>
    </div>
  );
}
