import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon } from "lucide-react";
import Layout from "./Layout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const TABS = ["আমার তথ্য", "অর্ডার হিস্ট্রি", "আমার উইশলিস্ট"];

const FIELDS = [
  { key: "name", label: "নাম", placeholder: "আপনার নাম" },
  { key: "dob", label: "জন্ম তারিখ", placeholder: "দিন/মাস/বছর" },
  { key: "gender", label: "লিঙ্গ", placeholder: "আপনার লিঙ্গ" },
  { key: "email", label: "ইমেইল", placeholder: "আপনার ইমেইল (যদি থাকে)" },
  { key: "phone", label: "মোবাইল নাম্বার", placeholder: "মোবাইল নাম্বার", readOnly: true },
  { key: "altPhone", label: "বিকল্প মোবাইল নাম্বার", placeholder: "বিকল্প মোবাইল নাম্বার" },
  { key: "address", label: "ঠিকানা", placeholder: "আপনার ঠিকানা" },
  { key: "city", label: "শহর", placeholder: "আপনার শহর" },
  { key: "country", label: "দেশ", placeholder: "দেশ" },
];

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(user ?? {});

  if (!user) {
    return (
      <Layout>
        <div className="px-6 py-20 text-center">
          <p className="font-body text-cocoa-950">প্রোফাইল দেখতে হলে আগে লগইন করুন।</p>
          <Link to="/" className="mt-4 inline-block font-body text-gold-600 underline">
            হোমপেজে ফিরে যান
          </Link>
        </div>
      </Layout>
    );
  }

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleEditToggle = () => {
    if (isEditing) updateProfile(form);
    setIsEditing((v) => !v);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout>
      <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
        <div className="relative mb-10 text-center">
          <h1 className="font-display text-3xl text-cocoa-950">আমার প্রোফাইল</h1>
          <p className="mt-1 font-body text-sm text-cocoa-950/60">আপনার অ্যাকাউন্টে স্বাগতম</p>
          <Link
            to="/"
            className="absolute right-0 top-0 rounded-full border border-cocoa-950/15 px-4 py-2 font-body text-sm text-cocoa-950 hover:bg-cream-100"
          >
            কেনাকাটায় ফিরুন
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-[220px_1fr]">
          <div className="space-y-2">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`w-full rounded-xl px-4 py-3 text-left font-body text-sm font-medium transition-colors ${
                  activeTab === i
                    ? "bg-cocoa-950 text-cream-50"
                    : "border border-cocoa-950/10 bg-white text-cocoa-950 hover:bg-cream-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div>
            {activeTab === 0 && (
              <div>
                <div className="mb-6 flex flex-col items-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-cream-100 text-cocoa-950/30">
                    <UserIcon size={36} />
                  </div>
                  <p className="mt-2 font-body text-sm text-cocoa-950/60">প্রোফাইল</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {FIELDS.map(({ key, label, placeholder, readOnly }) => (
                    <div key={key}>
                      <label className="mb-1 block font-body text-xs text-cocoa-950/60">{label}</label>
                      <input
                        value={form[key] ?? ""}
                        onChange={handleChange(key)}
                        placeholder={placeholder}
                        disabled={!isEditing || readOnly}
                        className="w-full rounded-xl border border-cocoa-950/15 bg-white px-3.5 py-2.5 font-body text-sm text-cocoa-950 outline-none focus:border-gold-500 disabled:bg-cream-100 disabled:text-cocoa-950/70"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleEditToggle}
                    className="rounded-full border border-cocoa-950/20 px-6 py-2.5 font-body text-sm font-semibold text-cocoa-950 transition-colors hover:bg-cocoa-950 hover:text-cream-50"
                  >
                    {isEditing ? "সংরক্ষণ করুন" : "এডিট করুন"}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 rounded-full border border-maroon-600/30 px-6 py-2.5 font-body text-sm font-semibold text-maroon-600 transition-colors hover:bg-maroon-600 hover:text-cream-50"
                  >
                    <LogOut size={15} />
                    লগআউট
                  </button>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="rounded-2xl border border-cocoa-950/10 bg-white p-8 text-center font-body text-sm text-cocoa-950/60">
                এখনো কোনো অর্ডার নেই।
              </div>
            )}

            {activeTab === 2 && (
              <div className="rounded-2xl border border-cocoa-950/10 bg-white p-8 text-center font-body text-sm text-cocoa-950/60">
                আপনার উইশলিস্ট খালি।
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
