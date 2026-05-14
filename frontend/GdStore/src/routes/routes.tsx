import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginRegister from "../pages/Login-Register";
import BrowseCleats from "../pages/BrowseCleats";
//import Admin from "../pages/Admin";
//import Dashboard from "../pages/Dashboard";
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
    </BrowserRouter>
  );
}