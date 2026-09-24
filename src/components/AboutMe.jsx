import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Flame,
  Sparkles,
  ArrowRight,
  Download,
  Calendar,
  Waves
} from 'lucide-react';

// Word-by-word scroll-driven gradient illumination component
function ScrollWordRevealText({ text, progress, className = "" }) {
  const words = text.split(" ");
  return (
    <p className={`leading-relaxed ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + (1.6 / words.length));
        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const color = useTransform(progress, range, ['#484848', '#FFFFFF']);
  return (
    <span className="relative inline-block mr-1.5 my-0.5">
      <motion.span style={{ opacity, color }} className="transition-colors duration-150">
        {children}
      </motion.span>
    </span>
  );
}

export default function AboutMe({ onOpenEPK }) {
  const containerRef = useRef(null);

  // Track scroll progress specifically for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.35"]
  });

  const bioText = "Pelopor sejati skena Breakbeat dan Electronic Dance Music tanah air. RONALD 3D merevolusi panggung elektronik Indonesia lewat bassline berfrekuensi rendah yang tebal, ritme syncopated 138 BPM berenergi murni, dan performa multi-dimensi 3D yang mempersatukan ratusan ribu ravers di panggung festival dan clubbing Asia.";

  const handleBookingClick = () => {
    if (onOpenEPK) {
      onOpenEPK();
    } else {
      window.open("https://wa.me/6281907779998?text=Halo%20Management%20Ronald%203D%2C%20saya%20tertarik%20untuk%20booking%20event.", "_blank");
    }
  };

  return (
    <section
      id="about-me"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 sm:py-24 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#0a0a0a] text-white select-none border-t border-[#1c1c1c]"
    >
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[380px] bg-[#E2E800]/8 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-white/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">

        {/* 1. TOP HEADER: PILL BADGE & HEADLINE TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#141414] border border-[#E2E800]/50 text-[#E2E800] text-xs font-mono font-black uppercase tracking-wider mb-4 shadow-[0_0_25px_rgba(226,232,0,0.15)]"
          >
            <Flame className="w-4 h-4 text-[#E2E800]" />
            <span>INDONESIAN BREAKBEAT PIONEER & PRODUCER</span>
            <Sparkles className="w-4 h-4 text-[#E2E800]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase"
          >
            ABOUT <span className="bg-gradient-to-r from-white via-[#E2E800] to-white bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(226,232,0,0.4)]">RONALD 3D</span>
          </motion.h2>
        </div>

        {/* 2. SIDE-BY-SIDE MAIN CONTENT (Image on Left, Simple Scroll-Reveal Text on Right) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* SISI KIRI: DJ Cutout Photo (aboutme.png) with Smooth Bottom Fade (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex items-center justify-center relative min-h-[380px] sm:min-h-[460px] md:min-h-[500px]"
          >
            <div className="relative w-full h-full max-w-[360px] sm:max-w-[420px] flex items-center justify-center">
              
              {/* Foreground Image with Smooth Bottom Gradient Fade */}
              <img
                src="/asset/aboutme.png"
                alt="DJ Ronald 3D"
                decoding="async"
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] contrast-105 brightness-105"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 65%, rgba(0,0,0,0.6) 82%, transparent 98%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 65%, rgba(0,0,0,0.6) 82%, transparent 98%)',
                }}
              />

              {/* Ambient Glowing Aura Behind DJ Silhouette */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E2E800]/15 rounded-full blur-3xl pointer-events-none -z-10" />
            </div>
          </motion.div>

          {/* SISI KANAN: Deskripsi Teks Simpel dengan Animasi Scroll Gradasi & Tombol Aksi (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-7 text-center lg:text-left"
          >
            {/* Tagline / Subtitle */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-[#E2E800] text-xs font-mono font-bold tracking-widest uppercase">
              <Waves className="w-4 h-4 text-[#E2E800]" />
              <span>THE SONIC ARCHITECTURE</span>
            </div>

            {/* Simple Description Paragraph with Word-by-Word Scroll Gradient Reveal */}
            <div className="px-1 sm:px-0">
              <ScrollWordRevealText
                text={bioText}
                progress={scrollYProgress}
                className="text-base sm:text-lg md:text-xl font-sans font-medium text-center lg:text-left leading-relaxed"
              />
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              {/* Main Booking Button (Yellow) */}
              <button
                onClick={handleBookingClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E2E800] hover:bg-[#f2f716] text-[#0d0d0d] font-display font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#E2E800]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>INQUIRE ARTIST BOOKING</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Button: Download EPK (.PDF) */}
              <button
                onClick={handleBookingClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#141414] hover:bg-[#1c1c1c] text-white border border-[#333333] hover:border-[#E2E800] font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#E2E800]" />
                <span>DOWNLOAD EPK & RIDER (.PDF)</span>
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
