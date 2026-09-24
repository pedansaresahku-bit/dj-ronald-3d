import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Music, Camera, User, FileText, Sparkles } from 'lucide-react';

export default function Navbar({ isAudioActive, onToggleAudio, currentRoute = '/', onNavigate, onOpenEPKModal }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', route: '/', icon: Sparkles },
    { name: 'About Me', href: '#about-me', route: '/', icon: User },
    { name: 'Press Kit Galery', href: '/galery', route: '/galery', icon: Camera, isPage: true },
    { name: 'Sounds of Me', href: '/sounds', route: '/sounds', icon: Music, isPage: true },
    { name: 'Kalender', href: '#kalender', route: '/', icon: Calendar },
    { name: 'EPK Rider', href: '#epk-rider', route: '/', icon: FileText, highlight: true, isModal: true }
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (link.isModal && onOpenEPKModal) {
      onOpenEPKModal();
      return;
    }

    if (link.isPage) {
      if (onNavigate) {
        onNavigate(link.route);
      }
      return;
    }

    // Hash navigation for Home sections (#home, #about-me, #kalender)
    if (currentRoute !== '/') {
      if (onNavigate) {
        onNavigate('/');
        // Small timeout to allow DOM to render homepage before scrolling
        setTimeout(() => {
          const targetId = link.href.replace('#', '');
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      const targetId = link.href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 flex justify-center pointer-events-none">
      <div className="w-[92%] max-w-[1560px] mx-auto flex items-center justify-between p-2 sm:px-5 sm:py-2.5 rounded-full bg-[#141414]/90 backdrop-blur-2xl border border-[#444444] shadow-2xl pointer-events-auto transition-all">

        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            if (currentRoute !== '/' && onNavigate) {
              onNavigate('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2.5 group cursor-pointer py-0.5"
        >
          <img
            src="/asset/icon.png"
            alt="Ronald 3D Logo"
            className="h-8 sm:h-9 w-auto max-w-[40px] object-contain drop-shadow-[0_0_12px_rgba(226,232,0,0.8)] group-hover:scale-105 transition-transform"
          />
          <span className="font-display font-black text-base sm:text-lg tracking-wider text-[#FFFFFF]">
            RONALD <span className="text-[#E2E800] drop-shadow-[0_0_14px_rgba(226,232,0,0.9)]">3D</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const isCurrentActive = link.isPage && currentRoute === link.route;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${link.highlight
                  ? 'bg-[#E2E800] text-[#141414] font-black shadow-lg shadow-[#E2E800]/30 hover:bg-[#f2f716] hover:scale-105'
                  : isCurrentActive
                    ? 'bg-[#E2E800] text-[#141414] font-black shadow-md'
                    : 'text-[#D6D6D6] hover:text-[#E2E800] hover:bg-[#242424]'
                  }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions (Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-[#1e1e1e] border border-[#444444] text-white hover:border-[#E2E800] transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-16 left-4 right-4 z-50 p-4 rounded-3xl bg-[#1e1e1e] border border-[#444444] shadow-2xl backdrop-blur-2xl pointer-events-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isCurrentActive = link.isPage && currentRoute === link.route;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleLinkClick(e, link);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${link.highlight
                      ? 'bg-[#E2E800] text-[#141414] font-black shadow-lg shadow-[#E2E800]/20'
                      : isCurrentActive
                        ? 'bg-[#E2E800] text-[#141414] font-black shadow-md'
                        : 'text-[#D6D6D6] hover:text-[#E2E800] hover:bg-[#242424]'
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${isCurrentActive ? 'text-[#141414]' : 'text-[#E2E800]'}`} />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
