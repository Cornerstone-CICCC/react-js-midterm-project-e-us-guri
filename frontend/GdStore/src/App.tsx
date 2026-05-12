import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />

      <main className="min-h-screen flex items-center justify-center bg-background text-on-background">
        <h1 className="text-5xl font-black italic">
          Welcome to <span className="text-primary-container">GD STORE</span>
        </h1>
      </main>

      <Footer />
    </>
  );
}

export default App;