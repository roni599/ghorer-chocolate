export default function Hero() {
  return (
    <section className="relative h-[300px] w-full overflow-hidden sm:h-[380px] md:h-[440px]">
      <img
        src="/images/hero-photo.jpg"
        alt="দুজন মানুষ উৎসবের সাজে হাতে চকোলেট তৈরি করছেন"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 30%" }}
      />
      {/* localized dark panel behind the text only, so the photo itself stays visible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(43,24,16,0.92) 0%, rgba(43,24,16,0.78) 32%, rgba(43,24,16,0.25) 58%, rgba(43,24,16,0) 75%)",
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-5 md:px-8">
        <div className="max-w-md sm:max-w-lg">
          <span className="mb-4 inline-block rounded-full border border-gold-300/40 px-3 py-1 font-body text-xs text-gold-300 sm:text-sm">
            শীতের উৎসব আয়োজন
          </span>
          <h1 className="font-display text-2xl leading-[1.3] text-cream-50 sm:text-4xl md:text-5xl">
            উৎসবের আনন্দে খাঁটি চকোলেট —<br />
            সারা বাংলাদেশে হোম ডেলিভারি।
          </h1>
          <p className="mt-3 font-body text-sm text-cream-100/85 sm:text-lg">
            'শোখো' — আপনার মিষ্টি মুহূর্তের সাথী।
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
            <button className="rounded-full bg-gold-500 px-5 py-2 font-body text-sm font-semibold text-cocoa-950 transition-colors hover:bg-gold-300 sm:px-7 sm:py-3 sm:text-base">
              Order Now
            </button>
            <button className="rounded-full border border-emerald-400/50 px-5 py-2 font-body text-sm text-emerald-300 transition-colors hover:bg-emerald-400/10 sm:px-6 sm:py-3 sm:text-base">
              WhatsApp Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
