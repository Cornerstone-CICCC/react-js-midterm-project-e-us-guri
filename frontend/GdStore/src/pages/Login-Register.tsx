import React, { useState } from 'react';
import { FaInstagram, FaWhatsapp, FaFacebookF, FaBolt } from "react-icons/fa";
import { MdEmail, MdLock, MdOutlinePhonelinkSetup } from "react-icons/md";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-background text-on-background transition-colors duration-500">
      
      <section className="relative w-full md:w-1/2 h-64 md:h-screen">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB10qk4BAefzfipr6aJS0IkGCCWIXMnLw1zymr1YKEK6GG2zQL9PW79dfJUWpfv3BaI5xjLn3beCpt3462CsR7WbOPH9EYU2IpHD_jAh0FCE4KhvFYKs5HDGN4D2j00nAY3SXi_7hmE-_lfrefBzRPH8U3JG9yHCX1wIQpiulfqxKkqi66t4CMTniDtQNhjPwAVhY1RR_p39iRnzJbVqZ-FGxR9FG3BVkNaVn_wNOnFP49GSs6S2brzzDqih-0pD3xiKTtVr-XrEJyt" 
          className="w-full h-full object-cover"
          alt="Soccer Performance"
        />

        <div className="absolute inset-0 bg-black/40 dark:bg-surface-container-lowest/60 flex flex-col justify-end p-10">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-none text-white drop-shadow-lg">
            ENGINEERED <br/>FOR SPEED
          </h1>
        </div>
      </section>

      <section className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-surface-container-low transition-colors duration-500">
        
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black italic text-primary-container dark:text-primary tracking-tighter transition-colors">
                GD STORE
            </h2>
            <p className="text-on-surface-variant opacity-80">Unlock your potential. Join the elite.</p>
          </div>

          <div className="bg-surface-container-highest/20 dark:bg-surface-container-highest/40 border border-outline-variant/30 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
            <div className="flex border-b border-outline-variant/30">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 font-bold uppercase text-xs tracking-widest transition-all ${isLogin ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 font-bold uppercase text-xs tracking-widest transition-all ${!isLogin ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Register
              </button>
            </div>

            {/* FORM: */}
            <form className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-outline ml-1">Email Address</label>
                <div className="relative group">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary-container dark:group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    placeholder="athlete@gdstore.com" 
                    className="w-full bg-surface-container border-b-2 border-outline-variant focus:border-primary-container dark:focus:border-primary py-3 pl-10 text-on-surface outline-none transition-all placeholder:text-outline/50" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-outline ml-1">Password</label>
                <div className="relative group">
                  <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary-container dark:group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-surface-container border-b-2 border-outline-variant focus:border-primary-container dark:focus:border-primary py-3 pl-10 text-on-surface outline-none transition-all placeholder:text-outline/50" 
                  />
                </div>
              </div>

              <button className="w-full bg-primary-container dark:bg-primary text-white dark:text-on-primary py-4 rounded-lg font-black uppercase italic tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:brightness-110">
                Access Vault <FaBolt size={16} />
              </button>
            </form>
          </div>

          <div className="mt-10 text-center">
            <span className="text-[10px] uppercase font-bold text-outline tracking-[0.2em]">Social Access</span>
            <div className="flex justify-center gap-4 mt-4">
               <button className="p-4 rounded-full border border-outline-variant/30 hover:bg-primary-container hover:text-white transition-all text-on-surface-variant">
                  <FaInstagram size={20} />
               </button>
               <button className="p-4 rounded-full border border-outline-variant/30 hover:bg-primary-container hover:text-white transition-all text-on-surface-variant">
                  <FaWhatsapp size={20} />
               </button>
               <button className="p-4 rounded-full border border-outline-variant/30 hover:bg-primary-container hover:text-white transition-all text-on-surface-variant">
                  <FaFacebookF size={20} />
               </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;