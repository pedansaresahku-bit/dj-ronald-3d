import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle, Disc, Cpu, Shield, Send, Sparkles, Mail, User, MapPin } from 'lucide-react';

export default function EPKRider({ onBookingSubmit }) {
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
    onBookingSubmit(formData);
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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono font-semibold uppercase mb-3"
          >
            <FileText className="w-3.5 h-3.5 text-cyan" />
            <span>ELECTRONIC PRESS KIT & TECHNICAL RIDER</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3"
          >
            EPK & <span className="bg-gradient-to-r from-white via-cyan to-purple bg-clip-text text-transparent">Hospitality Rider</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base font-light"
          >
            Unduh materi promosi resmi beresolusi tinggi dan spesifikasi teknis panggung untuk kebutuhan festival & club promoter.
          </motion.p>
        </div>

        {/* Dual Column Layout: EPK Downloads & Tech Specs + Promoter Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Press Kit & Audio Specs (Left) */}
          <div className="lg:col-span-6 rounded-2xl p-6 sm:p-8 bg-obsidian-surface/90 border border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
            <div>
              <div className="border-b border-white/10 pb-4 mb-6">
                <span className="font-mono text-xs font-bold text-cyan tracking-wider uppercase">
                  OFFICIAL PROMOTER ASSETS
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-0.5">
                  Press Kit & Technical Specifications
                </h3>
              </div>

              {/* Download Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                <a
                  href="/asset/3d-logo.png"
                  download="Ronald3D_Official_Logo_Pack.png"
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan/40 hover:bg-cyan/5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan/10 text-cyan flex items-center justify-center">
                      <Disc className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold font-display text-white group-hover:text-cyan transition-colors">Official Logo Pack</h4>
                      <span className="text-[11px] text-gray-400 font-mono">PNG, SVG Vector, 3D Alpha</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-cyan transition-colors" />
                </a>

                <a
                  href="/asset/image-1.JPG"
                  download="Ronald3D_Press_Photos_2026.jpg"
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan/40 hover:bg-cyan/5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple/10 text-purple flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold font-display text-white group-hover:text-cyan transition-colors">Hi-Res Press Photos</h4>
                      <span className="text-[11px] text-gray-400 font-mono">300 DPI Stage & Studio</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-cyan transition-colors" />
                </a>
              </div>

              {/* Technical Stage Rider Requirements */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-mono font-bold text-gray-300 tracking-wider uppercase">
                  Technical Stage Requirements:
                </h4>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-white block">Console Setup:</strong>
                    <span className="text-xs text-gray-400">4x Pioneer CDJ-3000 + 1x Pioneer DJM-V10 / DJM-900NXS2 (Link LAN connected).</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-white block">Monitoring:</strong>
                    <span className="text-xs text-gray-400">2x High-end active stage monitors (d&b audiotechnik / L-Acoustics) with independent sub volume control.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-white block">Visual Sync & Power:</strong>
                    <span className="text-xs text-gray-400">Direct HDMI / SDI visual timecode feed for live 3D hologram stage sync + 2x 220V grounded power sockets.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mt-6 text-xs font-mono text-gray-400 flex items-center justify-between">
              <span>Management: info@ronald3d.com</span>
              <span className="text-cyan font-bold">Official Booking</span>
            </div>
          </div>

          {/* Promoter Booking Inquiry Form (Right) */}
          <div className="lg:col-span-6 rounded-2xl p-6 sm:p-8 bg-obsidian-surface/90 border border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
            <div>
              <div className="border-b border-white/10 pb-4 mb-6">
                <span className="font-mono text-xs font-bold text-purple tracking-wider uppercase">
                  DIRECT PROMOTER INQUIRY
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-0.5">
                  Book Ronald 3D for Your Event
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono text-gray-300 mb-1">Nama Promoter / Agency *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ismaya Live / Zouk Group"
                      value={formData.promoterName}
                      onChange={(e) => setFormData({ ...formData, promoterName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:border-cyan focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-gray-300 mb-1">Email Resmi *</label>
                    <input
                      type="email"
                      required
                      placeholder="booking@agency.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:border-cyan focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono text-gray-300 mb-1">Nama Festival / Club *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Djakarta Warehouse Project"
                      value={formData.eventName}
                      onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:border-cyan focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-gray-300 mb-1">Kota & Negara</label>
                    <input
                      type="text"
                      placeholder="e.g. Bali, Indonesia"
                      value={formData.venueCity}
                      onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:border-cyan focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1">Estimasi Tanggal Acara</label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:border-cyan focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1">Detail Tambahan / Tawaran Rider</label>
                  <textarea
                    rows={3}
                    placeholder="Sebutkan kapasitas venue, durasi slot set (misal: 2 jam Headline), dan spesifikasi panggung..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:border-cyan focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan to-blue-500 text-black font-display font-bold text-xs sm:text-sm tracking-wider shadow-xl shadow-cyan/20 hover:shadow-cyan/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-2"
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
