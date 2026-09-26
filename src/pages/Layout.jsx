import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CartDrawer from "../components/CartDrawer.jsx";
import AuthModal from "../components/AuthModal.jsx";
import Toast from "../components/Toast.jsx";
import FloatingCartBadge from "../components/FloatingCartBadge.jsx";
import SupportBubble from "../components/SupportBubble.jsx";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-cream-50 font-body">
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <AuthModal />
      <Toast />
      <FloatingCartBadge />
      <SupportBubble />
    </div>
  );
}
