import "./App.css";
import { AppRouter } from "./routes/routes";
import { ThemeProvider } from "./contexts/theme/ThemeContext";
import { CartContextProvider } from "./contexts/cart/CartContextProvider";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <CartContextProvider>
            <AppRouter />
          </CartContextProvider>
        </AuthProvider>
      </ThemeProvider>
      <Toaster position="top-center" />
    </>
  );
}

export default App;