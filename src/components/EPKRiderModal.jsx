import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Instagram,
  Download,
  Zap,
  MapPin,
  Calendar,
  Train,
  Plane,
  Building,
  Wine,
  Utensils,
  CreditCard,
  Lock,
  Sparkles,
  Info
} from 'lucide-react';

export default function EPKRiderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'jabodetabek' | 'bandung' | 'luar-kota'

  const packages = [
    {
      id: 'jabodetabek',
      region: '1. JABODETABEK',
      subtitle: 'Jakarta, Bogor, Depok, Tangerang, Bekasi',
      badge: 'Metropolitan Area',
      rates: [
        { type: 'Weekday', price: 'Rp 8.000.000', note: '8 Juta' },
        { type: 'Weekend', price: 'Rp 12.000.000', note: '12 Juta' }
      ],
      facilities: [
        { icon: Wine, text: 'Compliment 1 Singleton' },
        { icon: Sparkles, text: 'Fruit Platter' }
      ]
    },
    {
      id: 'bandung',
      region: '2. BANDUNG',
      subtitle: 'Bandung Raya & Sekitarnya',
      badge: 'Regional Expedition',
      rates: [
        { type: 'Weekday', price: 'Rp 11.000.000', note: '11 Juta' },
        { type: 'Weekend', price: 'Rp 14.000.000', note: '14 Juta' }
      ],
      facilities: [
        { icon: Wine, text: 'Compliment 1 Singleton' },
        { icon: Sparkles, text: 'Fruit Platter' },
        { icon: Train, text: '2 Tiket PP Whoosh / Kereta Api' },
        { icon: Building, text: '2 Kamar Hotel Smoking Room' },
        { icon: Utensils, text: 'Makan 1x' }
      ]
    },
    {
      id: 'luar-kota',
      region: '3. LUAR KOTA',
      subtitle: 'Seluruh Indonesia (Di Luar Jabodetabek & Bandung)',
      badge: 'National & Island Tour',
      rates: [
        { type: 'Tarif Flat / Event', price: 'Rp 15.000.000 - 20.000.000', note: '15 - 20 Juta' }
      ],
      facilities: [
        { icon: Wine, text: 'Compliment 1 Singleton' },
        { icon: Sparkles, text: 'Fruit Platter' },
        { icon: Plane, text: '2 Tiket PP Pesawat', specialNote: 'Catatan Khusus: No Lion Group' },
        { icon: Building, text: '2 Kamar Hotel Smoking Room' },
        { icon: Utensils, text: 'Makan 1x' }
      ]
    }
  ];

  const notes = [
    {
      title: 'Penguncian Tanggal (Lock Tanggal)',
      description: 'Memerlukan pembayaran uang muka (Down Payment / DP) minimal 30%.',
      icon: Lock
    },
    {
      title: 'Pelunasan Pembayaran',
      description: 'Wajib dilakukan secara penuh sebelum acara dimulai.',
      icon: CreditCard
    }
  ];

  const handleDownloadTxt = () => {
    const content = `=====================================================
RONALD 3D — OFFICIAL RATECARD & EPK HOSPITALITY RIDER
Artist: Ronald 3D
Category: Breakbeat DJ & Electronic Music Producer
WhatsApp: +62 812-3456-7890
Instagram: https://www.instagram.com/ronald_3d/
Management Email: info@ronald3d.com
=====================================================

[ 1. JABODETABEK ]
• Weekday: Rp 8.000.000 (8 Juta)
• Weekend: Rp 12.000.000 (12 Juta)
• Fasilitas & Akomodasi:
  - Compliment 1 Singleton
  - Fruit Platter

-----------------------------------------------------
[ 2. BANDUNG ]
• Weekday: Rp 11.000.000 (11 Juta)
• Weekend: Rp 14.000.000 (14 Juta)
• Fasilitas & Akomodasi:
  - Compliment 1 Singleton
  - Fruit Platter
  - 2 Tiket PP Whoosh / Kereta
  - 2 Hotel Smoking Room
  - Makan 1x

-----------------------------------------------------
[ 3. LUAR KOTA ]
• Tarif: Rp 15.000.000 - 20.000.000 (15 - 20 Juta)
• Fasilitas & Akomodasi:
  - Compliment 1 Singleton
  - Fruit Platter
  - 2 Tiket PP Pesawat (Catatan khusus: No Lion Group)
  - 2 Hotel Smoking Room
  - Makan 1x

-----------------------------------------------------
[ CATATAN PENTING & TERMS OF PAYMENT ]
1. Penguncian tanggal (lock tanggal) memerlukan pembayaran uang muka (DP) minimal 30%.
2. Pelunasan pembayaran wajib dilakukan sebelum acara dimulai.

-----------------------------------------------------
[ TECHNICAL DECK SETUP (EQUIPMENT RIDER) ]
• CDJ Players: 2x / 4x Pioneer CDJ-2000 / 3000
• Mixer Console: Pioneer DJM-A9 / DJM-V10
• Monitoring: 2x Active Stage Monitor Speakers (L-Acoustics / d&b audiotechnik)

=====================================================
Official Document • DJ Ronald 3D Management 2026`;

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

  const filteredPackages = activeTab === 'all' 
    ? packages 
    : packages.filter(p => p.id === activeTab);

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
          className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#141414] border-2 border-[#444444] shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden my-auto flex flex-col max-h-[92vh]"
        >
          {/* Top Header Bar */}
          <div className="p-5 sm:p-6 border-b border-[#333333] flex items-start justify-between gap-4 bg-[#181818]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#E2E800]/15 border border-[#E2E800]/40 text-[#E2E800] flex items-center justify-center shadow-lg shadow-[#E2E800]/10 shrink-0">
                <FileText className="w-6 h-6 text-[#E2E800]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-black text-[#E2E800] tracking-wider uppercase">
                  <Zap className="w-3.5 h-3.5 fill-[#E2E800]" />
                  <span>OFFICIAL EPK RIDER & RATECARD 2026</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-wide uppercase mt-0.5">
                  HOSPITALITY & TECHNICAL RIDER
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

          {/* Region Filter Tabs */}
          <div className="px-5 sm:px-6 pt-4 pb-2 border-b border-[#2b2b2b] bg-[#161616] flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#E2E800] text-black shadow-md shadow-[#E2E800]/20'
                  : 'bg-[#222222] text-[#A0A0A0] hover:text-white hover:bg-[#2e2e2e]'
              }`}
            >
              Semua Wilayah ({packages.length})
            </button>
            <button
              onClick={() => setActiveTab('jabodetabek')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'jabodetabek'
                  ? 'bg-[#E2E800] text-black shadow-md shadow-[#E2E800]/20'
                  : 'bg-[#222222] text-[#A0A0A0] hover:text-white hover:bg-[#2e2e2e]'
              }`}
            >
              Jabodetabek
            </button>
            <button
              onClick={() => setActiveTab('bandung')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'bandung'
                  ? 'bg-[#E2E800] text-black shadow-md shadow-[#E2E800]/20'
                  : 'bg-[#222222] text-[#A0A0A0] hover:text-white hover:bg-[#2e2e2e]'
              }`}
            >
              Bandung
            </button>
            <button
              onClick={() => setActiveTab('luar-kota')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'luar-kota'
                  ? 'bg-[#E2E800] text-black shadow-md shadow-[#E2E800]/20'
                  : 'bg-[#222222] text-[#A0A0A0] hover:text-white hover:bg-[#2e2e2e]'
              }`}
            >
              Luar Kota
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-[#D6D6D6]">

            {/* 1. REGIONAL PACKAGES & RATES */}
            <div className="space-y-4">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-2xl bg-[#1b1b1b] border border-[#3d3d3d] hover:border-[#E2E800]/60 transition-all p-4 sm:p-5 shadow-lg relative overflow-hidden"
                >
                  {/* Subtle top indicator */}
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#E2E800]/15 text-[#E2E800] flex items-center justify-center font-black text-xs font-mono">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-base sm:text-lg text-white tracking-wide">
                          {pkg.region}
                        </h3>
                        <p className="text-[11px] font-mono text-[#8c8c8c]">{pkg.subtitle}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#262626] text-[#E2E800] border border-[#E2E800]/30 uppercase tracking-wider">
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Pricing Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3.5">
                    {pkg.rates.map((rate, rIdx) => (
                      <div
                        key={rIdx}
                        className={`p-3 rounded-xl bg-[#131313] border border-[#333333] flex items-center justify-between gap-3 ${
                          pkg.rates.length === 1 ? 'sm:col-span-2' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#E2E800] shrink-0" />
                          <span className="text-xs font-mono font-bold text-[#b5b5b5] uppercase">
                            {rate.type}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-display font-black text-sm sm:text-base text-white text-[#E2E800]">
                            {rate.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Facilities & Accommodations */}
                  <div className="mt-3 pt-3 border-t border-[#2b2b2b]">
                    <span className="text-[10px] font-mono font-bold text-[#E2E800] tracking-wider uppercase block mb-2">
                      FASILITAS & AKOMODASI:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pkg.facilities.map((fac, fIdx) => {
                        const IconComponent = fac.icon;
                        return (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2 text-xs font-sans text-[#E0E0E0] bg-[#141414] p-2 rounded-lg border border-[#2b2b2b]"
                          >
                            <IconComponent className="w-3.5 h-3.5 text-[#E2E800] shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <span className="font-medium">{fac.text}</span>
                              {fac.specialNote && (
                                <span className="block text-[10px] font-bold font-mono text-amber-400 mt-0.5">
                                  ⚠️ {fac.specialNote}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. CATATAN PENTING (NOTED & TERMS) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1c1a14] to-[#161616] border-2 border-[#E2E800]/50 shadow-xl shadow-[#E2E800]/5">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-[#E2E800] shrink-0" />
                <h4 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-wider">
                  CATATAN PENTING (NOTED & PAYMENT TERMS)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {notes.map((note, nIdx) => {
                  const IconComp = note.icon;
                  return (
                    <div
                      key={nIdx}
                      className="p-3.5 rounded-xl bg-[#121212]/90 border border-[#3a3a3a] flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#E2E800]/20 text-[#E2E800] flex items-center justify-center shrink-0 mt-0.5">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-xs font-display font-bold text-white block">
                          {note.title}
                        </strong>
                        <p className="text-xs text-[#b8b8b8] mt-0.5 leading-relaxed font-sans">
                          {note.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. TECHNICAL DECK SETUP (EQUIPMENT) */}
            <div>
              <div className="inline-block px-3 py-1.5 rounded-md bg-[#181818] border-2 border-[#E2E800] text-[#E2E800] font-display font-black text-xs sm:text-sm tracking-wider uppercase mb-3 shadow-md shadow-[#E2E800]/10">
                TECHNICAL DECK SETUP (EQUIPMENT)
              </div>

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
                    <p className="text-[11px] text-[#979797] font-mono mt-0.5">LAN Link Connected</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1a1a1a] border border-[#444444] hover:border-[#E2E800] transition-all flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#E2E800] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#E2E800] uppercase block">
                      MIXER CONSOLE
                    </span>
                    <h4 className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-wide mt-0.5">
                      PIONEER DJM-A9 / DJM-V10
                    </h4>
                    <p className="text-[11px] text-[#979797] font-mono mt-0.5">Professional Grade</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Modal Footer Bar */}
          <div className="p-4 sm:p-5 border-t border-[#333333] bg-[#181818] flex flex-col sm:flex-row items-center justify-between gap-4">
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
                className="px-4 py-2 rounded-full bg-[#E2E800] hover:bg-[#f2f716] text-[#141414] font-display font-black text-xs uppercase flex items-center gap-1.5 shadow-md shadow-[#E2E800]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>DOWNLOAD TXT RIDER</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
