import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Play, Calendar, Music, Radio } from 'lucide-react';

export default function Hero({ onExploreSounds, onExploreGallery, onBookTour }) {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 overflow-hidden">
      
      {/* Cinematic Background Video with Smooth Edge Fade */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-45">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter saturate-[1.25] contrast-105"
        >
          <source src="/asset/hero.mp4" type="video/mp4" />
        </video>
        {/* Obsidian Vignette and Radial Fade */}
        <div className="absolute inset-0 bg-radial-vignette bg-gradient-to-b from-obsidian/60 via-obsidian/30 to-obsidian" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-[92%] max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Animated Headline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono font-semibold tracking-widest uppercase mb-6 shadow-lg shadow-cyan/10"
        >
          <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
          <span>WORLD TOUR 2026 • 3D SPATIAL AUDIO EXPERIENCE</span>
        </motion.div>

        {/* 3D Brand Logo Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="w-full max-w-xl mx-auto mb-4"
        >
          <img
            src="/asset/font-tp.png"
            alt="Ronald 3D Typography"
            decoding="async"
            className="w-full h-auto max-h-[140px] sm:max-h-[160px] object-contain mx-auto drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]"
          />
        </motion.div>

        {/* Subtitle / Genre Identity */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-cyan/90 uppercase mb-5"
        >
          DJ & MUSIC PRODUCER • MELODIC TECHNO &bull; TECH HOUSE &bull; LIVE 3D VISUALS
        </motion.p>

        {/* Main Narrative Lead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-8"
        >
          Membawa dimensi baru electronic dance music dengan sinkronisasi tata suara 3D spatial acoustics, live analog synthesizer modulations, dan visual hologram panggung.
        </motion.p>

        {/* Action Call-To-Action Buttons (Clean & Radiant) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3.5"
        >
          <a
            href="#sounds-of-me"
            onClick={onExploreSounds}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan via-cyan to-blue-500 text-black font-display font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-cyan/25 hover:shadow-cyan/50 hover:scale-105 transition-all flex items-center gap-2 group"
          >
            <Play className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
            <span>Listen Sounds of Me</span>
          </a>

          <a
            href="#stage-gallery"
            onClick={onExploreGallery}
            className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white font-display font-bold text-xs sm:text-sm tracking-wide hover:bg-white/10 hover:border-cyan/40 hover:text-cyan transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan" />
            <span>Explore Press Kit Galery</span>
          </a>

          <a
            href="#kalender"
            onClick={onBookTour}
            className="px-6 py-3 rounded-full bg-purple-500/15 border border-purple/30 text-purple font-display font-bold text-xs sm:text-sm tracking-wide hover:bg-purple hover:text-black transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Tour Schedule & RSVP</span>
          </a>
        </motion.div>

        {/* Official Social Media Channels Quick Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex items-center justify-center gap-3 mt-8 flex-wrap"
        >
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mr-1">
            CONNECT:
          </span>

          <a
            href="https://www.instagram.com/ronald_3d/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#e1306c] hover:bg-[#e1306c]/10 text-xs font-mono font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#e1306c]" />
            <span>Instagram</span>
          </a>

          <a
            href="https://www.youtube.com/c/Ronald3D"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#ff0000] hover:bg-[#ff0000]/10 text-xs font-mono font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff0000]" />
            <span>YouTube</span>
          </a>

          <a
            href="https://open.spotify.com/artist/3HkeKnw42As9Ag8BluG93o"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#1db954] hover:bg-[#1db954]/10 text-xs font-mono font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#1db954]" />
            <span>Spotify</span>
          </a>

          <a
            href="https://soundcloud.com/ronald3d"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#ff5500] hover:bg-[#ff5500]/10 text-xs font-mono font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
            <span>SoundCloud</span>
          </a>

          <a
            href="https://www.tiktok.com/@ronald.3d"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan hover:bg-cyan/10 text-xs font-mono font-semibold text-gray-300 hover:text-cyan transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-cyan" />
            <span>TikTok</span>
          </a>
        </motion.div>

      </div>

      {/* Floating Animated Scroll Down Indicator */}
      <motion.a
        href="#about-me"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 text-gray-400 hover:text-cyan font-mono text-[10px] tracking-widest uppercase transition-colors"
      >
        <div className="w-4 h-7 rounded-full border border-gray-500 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-cyan"
          />
        </div>
        <span>SCROLL DOWN</span>
      </motion.a>

    </section>
  );
}
