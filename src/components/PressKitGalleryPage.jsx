import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  Maximize2,
  Camera
} from 'lucide-react';
import { GALLERY_DATA, GALLERY_CATEGORIES } from '../data/galleryData';

export default function PressKitGalleryPage({ onOpenLightbox, onBackToHome }) {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredPhotos = selectedCat === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.cat === selectedCat);

  return (
    <div className="min-h-screen bg-[#F4FCFB] text-[#243C4C] pt-24 pb-20 selection:bg-[#5289AD] selection:text-white">

      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#5289AD]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[300px] bg-[#ACBCBF]/20 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="w-[92%] max-w-[1600px] mx-auto relative z-10">

        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#ACBCBF]/30">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#243C4C] hover:text-white border border-[#ACBCBF] text-xs font-mono font-bold text-[#243C4C] transition-all w-fit group shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#5289AD] group-hover:text-white" />
            <span>KEMBALI KE BERANDA</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#698696]">
              {GALLERY_DATA.length} High-Resolution Press Assets
            </span>
            <a
              href="/asset/image-1.JPG"
              download="Ronald3D_PressKit_2026.jpg"
              className="px-4 py-2 rounded-full bg-[#5289AD] hover:bg-[#243C4C] text-white font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5289AD]/15 border border-[#5289AD]/40 text-[#243C4C] text-xs font-mono font-bold uppercase mb-4 shadow-sm"
          >
            <Camera className="w-4 h-4 text-[#5289AD]" />
            <span>OFFICIAL PRESS KIT & HIGH-RES PHOTO VAULT</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#243C4C] tracking-tight mb-4"
          >
            Press Kit <span className="bg-gradient-to-r from-[#243C4C] via-[#5289AD] to-[#698696] bg-clip-text text-transparent">Galery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#698696] text-sm sm:text-base font-normal leading-relaxed"
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
                  ? 'bg-[#5289AD] text-white font-black shadow-md scale-105'
                  : 'bg-white border border-[#ACBCBF] text-[#698696] hover:text-[#243C4C] hover:bg-[#F4FCFB]'
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
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#ACBCBF]/60 hover:border-[#5289AD] hover:shadow-xl transition-all flex flex-col justify-between aspect-[3/4] cursor-pointer"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#243C4C]/95 via-[#243C4C]/35 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Tag & Zoom Action */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-black bg-white/90 backdrop-blur-md text-[#243C4C] border border-white uppercase shadow-sm">
                    {photo.tag || 'PRESS PHOTO'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(photo.img, photo.title, photo.caption);
                    }}
                    className="w-8 h-8 rounded-full bg-[#243C4C]/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#5289AD] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    title="Inspect Photo"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Meta & Details */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-10 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-display font-black text-sm sm:text-base text-white leading-tight mb-1 group-hover:text-[#F4FCFB] transition-colors uppercase">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-slate-200 font-sans line-clamp-2 mb-3 opacity-90 group-hover:opacity-100 transition-opacity">
                    {photo.details || photo.caption}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-mono font-bold text-slate-200">300 DPI • High-Res</span>
                    <a
                      href={photo.img}
                      download={`Ronald3D_${photo.id}.jpg`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-[#5289AD] hover:text-white text-[10px] font-mono font-bold text-white flex items-center gap-1 transition-colors"
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
        <div className="mt-16 p-8 rounded-3xl bg-white border border-[#ACBCBF]/60 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <h4 className="font-display font-black text-xl text-[#243C4C] mb-1 uppercase">
              Butuh Format Vektor Logo atau Hospitality Rider?
            </h4>
            <p className="text-xs text-[#698696] font-normal">
              Unduh paket lengkap technical stage rider dan logo resmi di bagian EPK Rider.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-6 py-3 rounded-full bg-[#F4FCFB] hover:bg-white text-[#243C4C] font-mono text-xs font-bold border border-[#ACBCBF] transition-all shadow-sm"
            >
              Kembali ke Home
            </button>
            <a
              href="/#epk-rider"
              onClick={onBackToHome}
              className="px-6 py-3 rounded-full bg-[#5289AD] hover:bg-[#243C4C] text-white font-display font-black text-xs uppercase tracking-wider shadow-md transition-all"
            >
              Buka EPK Rider
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
