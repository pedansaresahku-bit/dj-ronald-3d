import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, ExternalLink, Disc, Play, Sparkles } from 'lucide-react';
import { DEFAULT_SOUNDCLOUD_TRACKS } from '../services/soundCloudService';

export default function SoundsOfMe({ onViewAllSounds }) {
  const [selectedTrackUrl, setSelectedTrackUrl] = useState(
    'https://soundcloud.com/ronald3d'
  );

  const playlistEmbedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    selectedTrackUrl
  )}&color=%23e2e800&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false`;

  return (
    <section id="sounds-of-me" className="py-24 relative z-10">
      <div className="w-[92%] max-w-[1300px] mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E800]/15 border border-[#E2E800]/40 text-[#E2E800] text-xs font-mono font-bold uppercase mb-3 shadow-md shadow-[#E2E800]/15"
          >
            <Radio className="w-3.5 h-3.5 text-[#E2E800]" />
            <span>SOUNDS OF RONALD 3D</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3"
          >
            Sounds of <span className="bg-gradient-to-r from-white via-[#E2E800] to-[#979797] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(226,232,0,0.35)]">Ronald 3D</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#D6D6D6] text-sm sm:text-base font-normal mb-6"
          >
            Dengarkan trek orisinal, live sets, dan remix eksklusif resmi langsung dari SoundCloud Ronald 3D.
          </motion.p>
        </div>

        {/* Main SoundCloud Playlist Embed Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-5 sm:p-8 bg-[#1e1e1e]/95 border border-[#444444] shadow-2xl backdrop-blur-2xl"
        >
          {/* Top Bar with Profile Info and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#444444] mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff5500] to-[#e2e800] p-0.5 shadow-lg shadow-[#ff5500]/20 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#141414] rounded-[14px] flex items-center justify-center">
                  <Radio className="w-6 h-6 text-[#E2E800]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                    SoundCloud Official Playlist
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#E2E800]/20 text-[#E2E800] border border-[#E2E800]/40 font-bold">
                    LIVE SYNC
                  </span>
                </div>
                <p className="text-xs text-[#979797] font-mono">
                  soundcloud.com/ronald3d &bull; Breakbeat, Dutch House, Club Mix
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={() => setSelectedTrackUrl('https://soundcloud.com/ronald3d')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                  selectedTrackUrl === 'https://soundcloud.com/ronald3d'
                    ? 'bg-[#E2E800] text-[#141414] border-[#E2E800] shadow-md shadow-[#E2E800]/25'
                    : 'bg-[#141414] text-[#D6D6D6] border-[#444444] hover:border-[#979797]'
                }`}
              >
                All Tracks
              </button>
              <a
                href="https://soundcloud.com/ronald3d"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff5500] hover:bg-[#ff5500]/90 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#ff5500]/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>Buka di SoundCloud</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Embedded SoundCloud Player Iframe */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-[#333333] bg-[#141414] shadow-inner">
            <iframe
              width="100%"
              height="450"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              title="Ronald 3D SoundCloud Playlist"
              src={playlistEmbedUrl}
              className="w-full filter contrast-105"
            />
          </div>

          {/* Quick Track Switcher Bar */}
          <div className="mt-6 pt-5 border-t border-[#444444]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-[#E2E800] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E2E800]" /> Quick Selection
              </span>
              <span className="text-[11px] font-mono text-[#979797]">
                Klik trek untuk memuat langsung ke player
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {DEFAULT_SOUNDCLOUD_TRACKS.map((track) => {
                const isSelected = selectedTrackUrl === track.trackUrl;
                return (
                  <button
                    key={track.id}
                    onClick={() => setSelectedTrackUrl(track.trackUrl)}
                    className={`text-left p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-[#E2E800]/15 border-[#E2E800] shadow-md shadow-[#E2E800]/15'
                        : 'bg-[#141414] border-[#444444] hover:border-[#666666]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#444444] relative">
                      <img
                        src={track.thumbnail}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-[#E2E800] text-[#E2E800]" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white truncate">
                        {track.title}
                      </h4>
                      <p className="text-[11px] font-mono text-[#979797]">
                        {track.genre} &bull; {track.plays}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
