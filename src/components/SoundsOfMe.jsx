import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Radio, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ExternalLink, Sparkles, Youtube, Disc, Video } from 'lucide-react';
import { TRACKS_DATA } from '../data/tracksData';

export default function SoundsOfMe({
  activeTrackIndex,
  isPlaying,
  playProgress,
  onSelectTrack,
  onTogglePlay,
  onPrevTrack,
  onNextTrack,
  onScrub
}) {
  const currentTrack = TRACKS_DATA[activeTrackIndex] || TRACKS_DATA[0];

  // Video preview player state
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const currentPercent = (playProgress / currentTrack.durationSec) * 100;

  return (
    <section id="sounds-of-me" className="py-24 relative z-10">
      <div className="w-[92%] max-w-[1560px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan/15 border border-cyan/40 text-cyan text-xs font-mono font-bold uppercase mb-3 shadow-md shadow-cyan/15"
          >
            <Radio className="w-3.5 h-3.5 text-cyan" />
            <span>SOUNDS OF RONALD 3D</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3"
          >
            Sounds of <span className="bg-gradient-to-r from-white via-cyan to-purple bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">Ronald 3D</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 text-sm sm:text-base font-normal"
          >
            Dengarkan trek orisinal, live recording, dan remix eksklusif di berbagai platform musik digital terkemuka.
          </motion.p>
        </div>

        {/* Media Channels Quick Access Bar */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap p-3 rounded-full bg-obsidian-surface/90 border border-white/15 backdrop-blur-xl mb-12 max-w-4xl mx-auto shadow-xl">
          <a
            href="https://open.spotify.com/artist/3HkeKnw42As9Ag8BluG93o"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#1db954] hover:text-black text-xs font-bold text-white flex items-center gap-1.5 border border-white/15 transition-all shadow-sm"
          >
            <Disc className="w-3.5 h-3.5 text-[#1db954] group-hover:text-black" /> Spotify
          </a>

          <a
            href="https://soundcloud.com/ronald3d"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#ff5500] hover:text-white text-xs font-bold text-white flex items-center gap-1.5 border border-white/15 transition-all shadow-sm"
          >
            <Radio className="w-3.5 h-3.5 text-[#ff5500]" /> SoundCloud
          </a>

          <a
            href="https://www.youtube.com/c/Ronald3D"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#ff0000] hover:text-white text-xs font-bold text-white flex items-center gap-1.5 border border-white/15 transition-all shadow-sm"
          >
            <Youtube className="w-3.5 h-3.5 text-[#ff0000]" /> YouTube
          </a>

          <a
            href="https://www.instagram.com/ronald_3d/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#e1306c] hover:text-white text-xs font-bold text-white flex items-center gap-1.5 border border-white/15 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e1306c]" /> Instagram (@ronald_3d)
          </a>

          <a
            href="https://www.tiktok.com/@ronald.3d"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-cyan hover:text-black text-xs font-bold text-white hover:text-black flex items-center gap-1.5 border border-white/15 transition-all shadow-sm"
          >
            <Video className="w-3.5 h-3.5 text-cyan" /> TikTok (@ronald.3d)
          </a>
        </div>

        {/* Dual Column Layout: Synthesizer Player + Live Video Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Web Audio Synthesizer Showcase Card (Left) */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-obsidian-surface/90 border border-white/15 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="font-mono text-xs font-black text-cyan tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan" /> 3D SPATIAL SYNTHESIZER ENGINE
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-white mt-1">Interactive Sound Lab</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-sm ${
                  isPlaying ? 'bg-cyan text-black' : 'bg-white/10 text-slate-300'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-black animate-ping' : 'bg-gray-400'}`} />
                  {isPlaying ? 'AUDIO ACTIVE' : 'PAUSED'}
                </div>
              </div>

              {/* Current Track Showcase */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                {/* Cover Art with Play Overlay */}
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-2xl border border-cyan/40 shrink-0 group">
                  <img
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <button
                    onClick={onTogglePlay}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyan text-black flex items-center justify-center shadow-lg shadow-cyan/50 hover:scale-110 transition-transform"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                  </button>
                </div>

                {/* Track Meta Details */}
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-mono font-black text-cyan uppercase tracking-wider block mb-1">
                    {currentTrack.genre}
                  </span>
                  <h4 className="font-display font-extrabold text-xl text-white mb-1">
                    {currentTrack.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-sans font-medium mb-3">
                    Produced & Mastered by Ronald 3D
                  </p>

                  {/* External Platform Links */}
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <a
                      href={currentTrack.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 border border-white/20 text-white hover:bg-cyan hover:text-black hover:border-cyan transition-all flex items-center gap-1.5"
                    >
                      Stream Track <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Interactive Audio Waveform Scrubber */}
              <div 
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percent = Math.max(0, Math.min(1, clickX / rect.width));
                  onScrub(percent * currentTrack.durationSec);
                }}
                className="relative h-14 bg-black/70 rounded-2xl p-2.5 cursor-pointer overflow-hidden border border-white/15 mb-2 flex items-center shadow-inner"
              >
                {/* Animated Wave Bars */}
                <div className="flex items-center justify-between w-full h-full gap-[3px]">
                  {Array.from({ length: 48 }).map((_, barIdx) => {
                    const barPercent = (barIdx / 48) * 100;
                    const isPassed = barPercent <= currentPercent;
                    const randomHeight = Math.max(25, Math.sin(barIdx * 0.3) * 45 + Math.cos(barIdx * 0.8) * 30 + 35);

                    return (
                      <div
                        key={barIdx}
                        className={`flex-1 rounded-full transition-all duration-150 ${
                          isPassed
                            ? 'bg-cyan shadow-[0_0_8px_rgba(0,240,255,0.9)]'
                            : 'bg-white/30'
                        }`}
                        style={{
                          height: isPlaying ? `${Math.min(100, randomHeight + (Math.sin(barIdx + playProgress) * 20))}%` : `${randomHeight}%`
                        }}
                      />
                    );
                  })}
                </div>

                {/* Progress Overlay */}
                <div
                  className="absolute inset-y-0 left-0 bg-cyan/15 pointer-events-none"
                  style={{ width: `${currentPercent}%` }}
                />
              </div>

              {/* Time Counter */}
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 mb-6">
                <span>{formatTime(playProgress)}</span>
                <span className="text-cyan font-black">{formatTime(currentTrack.durationSec)}</span>
              </div>
            </div>

            {/* Transport Control Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={onPrevTrack}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-cyan hover:text-black transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={onTogglePlay}
                  className="w-12 h-12 rounded-full bg-cyan text-black flex items-center justify-center hover:scale-105 shadow-lg shadow-cyan/40 transition-transform font-bold"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                </button>

                <button
                  onClick={onNextTrack}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-cyan hover:text-black transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Track Switcher Queue */}
              <div className="flex items-center gap-2 overflow-x-auto">
                {TRACKS_DATA.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTrack(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      idx === activeTrackIndex
                        ? 'bg-cyan text-black font-black shadow-md shadow-cyan/30'
                        : 'bg-white/10 border border-white/10 text-slate-200 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Video Performance Card (Right) */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden bg-obsidian-surface/90 border border-white/15 shadow-2xl backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-black text-cyan uppercase tracking-wider flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-cyan" /> FESTIVAL VIDEO CAPTURE
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-red-500/25 text-red-300 border border-red-500/40 font-black flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" /> LIVE
                </span>
              </div>

              {/* Video Player Box */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black mb-4 group cursor-pointer" onClick={toggleVideoPlay}>
                <video
                  ref={videoRef}
                  src="/asset/hero.mp4"
                  poster="/asset/image-1.JPG"
                  loop
                  muted={isVideoMuted}
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover filter saturate-110"
                />

                {/* Big Center Play Trigger when Paused */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-cyan text-black flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-transform z-10">
                    <Play className="w-6 h-6 fill-black ml-0.5" />
                  </div>
                )}

                {/* Floating Video Controls */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={toggleVideoMute}
                    className="w-8 h-8 rounded-full bg-black/80 border border-white/25 text-white flex items-center justify-center hover:bg-cyan hover:text-black transition-all"
                  >
                    {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={toggleVideoPlay}
                    className="w-8 h-8 rounded-full bg-black/80 border border-white/25 text-white flex items-center justify-center hover:bg-cyan hover:text-black transition-all"
                  >
                    {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <h4 className="font-display font-black text-lg text-white mb-1">
                Neon Horizon World Tour Showcase
              </h4>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                Live 3D hologram stage visuals, synchronized laser mapping, dan spatial sub-bass audio system.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-300">4K Ultra HD • 60 FPS Feed</span>
              <a
                href="#stage-gallery"
                className="text-xs font-bold text-cyan hover:underline flex items-center gap-1"
              >
                View Press Kit Galery &rarr;
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
