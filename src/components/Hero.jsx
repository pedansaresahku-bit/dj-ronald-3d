import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Calendar } from 'lucide-react';

export default function Hero({ onExploreSounds, onExploreGallery, onBookTour }) {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 overflow-hidden bg-[#141414]">

      {/* Cinematic Background Video with Vivid Ambient Glow */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-45">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter saturate-[1.2] contrast-125"
        >
          <source src="/asset/hero.mp4" type="video/mp4" />
        </video>
        {/* Luminous Vignette and Soft Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/80 via-[#141414]/50 to-[#141414]" />
      </div>

      {/* Radiant Aura Backlight behind font-tp.png */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[650px] h-[280px] bg-gradient-to-r from-[#E2E800]/25 via-[#444444]/40 to-[#E2E800]/20 blur-3xl rounded-full pointer-events-none z-0 animate-pulse-glow" />

      {/* Hero Content Container */}
      <div className="relative z-10 w-[92%] max-w-4xl mx-auto flex flex-col items-center">

        {/* 3D Brand Logo Typography (font-tp.png) with Chrome Luster Reflection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full max-w-2xl mx-auto mb-8 py-4 group"
        >
          <img
            src="/asset/font-tp.png"
            alt="Ronald 3D Typography"
            decoding="async"
            className="w-full h-auto max-h-[160px] sm:max-h-[200px] md:max-h-[230px] object-contain mx-auto filter drop-shadow-[0_0_35px_rgba(226,232,0,0.65)] group-hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Action Call-To-Action Buttons (Urban Nocturne Theme) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            onClick={onExploreSounds}
            className="px-6 py-3.5 rounded-full bg-[#E2E800] hover:bg-[#f2f716] text-[#141414] font-display font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-[#E2E800]/30 hover:shadow-[#E2E800]/60 hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <Play className="w-4 h-4 fill-[#141414] group-hover:scale-110 transition-transform" />
            <span>Listen Sounds of Me</span>
          </button>

          <button
            onClick={onExploreGallery}
            className="px-6 py-3.5 rounded-full bg-[#1e1e1e] border border-[#444444] text-[#D6D6D6] font-display font-bold text-xs sm:text-sm tracking-wide hover:bg-[#242424] hover:border-[#E2E800] hover:text-[#E2E800] transition-all flex items-center gap-2 backdrop-blur-md shadow-lg hover:scale-105 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#E2E800]" />
            <span>Explore Press Kit Galery</span>
          </button>

          <button
            onClick={onBookTour}
            className="px-6 py-3.5 rounded-full bg-[#242424] border border-[#444444] text-[#FFFFFF] font-display font-bold text-xs sm:text-sm tracking-wide hover:bg-[#E2E800] hover:text-[#141414] hover:border-[#E2E800] transition-all flex items-center gap-2 shadow-lg hover:scale-105 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Tour Schedule & RSVP</span>
          </button>
        </motion.div>

      </div>

      {/* Floating Animated Scroll Down Indicator */}
      <motion.a
        href="#about-me"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 text-[#979797] hover:text-[#E2E800] font-mono text-[10px] font-bold tracking-widest uppercase transition-colors"
      >
        <div className="w-4 h-7 rounded-full border border-[#444444] flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-[#E2E800] shadow-[0_0_8px_#E2E800]"
          />
        </div>
        <span>SCROLL DOWN</span>
      </motion.a>

    </section>
  );
}
