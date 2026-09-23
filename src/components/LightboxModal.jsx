import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Download } from 'lucide-react';

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
          className="absolute inset-0 bg-black/80 backdrop-blur-2xl transition-opacity"
        />

        {/* Content Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center rounded-3xl overflow-hidden border border-[#ACBCBF] bg-white shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#F4FCFB] border border-[#ACBCBF] text-[#243C4C] flex items-center justify-center hover:bg-[#243C4C] hover:text-white transition-all shadow-md"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Image */}
          <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-4 bg-black/5">
            <img
              src={image}
              alt={title || "Stage Moment"}
              className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-xl"
            />
          </div>

          {/* Bottom Info Bar */}
          <div className="w-full p-4 sm:px-6 bg-white border-t border-[#ACBCBF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#5289AD]/15 text-[#243C4C] border border-[#5289AD]/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#5289AD]" /> STAGE MOMENT
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#243C4C] font-display">
                  {title || "Ronald 3D Live Experience"}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#698696] font-sans">
                {caption || "Official Tour Documentation 2026"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={image}
                download="ronald-3d-stage.jpg"
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#5289AD] text-white hover:bg-[#243C4C] flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download High-Res
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
