import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/95 border border-[#5289AD]/40 text-[#243C4C] shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-2.5 text-xs font-bold font-sans">
              <Sparkles className="w-4 h-4 text-[#5289AD] shrink-0 animate-pulse" />
              <span>{toast.message}</span>
            </div>
            {onDismiss && (
              <button
                onClick={() => onDismiss(toast.id)}
                className="text-[#698696] hover:text-[#243C4C] p-1 rounded-md transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
