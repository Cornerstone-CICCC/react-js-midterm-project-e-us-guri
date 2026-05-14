import "./App.css";
import { AppRouter } from "./routes/routes";
import { ThemeProvider } from "./contexts/theme/ThemeContext";
import { CartContextProvider } from "./contexts/cart/CartContextProvider";

function App() {
  return (
    <ThemeProvider>
      <CartContextProvider>
        <AppRouter />
      </CartContextProvider>
    </ThemeProvider>
  );
}

export default App;