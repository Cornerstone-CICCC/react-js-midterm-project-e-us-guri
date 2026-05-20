import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom"; // IMPORTADO O LINK AQUI
import { useAuth } from "../contexts/auth/AuthContext";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      if (isLogin) {
        const { login: doLogin } = { login };
        await doLogin(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setSubmitting(false);
    }
  };

  const { user } = useAuth();
  if (user) {
    if (user.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/shop", { replace: true });
    }
    return null;
  }

  const switchTab = (login: boolean) => {
    setIsLogin(login);
    setErrors({});
  };

  const errorClass = "text-red-400 text-xs mt-1 ml-1";

  return (
    <main className="flex flex-col md:flex-row h-screen overflow-hidden bg-background text-on-background selection:bg-primary-container selection:text-white">
      
      {/* Hero Image Section */}
      <section className="relative hidden md:block md:w-1/2 md:h-full overflow-hidden">
        
        {/* BACK TO HOME BUTTON: */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-black/40 hover:bg-black/70 border border-white/10 text-white px-4 py-2 rounded-full font-label-bold text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Home
        </Link>

        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10 hidden md:block"></div>
        <img
          alt="High-performance soccer match"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB10qk4BAefzfipr6aJS0IkGCCWIXMnLw1zymr1YKEK6GG2zQL9PW79dfJUWpfv3BaI5xjLn3beCpt3462CsR7WbOPH9EYU2IpHD_jAh0FCE4KhvFYKs5HDGN4D2j00nAY3SXi_7hmE-_lfrefBzRPH8U3JG9yHCX1wIQpiulfqxKkqi66t4CMTniDtQNhjPwAVhY1RR_p39iRnzJbVqZ-FGxR9FG3BVkNaVn_wNOnFP49GSs6S2brzzDqih-0pD3xiKTtVr-XrEJyt"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-margin-mobile md:p-margin-desktop bg-black/30">
          <div className="mb-gutter">
            <span className="inline-block bg-primary-container text-on-primary-container px-4 py-1 slanted-badge font-label-bold text-sm font-bold uppercase italic mb-4">
              Elite Performance
            </span>
            <h1 className="font-headline-xl text-3xl md:text-7xl font-extrabold text-white italic uppercase tracking-tighter text-shadow-hero leading-tight">
              ENGINEERED <br />
              FOR SPEED
            </h1>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full md:w-1/2 flex-1 md:flex-none flex flex-col items-center justify-center bg-surface-container-low p-margin-mobile md:p-margin-desktop relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-container/5 rounded-full blur-[120px] -ml-48 -mb-48"></div>

        <div className="w-full max-w-md z-30">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="font-headline-xl text-primary-container tracking-tighter italic text-5xl font-extrabold mb-2">
              GD STORE
            </div>
            <p className="font-body-md text-on-surface-variant text-center">
              Unlock your maximum potential. Join the elite.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-surface-container-highest/30 backdrop-blur-sm border border-outline-variant/30 rounded-xl p-2 shadow-2xl">
            {/* Tabs */}
            <div className="flex mb-8">
              <button
                onClick={() => switchTab(true)}
                className={`flex-1 py-4 font-label-bold text-sm font-bold uppercase border-b-2 tracking-widest transition-colors cursor-pointer ${
                  isLogin
                    ? "border-primary-container text-white"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => switchTab(false)}
                className={`flex-1 py-4 font-label-bold text-sm font-bold uppercase border-b-2 tracking-widest transition-colors cursor-pointer ${
                  !isLogin
                    ? "border-primary-container text-white"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Register
              </button>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="mx-gutter mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm text-center">
                {errors.general}
              </div>
            )}

            {/* Form */}
            <form
              className="px-gutter pb-gutter space-y-6"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="space-y-1">
                <label
                  className="font-label-bold text-sm font-bold text-on-surface-variant uppercase ml-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary-container transition-colors">
                    mail
                  </span>
                  <input
                    className={`w-full bg-surface-container-low border-b-2 ${errors.email ? "border-red-500" : "border-outline-variant"} focus:border-primary-container focus:ring-0 text-on-surface py-4 pl-12 pr-4 transition-all outline-none font-body-md`}
                    id="email"
                    name="email"
                    placeholder="athlete@gdstore.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label
                    className="font-label-bold text-sm font-bold text-on-surface-variant uppercase"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  {isLogin && (
                    <a
                      className="text-xs font-label-bold font-bold text-primary-container hover:underline uppercase italic"
                      href="#"
                    >
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary-container transition-colors">
                    lock
                  </span>
                  <input
                    className={`w-full bg-surface-container-low border-b-2 ${errors.password ? "border-red-500" : "border-outline-variant"} focus:border-primary-container focus:ring-0 text-on-surface py-4 pl-12 pr-4 transition-all outline-none font-body-md`}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && (
                  <p className={errorClass}>{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-1">
                  <label
                    className="font-label-bold text-sm font-bold text-on-surface-variant uppercase ml-1"
                    htmlFor="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary-container transition-colors">
                      lock
                    </span>
                    <input
                      className={`w-full bg-surface-container-low border-b-2 ${errors.confirmPassword ? "border-red-500" : "border-outline-variant"} focus:border-primary-container focus:ring-0 text-on-surface py-4 pl-12 pr-4 transition-all outline-none font-body-md`}
                      id="confirm-password"
                      name="confirm-password"
                      placeholder="••••••••"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className={errorClass}>{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="flex items-center space-x-3 py-2">
                  <input
                    className="w-5 h-5 rounded border-outline-variant bg-surface-container text-primary-container focus:ring-primary-container/20"
                    id="remember"
                    type="checkbox"
                  />
                  <label
                    className="font-body-md text-on-surface-variant text-sm"
                    htmlFor="remember"
                  >
                    Stay signed in for faster checkout
                  </label>
                </div>
              )}

              <button
                className="w-full bg-primary-container text-on-primary-container py-5 rounded font-label-bold text-sm font-bold uppercase italic tracking-widest racing-button-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Loading..."
                  : isLogin
                    ? "Access Vault"
                    : "Create Account"}
                {!submitting && (
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bolt
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-5 md:bottom-16 w-full px-5 flex justify-center">
          <nav className="flex gap-gutter font-label-bold text-[10px] text-outline-variant uppercase tracking-widest">
            <a
              className="hover:text-primary-container transition-colors"
              href="#"
            >
              Privacy
            </a>
            <a
              className="hover:text-primary-container transition-colors"
              href="#"
            >
              Terms
            </a>
            <a
              className="hover:text-primary-container transition-colors"
              href="#"
            >
              Support
            </a>
          </nav>
        </footer>
      </section>
    </main>
  );
};

export default LoginPage;