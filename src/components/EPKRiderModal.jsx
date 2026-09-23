import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Instagram,
  Download,
  Zap
} from 'lucide-react';

export default function EPKRiderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const hospitalityItems = [
    { label: '2 TICKET ( GARUDA / CITILINK / BATIK )', tag: 'FLIGHT & TRANSPORT' },
    { label: 'HOTEL 4 STARS ( NON SMOKING )', tag: 'ACCOMMODATION' },
    { label: '1 BOTTLE MARTELL / CODIGO', tag: 'BEVERAGES' },
    { label: '5 MINERAL WATER', tag: 'REFRESHMENTS' },
    { label: 'MIX PLATTER & FRUITS PLATTER', tag: 'SNACKS' },
    { label: 'MEAL ALLOWANCE 2 PACK', tag: 'MEAL ALLOWANCE' },
    { label: 'DOWN PAYMENT 20 %', tag: 'DOWN PAYMENT' },
    { label: 'FULL PAYMENT H - 1', tag: 'FINAL PAYMENT' },
  ];

  const handleDownloadTxt = () => {
    const content = `=====================================================
Ronald 3D — OFFICIAL RATECARD & RIDERS 2026
Artist: Ronald 3D
Title: INDONESIAN BREAKBEAT DJ'S & ELECTRONIC MUSIC PRODUCER
WhatsApp: +62 812-3456-7890
Instagram DM: https://www.instagram.com/ronald_3d/
Management Desk: booking@ronald3d.com
=====================================================

[ BOOKING & PERFORMANCE SCOPE ]
- JAKARTA & METROPOLITAN AREA
- BANDUNG & REGIONAL EVENT
- LUAR KOTA / NATIONAL & ASIA FESTIVAL TOUR

* Rate resmi disesuaikan dengan skala acara, lokasi, dan tanggal penampilan.
* Hubungi Manager DJ Ronald 3D untuk penawaran resmi.

-----------------------------------------------------
[ 1. HOSPITALITY & TERMS RIDERS ]
- Flight & Transport: 2 Ticket (Garuda / Citilink / Batik)
- Accommodation: Hotel 4 Stars (Non-Smoking)
- Beverages: 1 Bottle Martell / Codigo
- Refreshments: 5 Mineral Water
- Snacks: Mix Platter & Fruits Platter
- Meal Allowance: 2 Pack
- Payment Terms: DP 20%, Full Payment H-1

-----------------------------------------------------
[ 2. TECHNICAL DECK SETUP (EQUIPMENT) ]
- Pioneer CDJ-2000 / 3000
- Pioneer DJM-A9

=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ronald3D_Official_Ratecard_Riders_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Dark Dimmed Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-xl rounded-3xl bg-[#141414] border-2 border-[#444444] shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-auto flex flex-col max-h-[92vh]"
        >
          {/* Top Header Bar */}
          <div className="p-5 sm:p-6 border-b border-[#444444] flex items-start justify-between gap-4 bg-[#181818]">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#E2E800]/15 border border-[#E2E800]/40 text-[#E2E800] flex items-center justify-center shadow-lg shadow-[#E2E800]/10 shrink-0">
                <FileText className="w-5 h-5 text-[#E2E800]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-black text-[#E2E800] tracking-wider uppercase">
                  <Zap className="w-3 h-3 fill-[#E2E800]" />
                  <span>CONFIDENTIAL PROMOTER DOSSIER 2026</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-wide uppercase mt-0.5">
                  EPK & TECHNICAL RIDERS
                </h2>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#242424] border border-[#444444] text-[#979797] hover:text-white hover:border-[#E2E800] hover:bg-[#141414] flex items-center justify-center transition-all shrink-0"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-[#D6D6D6]">

            {/* 1. HOSPITALITY & TERMS RIDER SECTION */}
            <div>
              {/* Section Header with Framed Box */}
              <div className="inline-block px-3 py-1.5 rounded-md bg-[#181818] border-2 border-white text-white font-display font-black text-xs sm:text-sm tracking-wider uppercase mb-3 shadow-md">
                1. HOSPITALITY & TERMS RIDER
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {hospitalityItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:px-4 sm:py-3 rounded-2xl bg-[#1a1a1a] border border-[#444444] hover:border-[#E2E800]/50 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-[#E2E800] shrink-0" />
                      <span className="font-display font-bold text-xs sm:text-sm text-white tracking-wide truncate group-hover:text-[#E2E800] transition-colors">
                        {item.label}
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#242424] text-[#979797] border border-[#444444] uppercase shrink-0 tracking-wider">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. TECHNICAL DECK SETUP (EQUIPMENT) SECTION */}
            <div>
              {/* Section Header with Yellow Framed Box */}
              <div className="inline-block px-3 py-1.5 rounded-md bg-[#181818] border-2 border-[#E2E800] text-[#E2E800] font-display font-black text-xs sm:text-sm tracking-wider uppercase mb-3 shadow-md shadow-[#E2E800]/10">
                2. TECHNICAL DECK SETUP (EQUIPMENT)
              </div>

              {/* 2-Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1a1a1a] border border-[#444444] hover:border-[#E2E800] transition-all flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#E2E800] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#E2E800] uppercase block">
                      DECK PLAYERS
                    </span>
                    <h4 className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-wide mt-0.5">
                      PIONEER CDJ-2000 / 3000
                    </h4>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1a1a1a] border border-[#444444] hover:border-[#E2E800] transition-all flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#E2E800] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#E2E800] uppercase block">
                      MIXER CONSOLE
                    </span>
                    <h4 className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-wide mt-0.5">
                      PIONEER DJM-A9
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* NOTE ALERT BOX */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1a1a1a] border-2 border-red-500/60 flex items-center gap-3 shadow-lg shadow-red-500/5">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="font-display font-bold text-xs sm:text-sm text-white leading-tight uppercase">
                NOTE : UNTUK INFORMASI RATE MENYESUAIKAN DENGAN SKALA ACARA & LOKASI
              </p>
            </div>

          </div>

          {/* Modal Footer Bar */}
          <div className="p-4 sm:p-5 border-t border-[#444444] bg-[#181818] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] font-mono text-[#979797] text-center sm:text-left">
              Official Document • DJ Ronald 3D Management 2026
            </span>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              <a
                href="https://instagram.com/ronald_3d/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white font-display font-black text-xs uppercase flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>DM IG (@RONALD_3D)</span>
              </a>

              <button
                onClick={handleDownloadTxt}
                className="px-4 py-2 rounded-full bg-[#E2E800] hover:bg-[#f2f716] text-[#141414] font-display font-black text-xs uppercase flex items-center gap-1.5 shadow-md shadow-[#E2E800]/25 transition-all hover:scale-105 active:scale-95"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>DOWNLOAD TXT</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
