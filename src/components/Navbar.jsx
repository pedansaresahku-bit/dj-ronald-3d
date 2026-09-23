import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Calendar, Music, Camera, User, FileText, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function Navbar({ isAudioActive, onToggleAudio, currentRoute = '/', onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', route: '/', icon: Sparkles },
    { name: 'About Me', href: '#about-me', route: '/', icon: User },
    { name: 'Press Kit Galery', href: '#stage-gallery', route: '/galery', icon: Camera },
    { name: 'Sounds of Me', href: '#sounds-of-me', route: '/', icon: Music },
    { name: 'Kalender', href: '#kalender', route: '/', icon: Calendar },
    { name: 'EPK Rider', href: '#epk-rider', route: '/', icon: FileText, highlight: true }
  ];

  const handleLinkClick = (e, link) => {
    if (onNavigate) {
      if (link.name === 'Press Kit Galery' && currentRoute === '/galery') {
        // already on /galery
        return;
      }
      if (link.name === 'Press Kit Galery') {
        onNavigate('/galery');
      } else if (currentRoute === '/galery') {
        onNavigate('/');
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 flex justify-center pointer-events-none">
      <div className="w-[92%] max-w-[1560px] mx-auto flex items-center justify-between p-2 sm:px-5 sm:py-2.5 rounded-full bg-obsidian-surface/85 backdrop-blur-2xl border border-white/10 shadow-2xl pointer-events-auto transition-all">
        
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => {
            if (currentRoute === '/galery' && onNavigate) {
              onNavigate('/');
            }
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <img
              src="/asset/3d-logo.png"
              alt="Ronald 3D Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,240,255,0.6)] group-hover:scale-105 transition-transform"
            />
          </div>
          <span className="font-display font-black text-base sm:text-lg tracking-wider text-white">
            RONALD <span className="text-cyan drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]">3D</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={currentRoute === '/galery' ? `/${link.href}` : link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                link.highlight
                  ? 'bg-cyan/15 text-cyan border border-cyan/30 hover:bg-cyan hover:text-black hover:shadow-[0_0_18px_rgba(0,240,255,0.5)]'
                  : currentRoute === '/galery' && link.name === 'Press Kit Galery'
                  ? 'bg-cyan text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions (Sound Toggle & Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Master Toggle */}
          <button
            onClick={onToggleAudio}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
              isAudioActive
                ? 'bg-cyan/20 border-cyan text-cyan shadow-[0_0_14px_rgba(0,240,255,0.4)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title={isAudioActive ? 'Mute 3D Audio Experience' : 'Activate 3D Audio Experience'}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan" />
                <span className="absolute -inset-1 rounded-full border border-cyan/40 animate-ping opacity-75" />
              </>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
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
            className="lg:hidden absolute top-16 left-4 right-4 z-50 p-4 rounded-2xl bg-obsidian-surface/98 border border-white/15 shadow-2xl backdrop-blur-2xl pointer-events-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={currentRoute === '/galery' ? `/${link.href}` : link.href}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleLinkClick(e, link);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      link.highlight
                        ? 'bg-gradient-to-r from-cyan to-blue-500 text-black shadow-lg shadow-cyan/20'
                        : 'text-gray-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-cyan" />
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
