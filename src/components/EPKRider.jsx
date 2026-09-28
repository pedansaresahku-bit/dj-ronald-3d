import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  CheckCircle,
  Disc,
  Send,
  MapPin,
  Calendar,
  Lock,
  CreditCard,
  Wine,
  Sparkles,
  Train,
  Plane,
  Building,
  Utensils
} from 'lucide-react';

export default function EPKRider({ onBookingSubmit, onOpenEPKModal }) {
  const [formData, setFormData] = useState({
    promoterName: '',
    email: '',
    eventName: '',
    venueCity: '',
    eventDate: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.promoterName || !formData.email || !formData.eventName) return;
    if (onBookingSubmit) {
      onBookingSubmit(formData);
    }
    setFormData({
      promoterName: '',
      email: '',
      eventName: '',
      venueCity: '',
      eventDate: '',
      message: ''
    });
  };

  return (
    <section id="epk-rider" className="py-24 relative z-10">
      <div className="w-[92%] max-w-[1560px] mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E800]/15 border border-[#E2E800]/40 text-[#E2E800] text-xs font-mono font-bold uppercase mb-3 shadow-md shadow-[#E2E800]/15"
          >
            <FileText className="w-3.5 h-3.5 text-[#E2E800]" />
            <span>ELECTRONIC PRESS KIT & TECHNICAL RIDER</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3"
          >
            EPK & <span className="bg-gradient-to-r from-white via-[#E2E800] to-[#979797] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(226,232,0,0.35)]">Hospitality Rider</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#D6D6D6] text-sm sm:text-base font-normal"
          >
            Paket Rate Card, Hospitality Rider, materi promosi resmi beresolusi tinggi, dan spesifikasi panggung untuk festival & club promoter.
          </motion.p>
        </div>

        {/* 3 Regional Packages Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Card 1: Jabodetabek */}
          <div className="p-5 rounded-3xl bg-[#1e1e1e]/95 border border-[#444444] hover:border-[#E2E800]/60 transition-all shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30 uppercase">
                  Metropolitan
                </span>
                <span className="text-[10px] font-mono text-[#8c8c8c]">Paket 01</span>
              </div>
              <h3 className="font-display font-black text-lg text-white">1. Jabodetabek</h3>
              <p className="text-xs text-[#979797] font-mono mt-0.5 mb-4">Jakarta, Bogor, Depok, Tangerang, Bekasi</p>

              <div className="space-y-2 mb-4">
                <div className="p-2.5 rounded-xl bg-[#141414] border border-[#333333] flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#a8a8a8]">Weekday</span>
                  <span className="font-display font-black text-sm text-[#E2E800]">Rp 8 Juta</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#141414] border border-[#333333] flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#a8a8a8]">Weekend</span>
                  <span className="font-display font-black text-sm text-[#E2E800]">Rp 12 Juta</span>
                </div>
              </div>

              <div className="text-xs text-[#D6D6D6] space-y-1.5 pt-3 border-t border-[#333333]">
                <strong className="text-[10px] font-mono font-bold text-[#E2E800] uppercase block">Fasilitas & Akomodasi:</strong>
                <p className="flex items-center gap-1.5"><Wine className="w-3.5 h-3.5 text-[#E2E800]" /> Compliment 1 Singleton</p>
                <p className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#E2E800]" /> Fruit Platter</p>
              </div>
            </div>
          </div>

          {/* Card 2: Bandung */}
          <div className="p-5 rounded-3xl bg-[#1e1e1e]/95 border border-[#444444] hover:border-[#E2E800]/60 transition-all shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30 uppercase">
                  Regional
                </span>
                <span className="text-[10px] font-mono text-[#8c8c8c]">Paket 02</span>
              </div>
              <h3 className="font-display font-black text-lg text-white">2. Bandung</h3>
              <p className="text-xs text-[#979797] font-mono mt-0.5 mb-4">Bandung Raya & Sekitarnya</p>

              <div className="space-y-2 mb-4">
                <div className="p-2.5 rounded-xl bg-[#141414] border border-[#333333] flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#a8a8a8]">Weekday</span>
                  <span className="font-display font-black text-sm text-[#E2E800]">Rp 11 Juta</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#141414] border border-[#333333] flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#a8a8a8]">Weekend</span>
                  <span className="font-display font-black text-sm text-[#E2E800]">Rp 14 Juta</span>
                </div>
              </div>

              <div className="text-xs text-[#D6D6D6] space-y-1.5 pt-3 border-t border-[#333333]">
                <strong className="text-[10px] font-mono font-bold text-[#E2E800] uppercase block">Fasilitas & Akomodasi:</strong>
                <p className="flex items-center gap-1.5"><Wine className="w-3.5 h-3.5 text-[#E2E800]" /> Compliment 1 Singleton & Fruit Platter</p>
                <p className="flex items-center gap-1.5"><Train className="w-3.5 h-3.5 text-[#E2E800]" /> 2 Tiket PP Whoosh / Kereta</p>
                <p className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-[#E2E800]" /> 2 Hotel Smoking Room & Makan 1x</p>
              </div>
            </div>
          </div>

          {/* Card 3: Luar Kota */}
          <div className="p-5 rounded-3xl bg-[#1e1e1e]/95 border border-[#444444] hover:border-[#E2E800]/60 transition-all shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30 uppercase">
                  National Tour
                </span>
                <span className="text-[10px] font-mono text-[#8c8c8c]">Paket 03</span>
              </div>
              <h3 className="font-display font-black text-lg text-white">3. Luar Kota</h3>
              <p className="text-xs text-[#979797] font-mono mt-0.5 mb-4">Seluruh Indonesia</p>

              <div className="space-y-2 mb-4">
                <div className="p-2.5 rounded-xl bg-[#141414] border border-[#333333] flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#a8a8a8]">Tarif Event</span>
                  <span className="font-display font-black text-sm text-[#E2E800]">Rp 15 - 20 Juta</span>
                </div>
              </div>

              <div className="text-xs text-[#D6D6D6] space-y-1.5 pt-3 border-t border-[#333333]">
                <strong className="text-[10px] font-mono font-bold text-[#E2E800] uppercase block">Fasilitas & Akomodasi:</strong>
                <p className="flex items-center gap-1.5"><Wine className="w-3.5 h-3.5 text-[#E2E800]" /> Compliment 1 Singleton & Fruit Platter</p>
                <p className="flex items-center gap-1.5"><Plane className="w-3.5 h-3.5 text-[#E2E800]" /> 2 Tiket PP Pesawat (No Lion Group)</p>
                <p className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-[#E2E800]" /> 2 Hotel Smoking Room & Makan 1x</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Column Layout: EPK Downloads & Tech Specs + Promoter Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Press Kit & Audio Specs (Left) */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-[#1e1e1e]/95 border border-[#444444] shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
            <div>
              <div className="border-b border-[#444444] pb-4 mb-6">
                <span className="font-mono text-xs font-black text-[#E2E800] tracking-wider uppercase">
                  TERMS & TECHNICAL SPECIFICATIONS
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-0.5">
                  Catatan Penting & Stage Rider
                </h3>
              </div>

              {/* Catatan Penting */}
              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-[#141414] border border-amber-500/30 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-[#E2E800] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-white block">Penguncian Tanggal (Lock Tanggal):</strong>
                    <span className="text-xs text-[#D6D6D6] font-normal">Memerlukan pembayaran uang muka (DP) minimal 30%.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#141414] border border-amber-500/30 flex items-start gap-3">
                  <CreditCard className="w-4 h-4 text-[#E2E800] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-white block">Pelunasan Pembayaran:</strong>
                    <span className="text-xs text-[#D6D6D6] font-normal">Wajib diselesaikan secara penuh sebelum acara dimulai.</span>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                <a
                  href="/asset/3d-logo.png"
                  download="Ronald3D_Official_Logo_Pack.png"
                  className="p-4 rounded-2xl bg-[#141414] border border-[#444444] hover:border-[#E2E800] hover:bg-[#242424] transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E2E800]/15 text-[#E2E800] flex items-center justify-center shadow-md">
                      <Disc className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold font-display text-white group-hover:text-[#E2E800] transition-colors">Official Logo Pack</h4>
                      <span className="text-[11px] text-[#979797] font-mono font-medium">PNG, SVG, Alpha</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-[#979797] group-hover:text-[#E2E800] transition-colors" />
                </a>

                {onOpenEPKModal ? (
                  <button
                    onClick={onOpenEPKModal}
                    className="p-4 rounded-2xl bg-[#141414] border border-[#444444] hover:border-[#E2E800] hover:bg-[#242424] transition-all flex items-center justify-between group shadow-sm text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E2E800]/15 text-[#E2E800] flex items-center justify-center shadow-md">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-display text-white group-hover:text-[#E2E800] transition-colors">Full EPK & Rider</h4>
                        <span className="text-[11px] text-[#979797] font-mono font-medium">Lihat Detail Lengkap</span>
                      </div>
                    </div>
                    <FileText className="w-4 h-4 text-[#979797] group-hover:text-[#E2E800] transition-colors" />
                  </button>
                ) : (
                  <a
                    href="/asset/image-1.JPG"
                    download="Ronald3D_Press_Photos_2026.jpg"
                    className="p-4 rounded-2xl bg-[#141414] border border-[#444444] hover:border-[#E2E800] hover:bg-[#242424] transition-all flex items-center justify-between group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E2E800]/15 text-[#E2E800] flex items-center justify-center shadow-md">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-display text-white group-hover:text-[#E2E800] transition-colors">Hi-Res Press Photos</h4>
                        <span className="text-[11px] text-[#979797] font-mono font-medium">300 DPI Studio</span>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-[#979797] group-hover:text-[#E2E800] transition-colors" />
                  </a>
                )}
              </div>

              {/* Technical Stage Requirements */}
              <div className="p-4 rounded-2xl bg-[#141414] border border-[#444444] flex items-start gap-3 shadow-inner">
                <CheckCircle className="w-4 h-4 text-[#E2E800] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-white block">Console Setup:</strong>
                  <span className="text-xs text-[#D6D6D6] font-normal">Pioneer CDJ-2000 / 3000 + Pioneer DJM-A9 / DJM-V10 (Link LAN).</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#444444] mt-6 text-xs font-mono font-bold text-[#979797] flex items-center justify-between">
              <span>Management: info@ronald3d.com</span>
              <span className="text-[#E2E800] font-black">Official Booking</span>
            </div>
          </div>

          {/* Promoter Booking Inquiry Form (Right) */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-[#1e1e1e]/95 border border-[#444444] shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
            <div>
              <div className="border-b border-[#444444] pb-4 mb-6">
                <span className="font-mono text-xs font-black text-[#E2E800] tracking-wider uppercase">
                  DIRECT PROMOTER INQUIRY
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-0.5">
                  Book Ronald 3D for Your Event
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#D6D6D6] uppercase mb-1.5">Nama Promoter / Agency *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ismaya Live / Zouk Group"
                      value={formData.promoterName}
                      onChange={(e) => setFormData({ ...formData, promoterName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#141414] border border-[#444444] text-xs sm:text-sm text-white placeholder:text-[#979797] focus:border-[#E2E800] focus:outline-none focus:shadow-[0_0_15px_rgba(226,232,0,0.25)] transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#D6D6D6] uppercase mb-1.5">Email Resmi *</label>
                    <input
                      type="email"
                      required
                      placeholder="booking@agency.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#141414] border border-[#444444] text-xs sm:text-sm text-white placeholder:text-[#979797] focus:border-[#E2E800] focus:outline-none focus:shadow-[0_0_15px_rgba(226,232,0,0.25)] transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#D6D6D6] uppercase mb-1.5">Nama Festival / Club *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Djakarta Warehouse Project"
                      value={formData.eventName}
                      onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#141414] border border-[#444444] text-xs sm:text-sm text-white placeholder:text-[#979797] focus:border-[#E2E800] focus:outline-none focus:shadow-[0_0_15px_rgba(226,232,0,0.25)] transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#D6D6D6] uppercase mb-1.5">Kota & Wilayah Paket</label>
                    <input
                      type="text"
                      placeholder="e.g. Jakarta (Jabodetabek) / Bandung / Bali"
                      value={formData.venueCity}
                      onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#141414] border border-[#444444] text-xs sm:text-sm text-white placeholder:text-[#979797] focus:border-[#E2E800] focus:outline-none focus:shadow-[0_0_15px_rgba(226,232,0,0.25)] transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#D6D6D6] uppercase mb-1.5">Estimasi Tanggal Acara</label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#141414] border border-[#444444] text-xs sm:text-sm text-white focus:border-[#E2E800] focus:outline-none focus:shadow-[0_0_15px_rgba(226,232,0,0.25)] transition-all font-mono font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#D6D6D6] uppercase mb-1.5">Detail Tambahan / Tawaran Rider</label>
                  <textarea
                    rows={3}
                    placeholder="Sebutkan kapasitas venue, durasi slot set (misal: 2 jam Headline), kesiapan akomodasi & fasilitas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#141414] border border-[#444444] text-xs sm:text-sm text-white placeholder:text-[#979797] focus:border-[#E2E800] focus:outline-none focus:shadow-[0_0_15px_rgba(226,232,0,0.25)] transition-all resize-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#E2E800] hover:bg-[#f2f716] text-[#141414] font-display font-black text-xs sm:text-sm tracking-wider shadow-xl shadow-[#E2E800]/30 hover:shadow-[#E2E800]/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Official Booking Inquiry</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
