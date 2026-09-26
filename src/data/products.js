export const PRODUCTS = [
  {
    id: "dark-classic",
    name: "ডার্ক চকোলেট ক্লাসিক",
    tag: "৭২% কোকো",
    price: 450,
    mrp: 500,
    image: "/images/cat-dark.jpg",
    description:
      "৭২% খাঁটি কোকো দিয়ে তৈরি আমাদের সিগনেচার ডার্ক চকোলেট বার। তিতা-মিষ্টির নিখুঁত ভারসাম্য, কোনো কৃত্রিম উপাদান ছাড়াই।",
  },
  {
    id: "milk-classic",
    name: "মিল্ক চকোলেট ক্লাসিক",
    tag: "সবচেয়ে জনপ্রিয়",
    price: 400,
    mrp: null,
    image: "/images/cat-milk.jpg",
    description:
      "মসৃণ, ক্রিমি স্বাদের মিল্ক চকোলেট বার। বাচ্চা থেকে বড় সবার প্রিয় — আমাদের সবচেয়ে বেশি বিক্রিত পণ্য।",
  },
  {
    id: "assorted-gift-box",
    name: "কাস্টমাইজড গিফট বক্স",
    tag: "নিজের মতো সাজান",
    price: 1200,
    mrp: 1400,
    image: "/images/cat-assorted.jpg",
    description:
      "১৬ পিস হ্যান্ড-ফিলড প্রালিনের প্রিমিয়াম গিফট বক্স। জন্মদিন, বিবাহবার্ষিকী কিংবা যেকোনো উপলক্ষ্যে উপহার দেওয়ার জন্য উপযুক্ত।",
  },
  {
    id: "festive-box",
    name: "উৎসবের কাঠা প্যাকেট",
    tag: "সীমিত সংস্করণ",
    price: 950,
    mrp: null,
    image: "/images/cat-festive.jpg",
    description:
      "উৎসব মৌসুমের বিশেষ সংস্করণ প্যাকেজিং — লাল-সোনালি ফিতা আর সিজনাল ফ্লেভারের চকোলেট দিয়ে সাজানো।",
  },
  {
    id: "shokho-signature-box",
    name: "শোখো সিগনেচার বক্স",
    tag: "শোখো লোগো এমবস্‌ড",
    price: 1450,
    mrp: 1600,
    image: "/images/gift-box.jpg",
    description:
      "আমাদের ফ্ল্যাগশিপ বক্স — ঢাকনায় এমবস করা 'shokho' লোগো, ভেতরে ১২ পিস প্রিমিয়াম চকোলেটের এক নিখুঁত মিশ্রণ।",
  },
  {
    id: "praline-collection",
    name: "প্রালিন কালেকশন",
    tag: "হ্যান্ডমেড",
    price: 1100,
    mrp: null,
    image: "/images/cat-assorted.jpg",
    description:
      "হাতে তৈরি ৯ পিস প্রালিনের কালেকশন — হ্যাজেলনাট, ক্যারামেল আর সি-সল্ট ফ্লেভারের মিশ্রণ।",
  },
  {
    id: "chocolate-truffles",
    name: "চকোলেট ট্রাফল বক্স",
    tag: "৮ পিস বক্স",
    price: 650,
    mrp: 750,
    image: "/images/cat-dark.jpg",
    description:
      "নরম, ক্রিমি গানাশ দিয়ে তৈরি ৮ পিস ট্রাফলের বক্স — কোকো পাউডারে মাখানো, মুখে দিলেই গলে যায়।",
  },
  {
    id: "hot-chocolate-mix",
    name: "হট চকোলেট মিক্স",
    tag: "২৫০ গ্রাম প্যাক",
    price: 380,
    mrp: null,
    image: "/images/cat-milk.jpg",
    description:
      "শীতের সন্ধ্যায় গরম গরম এক কাপ চকোলেট — খাঁটি কোকো দিয়ে তৈরি আমাদের সিগনেচার হট চকোলেট মিক্স।",
  },
  {
    id: "choco-almonds",
    name: "চকোলেট কভার্ড বাদাম",
    tag: "১৫০ গ্রাম প্যাক",
    price: 420,
    mrp: 480,
    image: "/images/cat-festive.jpg",
    description:
      "মচমচে কাঠবাদাম খাঁটি মিল্ক চকোলেটে মোড়ানো — হালকা নাশতা বা উপহার, দুটোর জন্যই উপযুক্ত।",
  },
  {
    id: "mini-bar-set",
    name: "মিনি চকোলেট বার সেট",
    tag: "৬ পিস সেট",
    price: 350,
    mrp: null,
    image: "/images/gift-box.jpg",
    description:
      "৬টি ভিন্ন ফ্লেভারের মিনি চকোলেট বারের সেট — অফিসে বা ব্যাগে রাখার জন্য ছোট, সহজে বহনযোগ্য।",
  },
];

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
