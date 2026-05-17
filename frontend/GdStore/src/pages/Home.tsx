import { Link } from "react-router-dom";
import {
  MdArrowForward,
  MdSportsSoccer,
  MdRocketLaunch,
  MdShield,
  MdElectricBolt,
} from "react-icons/md";

const TerrainCard = ({
  title,
  subtitle,
  img,
  buttonText,
  to,
}: {
  title: string;
  subtitle: string;
  img: string;
  buttonText: string;
  to: string;
}) => (
  <Link
    to={to}
    className="relative h-[500px] overflow-hidden group cursor-pointer border-r border-outline-variant/10 block"
  >
    <img
      src={img}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
    />
    <div className="absolute inset-0 bg-primary-container/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-black/40 group-hover:bg-black/10 transition-all">
      <h3 className="font-display-lg italic uppercase text-white group-hover:scale-110 transition-transform text-4xl">
        {title}
      </h3>
      <p className="text-white font-label-bold mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
        {subtitle}
      </p>
      <span className="mt-8 border border-white text-white px-6 py-2 font-label-bold uppercase italic opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
        {buttonText}
      </span>
    </div>
  </Link>
);

const BrandLogo = ({ Icon, name }: { Icon: React.ElementType; name: string }) => (
  <div className="flex flex-col items-center group cursor-pointer">
    <Icon className="text-6xl text-on-surface-variant group-hover:text-primary-container transition-colors mb-2" />
    <span className="font-label-bold uppercase tracking-widest text-xs">
      {name}
    </span>
  </div>
);

