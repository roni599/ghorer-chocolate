import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "shokho_user_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1); // 1 = phone entry, 2 = otp entry
  const [phone, setPhone] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore storage errors */
    }
  }, [user]);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const openAuthFlow = () => {
    setStep(1);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setStep(1);
  };

  const sendOtp = (phoneNumber) => {
    // Wire this up to a real SMS/OTP provider — this simulates sending.
    setPhone(phoneNumber);
    setStep(2);
  };

  const confirmOtp = () => {
    // Wire this up to real OTP verification — any complete 6-digit code succeeds here.
    setUser((prev) => prev ?? { phone, name: "", dob: "", gender: "", email: "", altPhone: "", address: "", city: "", country: "Bangladesh" });
    setModalOpen(false);
    setStep(1);
    showToast("লগইন সফল হয়েছে");
  };

  const updateProfile = (updates) => setUser((prev) => ({ ...prev, ...updates }));

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isModalOpen,
        step,
        phone,
        toast,
        openAuthFlow,
        closeModal,
        sendOtp,
        confirmOtp,
        updateProfile,
        logout,
        showToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
