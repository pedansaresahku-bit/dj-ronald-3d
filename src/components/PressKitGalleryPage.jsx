import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Sparkles, 
  Download, 
  Maximize2, 
  Camera, 
  Filter, 
  Check, 
  Share2, 
  Layers,
  FileText,
  ExternalLink
} from 'lucide-react';
import { GALLERY_DATA, GALLERY_CATEGORIES } from '../data/galleryData';

export default function PressKitGalleryPage({ onOpenLightbox, onBackToHome }) {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredPhotos = selectedCat === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.cat === selectedCat);

  return (
    <div className="min-h-screen bg-[#060507] text-white pt-24 pb-20 selection:bg-cyan selection:text-black">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[300px] bg-purple/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="w-[92%] max-w-[1600px] mx-auto relative z-10">
        
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan/40 text-xs font-mono font-bold text-gray-300 hover:text-white transition-all w-fit group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan" />
            <span>KEMBALI KE BERANDA</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400">
              {GALLERY_DATA.length} High-Resolution Press Assets
            </span>
            <a
              href="/asset/image-1.JPG"
              download="Ronald3D_PressKit_2026.jpg"
              className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-display font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-400/20 transition-all hover:scale-105"
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono font-bold uppercase mb-4"
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
            className="text-gray-300 text-sm sm:text-base font-light leading-relaxed"
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
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wide transition-all ${
                selectedCat === cat.id
                  ? 'bg-cyan text-black shadow-lg shadow-cyan/25 scale-105'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
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
                className="group relative rounded-3xl overflow-hidden bg-[#0c0d12] border border-white/10 hover:border-cyan/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all flex flex-col justify-between aspect-[3/4] cursor-pointer"
                onClick={() => onOpenLightbox(photo.img, photo.title, photo.caption)}
              >
                {/* Photo Image */}
                <img
                  src={photo.img}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Top Tag & Zoom Action */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-cyan border border-cyan/30 uppercase">
                    {photo.tag || 'PRESS PHOTO'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(photo.img, photo.title, photo.caption);
                    }}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-cyan hover:text-black flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    title="Inspect Photo"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Meta & Details */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-10 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-display font-black text-sm sm:text-base text-white leading-tight mb-1 group-hover:text-cyan transition-colors uppercase">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-gray-300 font-sans line-clamp-2 mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    {photo.details || photo.caption}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-mono text-gray-400">300 DPI • High-Res</span>
                    <a
                      href={photo.img}
                      download={`Ronald3D_${photo.id}.jpg`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-cyan hover:text-black text-[10px] font-mono font-bold text-white flex items-center gap-1 transition-colors"
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
        <div className="mt-16 p-8 rounded-3xl bg-[#0c0d12] border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="font-display font-black text-xl text-white mb-1 uppercase">
              Butuh Format Vektor Logo atau Hospitality Rider?
            </h4>
            <p className="text-xs text-gray-400 font-light">
              Unduh paket lengkap technical stage rider dan logo resmi di bagian EPK Rider.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold border border-white/15 transition-all"
            >
              Kembali ke Home
            </button>
            <a
              href="/#epk-rider"
              onClick={onBackToHome}
              className="px-6 py-3 rounded-full bg-cyan hover:bg-cyan/90 text-black font-display font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan/25 transition-all"
            >
              Buka EPK Rider
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
