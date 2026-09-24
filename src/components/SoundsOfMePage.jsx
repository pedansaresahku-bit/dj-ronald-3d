import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Youtube,
  Disc,
  Radio,
  Sparkles,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Eye,
  CheckCircle2,
  Share2,
  Music2,
  Headphones,
  RefreshCw
} from 'lucide-react';
import { fetchLatestYouTubeVideos, DEFAULT_YOUTUBE_VIDEOS, OFFICIAL_RONALD3D_CHANNEL } from '../services/youtubeService';
import { fetchLatestSoundCloudTracks, DEFAULT_SOUNDCLOUD_TRACKS, OFFICIAL_SOUNDCLOUD_PROFILE } from '../services/soundCloudService';
import { fetchLatestSpotifyReleases, DEFAULT_SPOTIFY_TRACKS, OFFICIAL_SPOTIFY_CONFIG } from '../services/spotifyService';

export default function SoundsOfMePage({
  onBackToHome,
  onOpenEPKModal
}) {
  // Navigation tabs: 'all' | 'youtube' | 'spotify' | 'soundcloud'
  const [activeTab, setActiveTab] = useState('all');

  // --- YouTube Videos State ---
  const [ytVideos, setYtVideos] = useState(DEFAULT_YOUTUBE_VIDEOS);
  const [activeYtIndex, setActiveYtIndex] = useState(0);
  const [isLiveYtFeed, setIsLiveYtFeed] = useState(false);
  const [isSyncingYt, setIsSyncingYt] = useState(false);

  const handleSyncYouTube = async () => {
    setIsSyncingYt(true);
    const res = await fetchLatestYouTubeVideos();
    setYtVideos(res.videos);
    setIsLiveYtFeed(res.isLiveFeed);
    setTimeout(() => setIsSyncingYt(false), 600);
  };

  // --- SoundCloud Tracks State ---
  const [scTracks, setScTracks] = useState(DEFAULT_SOUNDCLOUD_TRACKS);
  const [activeScIndex, setActiveScIndex] = useState(0);
  const [isLiveScFeed, setIsLiveScFeed] = useState(false);
  const [isSyncingSc, setIsSyncingSc] = useState(false);
  const [activeScEmbed, setActiveScEmbed] = useState(DEFAULT_SOUNDCLOUD_TRACKS[0]?.embedUrl || OFFICIAL_SOUNDCLOUD_PROFILE.embedUrl);

  const handleSyncSoundCloud = async () => {
    setIsSyncingSc(true);
    const res = await fetchLatestSoundCloudTracks();
    setScTracks(res.tracks);
    setIsLiveScFeed(res.isLive);
    setTimeout(() => setIsSyncingSc(false), 600);
  };

  // --- Spotify Tracks State ---
  const [spTracks, setSpTracks] = useState(DEFAULT_SPOTIFY_TRACKS);
  const [activeSpIndex, setActiveSpIndex] = useState(0);
  const [isSyncingSp, setIsSyncingSp] = useState(false);
  const [activeSpotifyEmbed, setActiveSpotifyEmbed] = useState(OFFICIAL_SPOTIFY_CONFIG.artistEmbedUrl);

  const handleSyncSpotify = async () => {
    setIsSyncingSp(true);
    const res = await fetchLatestSpotifyReleases();
    setSpTracks(res.tracks);
    setTimeout(() => setIsSyncingSp(false), 600);
  };

  useEffect(() => {
    handleSyncYouTube();
    handleSyncSoundCloud();
    handleSyncSpotify();
  }, []);

  const activeVideo = ytVideos[activeYtIndex] || ytVideos[0];
  const activeScTrack = scTracks[activeScIndex] || scTracks[0];

  return (
    <div className="min-h-screen bg-[#141414] text-[#D6D6D6] pt-24 pb-24 selection:bg-[#E2E800] selection:text-[#141414]">

      {/* Ambient Radial Background Glows */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[600px] h-[350px] bg-[#E2E800]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[350px] bg-[#ff0000]/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="w-[92%] max-w-[1560px] mx-auto relative z-10">

        {/* Top Breadcrumb & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#444444]">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e1e1e] hover:bg-[#E2E800] hover:text-[#141414] border border-[#444444] hover:border-[#E2E800] text-xs font-mono font-bold text-white transition-all w-fit group shadow-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#E2E800] group-hover:text-[#141414]" />
            <span>KEMBALI KE BERANDA</span>
          </button>

          {/* Social Streaming Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href={OFFICIAL_RONALD3D_CHANNEL.videosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#1e1e1e] hover:bg-[#ff0000] hover:text-white border border-[#444444] text-xs font-mono font-bold text-[#D6D6D6] flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Youtube className="w-3.5 h-3.5 text-[#ff0000] group-hover:text-white" />
              <span>YouTube (@Ronald3D)</span>
            </a>
            <a
              href={OFFICIAL_SPOTIFY_CONFIG.artistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#1e1e1e] hover:bg-[#1db954] hover:text-black border border-[#444444] text-xs font-mono font-bold text-[#D6D6D6] flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Disc className="w-3.5 h-3.5 text-[#1db954]" />
              <span>Spotify</span>
            </a>
            <a
              href={OFFICIAL_SOUNDCLOUD_PROFILE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#1e1e1e] hover:bg-[#ff5500] hover:text-white border border-[#444444] text-xs font-mono font-bold text-[#D6D6D6] flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Radio className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>SoundCloud</span>
            </a>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E2E800]/15 border border-[#E2E800]/40 text-[#E2E800] text-xs font-mono font-bold uppercase mb-4 shadow-md shadow-[#E2E800]/15"
          >
            <Headphones className="w-4 h-4 text-[#E2E800]" />
            <span>OFFICIAL AUDIO, VIDEO & STREAMING HUB</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4"
          >
            Sounds of <span className="bg-gradient-to-r from-white via-[#E2E800] to-[#979797] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(226,232,0,0.4)]">Ronald 3D</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#D6D6D6] text-sm sm:text-base font-normal leading-relaxed"
          >
            Pusat terintegrasi pemutaran video resmi YouTube (otomatis 4 video terbaru), trek SoundCloud resmi, dan playlist Spotify Ronald 3D.
          </motion.p>
        </div>

        {/* Navigation Category Pill Filter */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {[
            { id: 'all', label: 'Semua Media', icon: Sparkles },
            { id: 'youtube', label: 'YouTube Video (4 Terakhir)', icon: Youtube },
            { id: 'soundcloud', label: 'SoundCloud Sets (Live Sync)', icon: Radio },
            { id: 'spotify', label: 'Spotify Playlist & Tracks', icon: Disc }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wide transition-all ${isActive
                  ? 'bg-[#E2E800] text-[#141414] font-black shadow-lg shadow-[#E2E800]/30 scale-105'
                  : 'bg-[#1e1e1e] border border-[#444444] text-[#D6D6D6] hover:text-white hover:border-[#E2E800]/50 hover:bg-[#242424]'
                  }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#141414]' : 'text-[#E2E800]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: YOUTUBE EMBED THEATER & 4 LATEST VIDEOS LIST (AUTO-UPDATES) */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'youtube') && (
          <section className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-[#444444]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ff0000]/15 border border-[#ff0000]/40 text-[#ff0000] flex items-center justify-center shadow-lg shadow-[#ff0000]/20">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                      YouTube <span className="text-[#ff0000]">Video Embed</span>
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#ff0000]/20 text-[#ff4d4d] border border-[#ff0000]/40 uppercase">
                      @Ronald3D
                    </span>
                  </div>
                  <p className="text-xs text-[#979797] font-mono">
                    {isLiveYtFeed
                      ? 'Otomatis tersinkronisasi langsung dari feed https://www.youtube.com/@Ronald3D/videos'
                      : 'Menampilkan 4 video mixtape & kolaborasi terbaru dari channel @Ronald3D'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={handleSyncYouTube}
                  disabled={isSyncingYt}
                  className="px-3.5 py-2 rounded-full bg-[#1e1e1e] hover:bg-[#242424] border border-[#444444] text-xs font-mono font-bold text-[#D6D6D6] hover:text-white flex items-center gap-1.5 transition-all shadow-sm"
                  title="Cek & Refresh Video Terbaru"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#E2E800] ${isSyncingYt ? 'animate-spin' : ''}`} />
                  <span>{isSyncingYt ? 'Memeriksa...' : 'Sinkronkan'}</span>
                </button>

                <a
                  href="https://www.youtube.com/@Ronald3D/videos?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#ff0000] hover:bg-[#ff0000]/90 text-white font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#ff0000]/30 transition-all hover:scale-105 w-fit"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Buka Channel</span>
                </a>
              </div>
            </div>

            {/* YouTube Grid: Main Theater Player + 4 Latest Videos Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Main Cinema Theater Iframe Embed (Left - 7 cols) */}
              <div className="lg:col-span-7 rounded-3xl overflow-hidden bg-[#1e1e1e]/95 border border-[#444444] shadow-2xl backdrop-blur-2xl p-4 sm:p-6">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-[#444444] mb-4">
                  <iframe
                    key={activeVideo?.youtubeId || activeVideo?.id}
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo?.youtubeId || activeVideo?.id}?autoplay=1&rel=0&modestbranding=1`}
                    title={activeVideo?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-cover border-0"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#ff0000]/20 text-[#ff4d4d] border border-[#ff0000]/40 uppercase mb-1.5">
                      <span>{activeVideo?.tag || 'OFFICIAL 4K VIDEO'}</span>
                    </div>
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                      {activeVideo?.title}
                    </h3>
                  </div>

                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideo?.youtubeId || activeVideo?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#141414] hover:bg-[#ff0000] hover:text-white border border-[#444444] text-xs font-mono font-bold text-[#D6D6D6] flex items-center gap-1.5 transition-all shrink-0 w-fit"
                  >
                    <span>Tonton di YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 4 Latest Video Cards (Right - 5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3.5">
                <div className="flex items-center justify-between px-2 mb-1">
                  <span className="text-xs font-mono font-black text-[#E2E800] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 4 UPLOAD VIDEO TERAKHIR @RONALD3D
                  </span>
                  <span className="text-[11px] font-mono text-[#979797]">Klik untuk memutar</span>
                </div>

                {ytVideos.slice(0, 4).map((video, idx) => {
                  const isSelected = (idx === activeYtIndex);
                  return (
                    <div
                      key={video.id + idx}
                      onClick={() => setActiveYtIndex(idx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 group ${isSelected
                        ? 'bg-[#1e1e1e] border-[#E2E800] shadow-[0_0_20px_rgba(226,232,0,0.25)] ring-1 ring-[#E2E800]/50'
                        : 'bg-[#1e1e1e]/80 border-[#444444] hover:border-[#979797] hover:bg-[#242424]'
                        }`}
                    >
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-black border border-[#444444]">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md ${isSelected ? 'bg-[#E2E800] text-[#141414]' : 'bg-black/80 text-white group-hover:bg-[#E2E800] group-hover:text-[#141414]'
                            }`}>
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          </div>
                        </div>

                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono font-bold text-white">
                          {video.duration}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono font-black text-[#E2E800] uppercase">
                            #{idx + 1} {video.tag}
                          </span>
                        </div>
                        <h4 className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug mb-1 transition-colors ${isSelected ? 'text-[#E2E800]' : 'text-white group-hover:text-[#E2E800]'
                          }`}>
                          {video.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-[#979797]">
                          <span>{video.author || 'Ronald 3D'}</span>
                          <span>&bull;</span>
                          <span>{video.views}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: SOUNDCLOUD OFFICIAL EMBED PLAYER (EXACT USER SPEC) */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'soundcloud') && (
          <section className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-[#444444]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ff5500]/15 border border-[#ff5500]/40 text-[#ff5500] flex items-center justify-center shadow-lg shadow-[#ff5500]/20">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                      SoundCloud <span className="text-[#ff5500]">Official Embed</span>
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#ff5500]/20 text-[#ff7733] border border-[#ff5500]/40 uppercase">
                      Live Playlist
                    </span>
                  </div>
                  <p className="text-xs text-[#979797] font-mono">
                    Official SoundCloud player widget &bull; Pembaruan otomatis setiap kali ada upload trek baru di soundcloud.com/ronald3d
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <a
                  href={OFFICIAL_SOUNDCLOUD_PROFILE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#ff5500] hover:bg-[#ff5500]/90 text-white font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#ff5500]/30 transition-all hover:scale-105 w-fit"
                >
                  <Radio className="w-4 h-4" />
                  <span>Kunjungi Akun SoundCloud</span>
                </a>
              </div>
            </div>

            {/* SoundCloud Official Embed Widget Box */}
            <div className="rounded-3xl p-4 sm:p-6 bg-[#1e1e1e]/95 border border-[#444444] shadow-2xl backdrop-blur-2xl">
              <div className="w-full rounded-2xl overflow-hidden border border-[#444444] shadow-2xl bg-black min-h-[460px]">
                <iframe
                  width="100%"
                  height="460"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ronald3d&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                  title="Ronald 3D Official SoundCloud Playlist Embed"
                  className="w-full rounded-2xl"
                />
              </div>

              <div className="pt-4 mt-3 border-t border-[#444444] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#979797]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
                  <span>Live Stream & Playlist Sync: soundcloud.com/ronald3d</span>
                </div>
                <a
                  href={OFFICIAL_SOUNDCLOUD_PROFILE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff5500] hover:underline font-bold flex items-center gap-1"
                >
                  Buka di SoundCloud App &rarr;
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: SPOTIFY OFFICIAL EMBED PLAYER (EXACT USER SPEC) */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'spotify') && (
          <section className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-[#444444]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1db954]/15 border border-[#1db954]/40 text-[#1db954] flex items-center justify-center shadow-lg shadow-[#1db954]/20">
                  <Disc className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                      Spotify <span className="text-[#1db954]">Official Embed</span>
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#1db954]/20 text-[#1db954] border border-[#1db954]/40 uppercase">
                      Live Discography
                    </span>
                  </div>
                  <p className="text-xs text-[#979797] font-mono">
                    Official Spotify player widget &bull; Pembaruan otomatis dari katalog rilisan Spotify Ronald 3D
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <a
                  href={OFFICIAL_SPOTIFY_CONFIG.artistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#1db954] hover:bg-[#1db954]/90 text-black font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#1db954]/30 transition-all hover:scale-105 w-fit"
                >
                  <Disc className="w-4 h-4" />
                  <span>Follow di Spotify</span>
                </a>
              </div>
            </div>

            {/* Spotify Official Embed Widget Box */}
            <div className="rounded-3xl p-4 sm:p-6 bg-[#1e1e1e]/95 border border-[#444444] shadow-2xl backdrop-blur-2xl">
              <div className="w-full rounded-2xl overflow-hidden border border-[#444444] shadow-2xl bg-black min-h-[460px]">
                <iframe
                  key="spotify-official-embed"
                  src="https://open.spotify.com/embed/artist/3HkeKnw42As9Ag8BluG93o?utm_source=generator&theme=0"
                  width="100%"
                  height="460"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Ronald 3D Official Spotify Embed"
                  className="w-full rounded-2xl"
                />
              </div>

              <div className="pt-4 mt-3 border-t border-[#444444] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#979797]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1db954] animate-pulse" />
                  <span>Auto-Synced with Spotify Artist Feed</span>
                </div>
                <a
                  href={OFFICIAL_SPOTIFY_CONFIG.artistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1db954] hover:underline font-bold flex items-center gap-1"
                >
                  Buka di Spotify App &rarr;
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Footer CTA Banner */}
        <div className="p-8 rounded-3xl bg-[#1e1e1e]/95 border border-[#444444] text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl">
          <div className="text-center sm:text-left">
            <h4 className="font-display font-black text-xl text-white mb-1 uppercase">
              Ingin Booking Ronald 3D untuk Festival Anda?
            </h4>
            <p className="text-xs text-[#979797] font-normal">
              Periksa ketersediaan jadwal tur atau ajukan inquiry resmi melalui form EPK Rider.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-5 py-2.5 rounded-full bg-[#141414] hover:bg-[#242424] text-white font-mono text-xs font-bold border border-[#444444] transition-all"
            >
              Kembali ke Home
            </button>
            <button
              onClick={() => {
                if (onOpenEPKModal) onOpenEPKModal();
              }}
              className="px-6 py-2.5 rounded-full bg-[#E2E800] hover:bg-[#f2f716] text-[#141414] font-display font-black text-xs uppercase tracking-wider shadow-md shadow-[#E2E800]/25 transition-all hover:scale-105 active:scale-95"
            >
              Buka EPK Rider
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
