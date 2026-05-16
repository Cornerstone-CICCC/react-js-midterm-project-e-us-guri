import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import LoginRegister from "../pages/Login-Register";
import BrowseCleats from "../pages/BrowseCleats";
import ArtificialGrass from "../pages/ArtificalGrass";
import NaturalGrass from "../pages/NaturalGrass";
import Futsal from "../pages/Futsal";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../contexts/auth/AuthContext";

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppLayout() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Header />}
      <main className={hideLayout ? "" : "min-h-screen pb-20 md:pb-0"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/shop" element={<BrowseCleats />} />
          
          <Route path="/category/artificial-grass" element={<ArtificialGrass />} />
          <Route path="/category/natural-grass" element={<NaturalGrass />} />
          <Route path="/category/futsal" element={<Futsal />} />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
      {!hideLayout && <BottomNav />}
    </>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}