import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  Maximize2,
  Camera,
  Sparkles
} from 'lucide-react';
import { GALLERY_DATA, GALLERY_CATEGORIES } from '../data/galleryData';

export default function PressKitGalleryPage({ onOpenLightbox, onBackToHome, onOpenEPKModal }) {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredPhotos = selectedCat === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.cat === selectedCat);

  return (
    <div className="min-h-screen bg-obsidian text-white pt-24 pb-20 selection:bg-cyan selection:text-black">

      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[300px] bg-purple/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="w-[92%] max-w-[1600px] mx-auto relative z-10">

        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-cyan hover:text-black border border-white/20 text-xs font-mono font-bold text-white transition-all w-fit group shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan group-hover:text-black" />
            <span>KEMBALI KE BERANDA</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-300">
              {GALLERY_DATA.length} High-Resolution Press Assets
            </span>
            <a
              href="/asset/image-1.JPG"
              download="Ronald3D_PressKit_2026.jpg"
              className="px-4 py-2 rounded-full bg-cyan hover:bg-cyan/90 text-black font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-cyan/20 transition-all hover:scale-105"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Press Kit</span>
            </a>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/15 border border-cyan/40 text-cyan text-xs font-mono font-bold uppercase mb-4 shadow-sm"
          >
            <Camera className="w-4 h-4 text-cyan" />
            <span>OFFICIAL PRESS KIT & HIGH-RES PHOTO VAULT</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4"
          >
            Press Kit <span className="bg-gradient-to-r from-white via-cyan to-purple bg-clip-text text-transparent">Galery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed"
          >
            Koleksi lengkap dokumentasi visual panggung, studio session, dan foto beresolusi tinggi 300 DPI untuk kebutuhan media, festival promoter, dan press release Ronald 3D.
          </motion.p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wide transition-all ${selectedCat === cat.id
                ? 'bg-cyan text-black font-black shadow-md shadow-cyan/20 scale-105'
                : 'bg-obsidian-surface border border-white/15 text-slate-300 hover:text-white hover:border-cyan/40 hover:bg-white/10'
                }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* High-Resolution Gallery Photo Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                className="group relative rounded-3xl overflow-hidden bg-obsidian-surface border border-white/15 hover:border-cyan hover:shadow-2xl hover:shadow-cyan/20 transition-all flex flex-col justify-between aspect-[3/4] cursor-pointer"
                onClick={() => onOpenLightbox(photo.img, photo.title, photo.caption)}
              >
                {/* Photo Image */}
                <img
                  src={photo.img}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Tag & Zoom Action */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-black bg-black/80 backdrop-blur-md text-[#E2E800] border border-[#E2E800]/50 uppercase shadow-md shadow-[#E2E800]/10">
                    STUDIO SHOT
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(photo.img, photo.title, photo.caption);
                    }}
                    className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#E2E800] hover:text-[#141414] hover:border-[#E2E800] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
                    title="Inspect Photo"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Meta & Actions (Clean without title) */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-10 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center justify-between pt-2 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md -mx-4 -mb-4 p-3.5 rounded-b-3xl">
                    <span className="text-[10px] font-mono font-bold text-slate-300">300 DPI • High-Res</span>
                    <a
                      href={photo.img}
                      download={`Ronald3D_${photo.id}.jpg`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded-lg bg-[#E2E800] hover:bg-[#f2f716] text-[#141414] text-[10px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-[#E2E800]/20 hover:scale-105"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer Navigation CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-obsidian-surface/90 border border-white/15 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl">
          <div className="text-center sm:text-left">
            <h4 className="font-display font-black text-xl text-white mb-1 uppercase">
              Butuh Format Vektor Logo atau Hospitality Rider?
            </h4>
            <p className="text-xs text-slate-300 font-normal">
              Unduh paket lengkap technical stage rider dan logo resmi di bagian EPK Rider.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold border border-white/20 transition-all shadow-sm"
            >
              Kembali ke Home
            </button>
            <button
              onClick={() => {
                if (onOpenEPKModal) onOpenEPKModal();
              }}
              className="px-6 py-3 rounded-full bg-[#E2E800] hover:bg-[#f2f716] text-[#141414] font-display font-black text-xs uppercase tracking-wider shadow-md shadow-[#E2E800]/25 transition-all hover:scale-105 active:scale-95"
            >
              Buka EPK Rider
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
