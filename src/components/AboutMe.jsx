import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Music2, Disc, Waves, Sparkles, Quote, Globe2, Award } from 'lucide-react';

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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono font-semibold uppercase mb-3"
          >
            <User className="w-3.5 h-3.5 text-cyan" />
            <span>BIOGRAPHY & SOUND ARCHITECTURE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3"
          >
            About <span className="bg-gradient-to-r from-white via-cyan to-purple bg-clip-text text-transparent">Ronald 3D</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base font-light"
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
            className="lg:col-span-5 rounded-2xl overflow-hidden relative min-h-[440px] border border-white/10 shadow-2xl group flex flex-col justify-end p-6 bg-obsidian-surface"
          >
            <img
              src="/asset/image-2.JPG"
              alt="DJ Ronald 3D Performance"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/20 backdrop-blur-md border border-cyan/40 text-cyan text-xs font-mono font-bold uppercase mb-2">
                <Sparkles className="w-3 h-3 text-cyan" /> 3D DIMENSIONAL AUDIO
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
                Spatial Sound & Live Synth Architect
              </h3>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
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
            className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-obsidian-surface/85 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-purple uppercase tracking-wider block">THE ARTISTIC PHILOSOPHY</span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">Harmoni Dimensi Elektronik</h3>
                </div>
              </div>

              <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-3.5 font-light mb-6">
                <p>
                  <strong>Ronald 3D</strong> memadukan kedalaman emosional <em>Melodic Techno</em> dengan groove bertenaga <em>Tech House</em>, menciptakan pengalaman sonik yang menggetarkan panggung festival dari Indonesia hingga sirkuit rave internasional.
                </p>
                <p>
                  Melalui set panggung yang memadukan 4-deck Pioneer CDJ-3000, analog filter sweeps, dan modulasi synthesizer live, setiap penampilan adalah perjalanan multidimensi yang dirancang khusus untuk crowd energi tinggi.
                </p>
              </div>

              {/* Skills / Sound Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <Waves className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-white font-display">3D Spatial Acoustics</strong>
                    <span className="text-[11px] text-gray-400 font-sans">Multi-channel surround audio engineering</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <Disc className="w-5 h-5 text-purple shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-white font-display">Quad CDJ Mastery</strong>
                    <span className="text-[11px] text-gray-400 font-sans">Live harmonic key mixing & stem layering</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-white font-display">Live Analog Synths</strong>
                    <span className="text-[11px] text-gray-400 font-sans">Real-time oscillator & filter modulation</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <Globe2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-white font-display">Global Tour Circuit</strong>
                    <span className="text-[11px] text-gray-400 font-sans">Jakarta, Bali, Singapore, Bangkok, Tokyo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Ticker */}
            <div className="p-4 rounded-xl bg-black/40 border-l-4 border-cyan flex items-start gap-3 mb-4">
              <Quote className="w-5 h-5 text-cyan shrink-0 mt-0.5 opacity-80" />
              <div>
                <p className="italic text-xs sm:text-sm text-gray-200 font-serif leading-relaxed">
                  "Musik adalah arsitektur gelombang tak kasat mata. Kami tidak hanya memutar trek, kami membangun dunia 3 dimensi di mana pendengar larut dalam ritme."
                </p>
                <span className="block text-[11px] font-mono font-bold text-cyan mt-1">— RONALD 3D</span>
              </div>
            </div>

            {/* Official Social Media Badges */}
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-white/5">
              <span className="text-[11px] font-mono text-gray-400 mr-1">FOLLOW:</span>
              <a
                href="https://www.instagram.com/ronald_3d/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#e1306c]/20 hover:text-white border border-white/10 hover:border-[#e1306c]/40 text-[11px] font-mono text-gray-300 transition-all"
              >
                Instagram (@ronald_3d)
              </a>
              <a
                href="https://www.youtube.com/c/Ronald3D"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#ff0000]/20 hover:text-white border border-white/10 hover:border-[#ff0000]/40 text-[11px] font-mono text-gray-300 transition-all"
              >
                YouTube (Ronald 3D)
              </a>
              <a
                href="https://www.tiktok.com/@ronald.3d"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-cyan/20 hover:text-cyan border border-white/10 hover:border-cyan/40 text-[11px] font-mono text-gray-300 transition-all"
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
