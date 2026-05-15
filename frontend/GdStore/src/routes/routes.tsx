import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginRegister from "../pages/Login-Register";
import BrowseCleats from "../pages/BrowseCleats";
import ProductDetail from "../pages/Products/ProductDetail";
import Cart from "../pages/Products/Cart";
import AdminDashboard from "../pages/Admin";
import NotFound from "../pages/NotFound";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/shop" element={<BrowseCleats />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/products/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
    </BrowserRouter>
  );
}