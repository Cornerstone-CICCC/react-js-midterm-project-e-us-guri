const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-16 px-margin-mobile md:px-margin-desktop">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
    <div>
      <div className="font-headline-xl text-primary-container italic tracking-tighter mb-6">
        GD STORE
      </div>

      <p className="text-on-surface-variant text-sm">
        The world's premium destination for elite soccer footwear and
        performance technology.
      </p>
    </div>

    <div>
      <h4 className="font-label-bold text-on-surface uppercase mb-6">
        Shop
      </h4>

      <ul className="space-y-4 text-on-surface-variant text-sm">
        <li><a className="hover:text-primary" href="#">Firm Ground</a></li>
        <li><a className="hover:text-primary" href="#">Soft Ground</a></li>
        <li><a className="hover:text-primary" href="#">Artificial Turf</a></li>
        <li><a className="hover:text-primary" href="#">Indoor Court</a></li>
      </ul>
    </div>

    <div>
      <h4 className="font-label-bold text-on-surface uppercase mb-6">
        Help
      </h4>

      <ul className="space-y-4 text-on-surface-variant text-sm">
        <li><a className="hover:text-primary" href="#">Shipping & Returns</a></li>
        <li><a className="hover:text-primary" href="#">Sizing Guide</a></li>
        <li><a className="hover:text-primary" href="#">Order Tracking</a></li>
        <li><a className="hover:text-primary" href="#">Contact Us</a></li>
      </ul>
    </div>

    <div>
      <h4 className="font-label-bold text-on-surface uppercase mb-6">
        Follow Us
      </h4>

      <div className="flex gap-4">
        <a
          className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center hover:bg-primary-container transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined text-on-surface">
            social_leaderboard
          </span>
        </a>

        <a
          className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center hover:bg-primary-container transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined text-on-surface">
            camera
          </span>
        </a>

        <a
          className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center hover:bg-primary-container transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined text-on-surface">
            video_library
          </span>
        </a>
      </div>
    </div>
  </div>

  <div
    className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-label-bold text-on-surface-variant/40"
  >
    <p>© {new Date().getFullYear()} | GD STORE. ALL RIGHTS RESERVED.</p>

    <div className="flex gap-6">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Use</a>
      <a href="#">Cookies</a>
    </div>
  </div>
</footer>
  )
}

export default Footer