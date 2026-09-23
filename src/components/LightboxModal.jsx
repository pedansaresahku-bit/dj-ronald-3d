import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Download, Maximize2 } from 'lucide-react';

export default function LightboxModal({ isOpen, onClose, image, title, caption }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity"
        />

        {/* Content Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-white/10 bg-obsidian-surface/90 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-cyan hover:text-black transition-all"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Image */}
          <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-4 bg-black/40">
            <img
              src={image}
              alt={title || "Stage Moment"}
              className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Bottom Info Bar */}
          <div className="w-full p-4 sm:px-6 bg-obsidian-surface border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-cyan/10 text-cyan border border-cyan/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan" /> STAGE MOMENT
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white font-display">
                  {title || "Ronald 3D Live Experience"}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-sans">
                {caption || "Official Tour Documentation 2026"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={image}
                download="ronald-3d-stage.jpg"
                className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-cyan" /> Download High-Res
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
