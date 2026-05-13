import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/Login-Register";
import { ThemeProvider } from "./contexts/theme/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Header />

      {/* Renderizando a página de login diretamente */}
      <LoginPage />

      <Footer />
    </ThemeProvider>
  );
}

export default App;