export default function Home() {
  return (
    <main className="bg-background text-on-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] flex items-end overflow-hidden">
        <img
          alt="Fuel Your Speed Hero"
          className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
          src="/images/banner.png"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop pb-24 max-w-5xl">
          <div className="bg-primary-container inline-block px-4 py-1 mb-4 -skew-x-[15deg]">
            <span className="block font-label-bold text-on-primary-container italic uppercase tracking-widest skew-x-[15deg]">
              Elite Performance
            </span>
          </div>
          <h1 className="font-display-lg text-[64px] md:text-display-lg italic uppercase text-white leading-tight mb-8">
            Fuel Your <br />
            <span className="text-primary-container">Speed.</span>
          </h1>
          <p className="font-body-lg text-white/70 max-w-xl mb-10">
            Engineered for the fastest players on the pitch. Experience the
            perfect fusion of technical mesh, carbon fiber stability, and
            explosive traction.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="bg-primary-container text-on-primary-container font-label-bold px-10 py-4 uppercase italic hover:scale-105 transition-all shadow-[0_0_20px_rgba(230,30,42,0.4)] active:scale-95 cursor-pointer"
            >
              Shop Now
            </Link>
            <button className="border-2 border-white text-white font-label-bold px-10 py-4 uppercase italic hover:bg-white hover:text-black transition-all active:scale-95 cursor-pointer">
              Watch Film
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals: Bento Grid */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-xl text-primary-container italic uppercase text-4xl">
              New Arrivals
            </h2>
            <p className="text-on-surface-variant mt-2">
              The latest drops from the world's leading labs.
            </p>
          </div>
          <Link
            to="/shop"
            className="font-label-bold text-primary flex items-center gap-2 group cursor-pointer"
          >
            VIEW ALL{" "}
            <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[700px]">
          {/* Main Card */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl bg-surface-container-high border-t border-l border-white/5 shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUk2gGQyOcmNiG7qVBXyAPjpEXQlMz5JI_Hw6m9MKsSBSD3C1ZZiv9IznUhI6WB6kp01ywFp9ZY-CkCcC_x3GvrzI__FBw7s8Ak6H9_YfRzUNO-StyZthjiwHZ8JqtcLiZy29pFWK0CPM-9Y3A7r9J4b35egwBysC-kw_EHQsPjunIYWa6RzOEBfR7doU3Ok9NOSIezjKfVa6SDrFcEruRk-QIKJxz6USMistnFWR1sgl-ZBYX_NGBwTblfLyZf6kdWF41qIkg6_i7"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Vaporized X-1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="bg-primary-container inline-block px-3 py-1 mb-3 -skew-x-[15deg]">
                <span className="block text-[10px] font-label-bold text-on-primary-container uppercase skew-x-[15deg]">
                  Limited Edition
                </span>
              </div>
              <h3 className="font-headline-lg italic text-white text-3xl">
                VAPORIZED X-1
              </h3>
              <p className="text-white/70 mb-4">
                Unrivaled acceleration for the modern winger.
              </p>
              <p className="font-headline-lg text-primary-container text-2xl">
                $279.99
              </p>
            </div>
          </div>

          {/* Small Card 1 */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-xl bg-surface-container-high border-t border-l border-white/5 shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDavFLpYh7ls7eMCL8H-1yPLNHYLnKnRgNhKrE6o2f12wNqO0L0T47mkD7VriaNGZ-w-Pky5kV4exNqgCDXzkMa39WNiuxVpOI8FE6xB3rMs1l9oqU0taLH7wuHr_gfPWqUED7_67HI7uH1b7apSiij06C_gRDue_ZIWeCqVKsi00MBwdkOdluHEQ-ZUFtNjZLg5agHmc9si87DiRiO-JhIE8I6aQ7HY71nE2alTLTIH7v0tIfcUbNDuqlK7MF7ztYaQ64t9kv0--Uv"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Control Core"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="font-headline-lg text-[24px] italic text-white">
                CONTROL CORE
              </h3>
              <p className="font-label-bold text-primary-container">$199.99</p>
            </div>
          </div>

          {/* Small Card 2 */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-xl bg-surface-container-high border-t border-l border-white/5 shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCooT46Gis9XPWkVOF7YTK5BkyvmFCmjTYBteJqT-Gj-6t1Zh6MEueaDys4W5VZfPfROyThGvCMmm2eskHQRXEhl6-ShWAi4XcekoCg04Cyi4XNqjh4kIKoAQ4aFuamE24E0xv-hX85jTCvm_UzbCD7u4QAM1n6jScPx5XC0OZfBnQ2EMFjtjJjF9rWjbmukNsGFG5Zb0D43LkPYV6VDmOq4cravl_NTG0K-H7ANP3ahYVW78KyRKKHl3QKecj8BrKDKe_PfC0lgYXB"
              alt="Turf Elite"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 p-4 w-full bg-black/70 backdrop-blur-md">
              <h3 className="font-label-bold italic text-white">
                TURF ELITE
              </h3>
              <p className="text-primary-container text-xs font-bold">$129.99</p>
            </div>
          </div>

          {/* Small Card 3 */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-xl bg-surface-container-high border-t border-l border-white/5 shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyEWWLRj4k8AI2doxe6U1ZHgllAy0x1mX1RtqETrtoPXwwcABoWfDq_C8xxgPAcolmlquxXatSxvdYNs1ZxDt6d0kMdLdX52oObv0EXViOteOf97sHIlqq_11SLAiPe8pztGCGBArVqwuREQ_w9db777FLAjiryLTQVjdnskv2Iy8RVe_DhfS5K0b0bRJPSUE8PbeH9i-ONfM8tUGCyYi8c70mgAS5YFPP9kbzce4jXJ8hHRTb9IQP5ayjdZu1xvHwcqid1O7H1hoF"
              alt="Predator SG"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 p-4 w-full bg-black/70 backdrop-blur-md">
              <h3 className="font-label-bold italic text-white">
                PREDATOR SG
              </h3>
              <p className="text-primary-container text-xs font-bold">$249.99</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Surface */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="px-margin-mobile md:px-margin-desktop mb-12 text-center">
          <h2 className="font-display-lg text-4xl md:text-5xl italic uppercase text-on-surface">
            Master the <span className="text-primary-container">Terrain.</span>
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-4">
            Select your weapon based on the pitch conditions. Engineered for
            maximum grip across all surfaces.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <TerrainCard
            title="Firm Ground"
            subtitle="FOR NATURAL GRASS"
            buttonText="Explore"
            to="/category/natural-grass"
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuA65YXpnRPpAEZZGj7xvMhSlmDaRdWS-jgSb24xc8dB14tMcxUmR5EVZaEAfHgT7VIcihX5mRb2FB2Kett1VQCq2ZbdfZsW-8xZJUQJIs3wp5eG1g-wWZAB7SRg3D-Aw3s84UuDynkl4R7L1HW8FjlUc6G0nyDLl4Cz6P1NX1Qf0SUwxePn2iUKEzQRX29FEXa82TMhYLvotLtyHcUaK5HnUYtWUqe0xZNtImtevhsja1FC0U-YfGali55T3rnj3ZdrOz1rbm4eq1er"
          />
          <TerrainCard
            title="Futsal"
            subtitle="FOR FLAT SOLE"
            buttonText="Explore"
            to="/category/futsal"
            img="https://i.pinimg.com/736x/bf/61/bd/bf61bd125649fbdb1d0aeaaac6b23c93.jpg"
          />
          <TerrainCard
            title="Turf"
            subtitle="FOR ARTIFICIAL GRASS"
            buttonText="Explore"
            to="/category/artificial-grass"
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuDAMqRRSEEZZ_la1gYwjGCLuWVsAllSSahQvmPf6I3dRJitRJwsQ3g-t4JxPfTwI9q3JrA3vKRcggZJQ-G5hFfwZEVX8viv_DlYFerzzWjr2LBvCgU7oCHcKcxhC6pE8-5yx7pyxGIv8k7CHxiUsjOKweSZeG59XdXXjs8A6yCgoW7AuR6xww614p-MiQAN9oQjmgaFVnuoTJT2Ng0lA_t8hyLxTTkixhpmSIrH3UBNKHXzco560bwfBqVBqswAXf24lCZ9kYe3525j"
          />
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background text-center">
        <h2 className="font-headline-xl text-on-surface italic uppercase mb-12 text-4xl">
          Featured <span className="text-primary-container">Brands</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
          <BrandLogo Icon={MdSportsSoccer} name="Veloce" />
          <BrandLogo Icon={MdRocketLaunch} name="Aero-Core" />
          <BrandLogo Icon={MdShield} name="Titan-SG" />
          <BrandLogo Icon={MdElectricBolt} name="Volt-Strike" />
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="mb-section-gap mx-margin-mobile md:mx-margin-desktop p-12 bg-surface-container-highest rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 blur-[100px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="font-headline-xl text-on-surface italic uppercase leading-none text-4xl">
              Stay Ahead of <br />
              the <span className="text-primary-container">Competition.</span>
            </h2>
            <p className="text-on-surface-variant mt-4 font-body-lg">
              Get notified about limited drops, pro-athlete collabs, and secret
              sales before anyone else.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col gap-4">
            <div className="flex bg-surface-container-low border border-outline-variant/30 rounded-full p-1 w-full md:w-[400px]">
              <input
                className="bg-transparent border-none focus:ring-0 text-on-surface px-6 w-full"
                placeholder="Your email address"
                type="email"
              />
              <button className="bg-primary-container text-on-primary-container font-label-bold px-6 py-3 rounded-full uppercase italic hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                JOIN
              </button>
            </div>
            <p className="text-[10px] text-on-surface-variant/50 px-4 uppercase tracking-tighter">
              By subscribing you agree to our terms of service.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
