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
            className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-obsidian-surface/95 border border-cyan/40 text-white shadow-2xl backdrop-blur-xl shadow-cyan/10"
          >
            <div className="flex items-center gap-2.5 text-xs font-bold font-sans">
              <Sparkles className="w-4 h-4 text-cyan shrink-0 animate-pulse" />
              <span>{toast.message}</span>
            </div>
            {onDismiss && (
              <button
                onClick={() => onDismiss(toast.id)}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
                aria-label="Dismiss toast"
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
