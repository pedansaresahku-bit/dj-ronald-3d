import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Disc, Waves, Sparkles, Quote, Globe2 } from 'lucide-react';

export default function AboutMe() {
  return (
    <section id="about-me" className="py-24 relative z-10">
      <div className="w-[92%] max-w-[1560px] mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E800]/15 border border-[#E2E800]/40 text-[#E2E800] text-xs font-mono font-bold uppercase mb-3 shadow-md shadow-[#E2E800]/15"
          >
            <User className="w-3.5 h-3.5 text-[#E2E800]" />
            <span>BIOGRAPHY & SOUND ARCHITECTURE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF] tracking-tight mb-3"
          >
            About <span className="bg-gradient-to-r from-white via-[#E2E800] to-[#979797] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(226,232,0,0.35)]">Ronald 3D</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#D6D6D6] text-sm sm:text-base font-normal"
          >
            Pelopor revolusi electronic dance music modern dengan integrasi audio spasial 3 dimensi dan visual panggung imersif.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Visual Showcase Card (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 rounded-3xl overflow-hidden relative min-h-[440px] border border-[#444444] hover:border-[#E2E800] shadow-2xl group flex flex-col justify-end p-6 sm:p-8 bg-[#1e1e1e] transition-all"
          >
            <img
              src="/asset/image-2.JPG"
              alt="DJ Ronald 3D Performance"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414]/90 backdrop-blur-md border border-[#E2E800]/60 text-[#E2E800] text-xs font-mono font-black uppercase mb-2 shadow-md shadow-[#E2E800]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#E2E800]" /> 3D DIMENSIONAL AUDIO
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white mb-2 drop-shadow-md">
                Spatial Sound & Live Synth Architect
              </h3>
              <p className="text-xs sm:text-sm text-[#D6D6D6] font-sans leading-relaxed">
                Menghadirkan frekuensi harmonik melodis yang bergerak melintasi ruang panggung dengan presisi tinggi.
              </p>
            </div>
          </motion.div>

          {/* Narrative & Capabilities Card (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-[#1e1e1e]/95 border border-[#444444] shadow-2xl backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 border-b border-[#444444] pb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E2E800]/15 border border-[#E2E800]/40 text-[#E2E800] flex items-center justify-center shadow-lg shadow-[#E2E800]/15">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs font-black text-[#E2E800] uppercase tracking-wider block">THE ARTISTIC PHILOSOPHY</span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">Harmoni Dimensi Elektronik</h3>
                </div>
              </div>

              <div className="text-[#D6D6D6] text-sm sm:text-base leading-relaxed space-y-3.5 font-normal mb-6">
                <p>
                  <strong className="text-white font-bold">Ronald 3D</strong> memadukan kedalaman emosional <em className="text-[#E2E800] font-semibold">Melodic Techno</em> dengan groove bertenaga <em className="text-white font-semibold">Tech House</em>, menciptakan pengalaman sonik yang menggetarkan panggung festival dari Indonesia hingga sirkuit rave internasional.
                </p>
                <p>
                  Melalui set panggung yang memadukan 4-deck Pioneer CDJ-3000, analog filter sweeps, dan modulasi synthesizer live, setiap penampilan adalah perjalanan multidimensi yang dirancang khusus untuk crowd energi tinggi.
                </p>
              </div>

              {/* Skills / Sound Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#444444] hover:border-[#E2E800]/50 transition-all flex items-start gap-3 shadow-inner">
                  <Waves className="w-5 h-5 text-[#E2E800] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-white font-display">3D Spatial Acoustics</strong>
                    <span className="text-[11px] text-[#979797] font-sans font-medium">Multi-channel surround audio engineering</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#444444] hover:border-[#E2E800]/50 transition-all flex items-start gap-3 shadow-inner">
                  <Disc className="w-5 h-5 text-[#E2E800] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-white font-display">Quad CDJ Mastery</strong>
                    <span className="text-[11px] text-[#979797] font-sans font-medium">Live harmonic key mixing & stem layering</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#444444] hover:border-[#E2E800]/50 transition-all flex items-start gap-3 shadow-inner">
                  <Cpu className="w-5 h-5 text-[#E2E800] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-white font-display">Live Analog Synths</strong>
                    <span className="text-[11px] text-[#979797] font-sans font-medium">Real-time oscillator & filter modulation</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#444444] hover:border-[#E2E800]/50 transition-all flex items-start gap-3 shadow-inner">
                  <Globe2 className="w-5 h-5 text-[#E2E800] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-white font-display">Global Tour Circuit</strong>
                    <span className="text-[11px] text-[#979797] font-sans font-medium">Jakarta, Bali, Singapore, Bangkok, Tokyo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Ticker */}
            <div className="p-4 rounded-2xl bg-[#141414] border-l-4 border-[#E2E800] flex items-start gap-3 mb-4 shadow-md">
              <Quote className="w-5 h-5 text-[#E2E800] shrink-0 mt-0.5" />
              <div>
                <p className="italic text-xs sm:text-sm text-[#D6D6D6] font-serif leading-relaxed">
                  "Musik adalah arsitektur gelombang tak kasat mata. Kami tidak hanya memutar trek, kami membangun dunia 3 dimensi di mana pendengar larut dalam ritme."
                </p>
                <span className="block text-[11px] font-mono font-black text-[#E2E800] mt-1.5 tracking-wider">— RONALD 3D</span>
              </div>
            </div>

            {/* Official Social Media Badges */}
            <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-[#444444]">
              <span className="text-[11px] font-mono font-bold text-[#979797] mr-1">FOLLOW:</span>
              <a
                href="https://www.instagram.com/ronald_3d/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#141414] hover:bg-[#e1306c] hover:text-white border border-[#444444] text-[11px] font-mono font-bold text-[#D6D6D6] transition-all shadow-sm"
              >
                Instagram (@ronald_3d)
              </a>
              <a
                href="https://www.youtube.com/c/Ronald3D"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#141414] hover:bg-[#ff0000] hover:text-white border border-[#444444] text-[11px] font-mono font-bold text-[#D6D6D6] transition-all shadow-sm"
              >
                YouTube (Ronald 3D)
              </a>
              <a
                href="https://www.tiktok.com/@ronald.3d"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#141414] hover:bg-[#E2E800] hover:text-[#141414] border border-[#444444] text-[11px] font-mono font-bold text-[#D6D6D6] transition-all shadow-sm"
              >
                TikTok (@ronald.3d)
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
