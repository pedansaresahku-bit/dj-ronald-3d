import React from 'react';
import {
  MessageCircle,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Music2,
  Disc3,
  ArrowUp,
  Radio,
  ExternalLink,
  Code
} from 'lucide-react';

export default function Footer({ onNavigate, onOpenCMS }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (route, sectionId) => {
    if (route) {
      onNavigate(route);
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const waBookingUrl = "https://wa.me/6281907779998?text=Halo%20Management%20Ronald%203D%2C%20saya%20tertarik%20untuk%20booking%20event%20performa.";

  return (
    <>
      <footer className="border-t border-[#333333] bg-[#0d0d0d] text-white pt-16 pb-12 relative z-20 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-[450px] h-[150px] bg-[#E2E800]/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="w-[92%] max-w-[1560px] mx-auto relative z-10">
          
          {/* Main 3-Column Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-14 border-b border-[#262626]">
            
            {/* Column 1: Brand & Tagline & Socials (5 Cols) */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                {/* Brand Logo & Title */}
                <div className="flex items-center gap-3.5 mb-4 group cursor-pointer" onClick={() => handleNavClick('/')}>
                  <div className="w-10 h-10 rounded-full border border-[#E2E800] bg-black/60 flex items-center justify-center shadow-[0_0_15px_rgba(226,232,0,0.25)] group-hover:scale-105 transition-transform p-1.5">
                    <img
                      src="/asset/3d-logo.png"
                      alt="Ronald 3D Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-display font-black text-2xl tracking-wider text-white">
                    RONALD <span className="text-[#E2E800]">3D</span>
                  </h3>
                </div>

                {/* Tagline */}
                <p className="text-[#9e9e9e] text-xs sm:text-sm leading-relaxed max-w-md font-normal mb-8">
                  Indonesian Breakbeat & Jungle Dutch Pioneer. Crafting unyielding bass frequencies, stadium anthems, and peak-time rave euphoria worldwide.
                </p>
              </div>

              {/* Social Media Circular Buttons */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <a
                  href="https://open.spotify.com/artist/3HkeKnw42As9Ag8BluG93o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#333333] hover:border-[#1db954] text-[#a0a0a0] hover:text-[#1db954] flex items-center justify-center hover:scale-110 transition-all shadow-md"
                  title="Spotify"
                >
                  <Disc3 className="w-4 h-4" />
                </a>

                <a
                  href="https://www.tiktok.com/@ronald.3d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#333333] hover:border-[#E2E800] text-[#a0a0a0] hover:text-[#E2E800] flex items-center justify-center hover:scale-110 transition-all shadow-md"
                  title="TikTok"
                >
                  <Music2 className="w-4 h-4" />
                </a>

                <a
                  href="https://www.instagram.com/ronald_3d/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#333333] hover:border-[#e1306c] text-[#a0a0a0] hover:text-[#e1306c] flex items-center justify-center hover:scale-110 transition-all shadow-md"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href="https://soundcloud.com/ronald3d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#333333] hover:border-[#ff5500] text-[#a0a0a0] hover:text-[#ff5500] flex items-center justify-center hover:scale-110 transition-all shadow-md"
                  title="SoundCloud"
                >
                  <Radio className="w-4 h-4" />
                </a>

                <a
                  href="https://www.youtube.com/@Ronald3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#333333] hover:border-[#ff0000] text-[#a0a0a0] hover:text-[#ff0000] flex items-center justify-center hover:scale-110 transition-all shadow-md"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links (3 Cols) */}
            <div className="md:col-span-3">
              <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-[#E2E800] mb-5">
                NAVIGATION
              </h4>
              <ul className="space-y-3.5 text-xs font-mono font-medium text-[#b0b0b0]">
                <li>
                  <button
                    onClick={() => handleNavClick('/')}
                    className="hover:text-[#E2E800] hover:translate-x-1 transition-all text-left uppercase"
                  >
                    BERANDA
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('/sounds')}
                    className="hover:text-[#E2E800] hover:translate-x-1 transition-all text-left uppercase"
                  >
                    SOUNDS OF ME (STREAMING)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('/galery')}
                    className="hover:text-[#E2E800] hover:translate-x-1 transition-all text-left uppercase"
                  >
                    STAGE GALLERY (PRESS KIT)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('/', 'sounds-of-me')}
                    className="hover:text-[#E2E800] hover:translate-x-1 transition-all text-left uppercase"
                  >
                    DISCOGRAPHY RELEASES
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('/', 'event-calendar')}
                    className="hover:text-[#E2E800] hover:translate-x-1 transition-all text-left uppercase"
                  >
                    EVENT CALENDAR
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Direct Management & Contact (4 Cols) */}
            <div className="md:col-span-4">
              <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-[#E2E800] mb-5">
                DIRECT MANAGEMENT
              </h4>
              
              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-[#777777] uppercase block tracking-wider">
                    DJ MANAGER
                  </span>
                  <span className="text-sm font-bold text-white tracking-wide">
                    Ronald 3D Official Management
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono text-[#cccccc]">
                  <a
                    href={waBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-[#25D366] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>+62 819-0777-9998</span>
                  </a>

                  <a
                    href="mailto:booking@ronald3d.com"
                    className="flex items-center gap-2.5 hover:text-[#E2E800] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#E2E800]" />
                    <span>booking@ronald3d.com</span>
                  </a>

                  <a
                    href="https://www.instagram.com/ronald_3d/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-[#e1306c] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />
                    <span>DM IG: @ronald_3d</span>
                  </a>
                </div>
              </div>

              {/* Big WhatsApp CTA Button */}
              <a
                href={waBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0a2012] font-display font-black text-xs uppercase tracking-wider shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-[#0a2012] text-[#0a2012]" />
                <span>HUBUNGI KAMI (WA)</span>
              </a>
            </div>

          </div>

          {/* Bottom Copyright, Back to Top & KAKODETA.ID Watermark */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-xs font-mono">
            
            {/* Left: Copyright & CMS Shortcut */}
            <div className="flex items-center gap-2 text-[#737373] text-center md:text-left flex-wrap justify-center">
              <span>&copy; 2026 RONALD 3D. ALL RIGHTS RESERVED.</span>
              <span className="hidden sm:inline">&bull;</span>
              <button
                onClick={onOpenCMS}
                className="hover:text-[#E2E800] underline underline-offset-4 decoration-white/20 transition-colors uppercase"
                title="Management Access (Shortcut: Alt + A)"
              >
                MANAGEMENT CMS LOGIN (ALT + A)
              </button>
            </div>

            {/* Middle: Back to Top */}
            <button
              onClick={scrollToTop}
              className="px-4 py-1.5 rounded-full bg-[#181818] hover:bg-[#282828] border border-[#333333] hover:border-[#E2E800] text-[#a3a3a3] hover:text-[#E2E800] flex items-center gap-1.5 text-[11px] font-mono transition-all group"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Right: KAKODETA.ID Official Developer Watermark */}
            <div className="flex items-center">
              <a
                href="https://kakodeta.id"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#333333] hover:border-[#E2E800] text-[#999999] hover:text-white flex items-center gap-2 transition-all shadow-md group hover:shadow-[0_0_15px_rgba(226,232,0,0.2)]"
              >
                <Code className="w-3.5 h-3.5 text-[#E2E800] group-hover:rotate-12 transition-transform" />
                <span className="text-[11px] font-mono font-medium">
                  DEVELOPED BY <strong className="font-extrabold text-[#E2E800] tracking-wider">KAKODETA.ID</strong>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              </a>
            </div>

          </div>

        </div>
      </footer>

      {/* Floating Bottom-Right WhatsApp Fast Action Widget */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <a
          href={waBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0a2012] font-display font-black text-xs uppercase tracking-wider shadow-2xl shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all group border-2 border-[#25D366]"
        >
          <div className="relative">
            <MessageCircle className="w-4 h-4 fill-[#0a2012] text-[#0a2012]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E2E800] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E2E800]" />
          </div>
          <span>HUBUNGI KAMI</span>
        </a>
      </div>
    </>
  );
}
