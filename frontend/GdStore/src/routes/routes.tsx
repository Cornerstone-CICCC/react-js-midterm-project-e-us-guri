import { BrowserRouter, Routes, Route } from "react-router-dom";

//import Home from "../pages/Home";
import LoginRegister from "../pages/Login-Register";
//import BrowseCleats from "../pages/BrowseCleats";
//import Admin from "../pages/Admin";
//import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

// Seus componentes globais
import Header from "../components/Header";
import Footer from "../components/Footer";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      
      <main className="min-h-screen">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/shop" element={<BrowseCleats />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}