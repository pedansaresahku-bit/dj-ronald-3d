import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import StageGalleryMirrorHall from './components/StageGalleryMirrorHall';
import SoundsOfMe from './components/SoundsOfMe';
import CalendarCMS from './components/CalendarCMS';
import EPKRider from './components/EPKRider';
import LightboxModal from './components/LightboxModal';
import CMSModal from './components/CMSModal';
import Toast from './components/Toast';

import PressKitGalleryPage from './components/PressKitGalleryPage';

import { TRACKS_DATA } from './data/tracksData';
import { DEFAULT_GIGS } from './data/defaultGigs';
import { d1Api } from './services/d1Api';

export default function App() {
  // --- Simple Client-side Router for / and /galery ---
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/galery' || window.location.hash === '#galery' || window.location.hash === '#/galery') {
        return '/galery';
      }
    }
    return '/';
  });

  const navigateToRoute = (route) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/galery' || window.location.hash === '#galery' || window.location.hash === '#/galery') {
        setCurrentRoute('/galery');
      } else {
        setCurrentRoute('/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  // --- Toast State ---
  const [toasts, setToasts] = useState([]);
  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };
  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Lightbox Modal State ---
  const [lightboxData, setLightboxData] = useState({
    isOpen: false,
    image: '',
    title: '',
    caption: ''
  });

  const handleOpenLightbox = (image, title, caption) => {
    setLightboxData({ isOpen: true, image, title, caption });
  };

  const handleCloseLightbox = () => {
    setLightboxData({ isOpen: false, image: '', title: '', caption: '' });
  };

  // --- CMS Modal & Cloudflare D1 Events State ---
  const [events, setEvents] = useState([]);
  const [isD1Connected, setIsD1Connected] = useState(false);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [inquiries, setInquiries] = useState(() => {
    try {
      const stored = localStorage.getItem('ronald3d_inquiries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    async function loadData() {
      const { events: loadedEvents, isD1 } = await d1Api.fetchEvents();
      setEvents(loadedEvents);
      setIsD1Connected(isD1);
    }
    loadData();
  }, []);

  const handleSaveEvent = async (eventData, isEditing) => {
    let updated;
    if (isEditing) {
      updated = events.map((ev) => (ev.id === eventData.id ? eventData : ev));
      showToast(`Event "${eventData.title}" berhasil diperbarui!`);
      await d1Api.updateEvent(eventData, isD1Connected);
    } else {
      updated = [...events, eventData];
      showToast(`Event "${eventData.title}" berhasil ditambahkan ke Kalender!`);
      await d1Api.createEvent(eventData, isD1Connected);
    }
    setEvents(updated);
    d1Api.saveLocalEvents(updated);
  };

  const handleDeleteEvent = async (id, title) => {
    if (window.confirm(`Yakin ingin menghapus event "${title || id}"?`)) {
      const updated = events.filter((ev) => ev.id !== id);
      setEvents(updated);
      d1Api.saveLocalEvents(updated);
      showToast(`Event berhasil dihapus.`);
      await d1Api.deleteEvent(id, isD1Connected);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Kembalikan jadwal kalender ke 20 event tur resmi September 2026?")) {
      setEvents(DEFAULT_GIGS);
      d1Api.saveLocalEvents(DEFAULT_GIGS);
      showToast("Kalender telah di-reset ke jadwal default September 2026.");
    }
  };

  const handleRSVP = (eventName) => {
    showToast(`RSVP: Menghubungkan ke tiket resmi untuk "${eventName}"...`);
  };

  const handleBookingSubmit = (formData) => {
    const newInquiry = {
      ...formData,
      id: 'inq-' + Date.now(),
      submittedAt: new Date().toISOString()
    };
    const updatedInquiries = [newInquiry, ...inquiries];
    setInquiries(updatedInquiries);
    try {
      localStorage.setItem('ronald3d_inquiries', JSON.stringify(updatedInquiries));
    } catch (e) {
      console.warn("Storage note:", e);
    }
    showToast(`Terima kasih ${formData.promoterName}! Booking inquiry untuk "${formData.eventName}" telah diterima & tersimpan di CMS.`);
  };

  // --- Web Audio Synthesizer Engine ---
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const audioCtxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);
  const gainRef = useRef(null);
  const kickTimerRef = useRef(null);
  const progressTimerRef = useRef(null);

  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);
        gainNode.connect(audioCtxRef.current.destination);
        gainRef.current = gainNode;
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const startSynth = (trackIdx = activeTrackIndex) => {
    initAudioCtx();
    if (!audioCtxRef.current) return;
    stopSynth();

    const track = TRACKS_DATA[trackIdx];
    const ctx = audioCtxRef.current;

    try {
      const o1 = ctx.createOscillator();
      o1.type = 'sawtooth';
      o1.frequency.setValueAtTime(track.freqs[0], ctx.currentTime);

      const o2 = ctx.createOscillator();
      o2.type = 'sine';
      o2.frequency.setValueAtTime(track.freqs[1], ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(680, ctx.currentTime);

      o1.connect(filter);
      o2.connect(filter);
      filter.connect(gainRef.current);

      o1.start();
      o2.start();

      osc1Ref.current = o1;
      osc2Ref.current = o2;

      // 128 BPM Kick pulse
      kickTimerRef.current = setInterval(() => {
        if (!ctx) return;
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kickOsc.frequency.setValueAtTime(140, ctx.currentTime);
        kickOsc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.12);
        kickGain.gain.setValueAtTime(0.2, ctx.currentTime);
        kickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        kickOsc.connect(kickGain);
        kickGain.connect(ctx.destination);
        kickOsc.start();
        kickOsc.stop(ctx.currentTime + 0.16);
      }, 468);
    } catch (e) {
      console.warn("Audio note:", e);
    }
  };

  const stopSynth = () => {
    if (osc1Ref.current) {
      try { osc1Ref.current.stop(); osc1Ref.current.disconnect(); } catch (e) { }
      osc1Ref.current = null;
    }
    if (osc2Ref.current) {
      try { osc2Ref.current.stop(); osc2Ref.current.disconnect(); } catch (e) { }
      osc2Ref.current = null;
    }
    if (kickTimerRef.current) {
      clearInterval(kickTimerRef.current);
      kickTimerRef.current = null;
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
      showToast('Audio Synthesizer: Paused');
    } else {
      startSynth(activeTrackIndex);
      setIsPlaying(true);
      showToast(`Playing: ${TRACKS_DATA[activeTrackIndex].title}`);
    }
  };

  const handleSelectTrack = (idx) => {
    setActiveTrackIndex(idx);
    setPlayProgress(0);
    if (isPlaying) {
      startSynth(idx);
      showToast(`Now Playing: ${TRACKS_DATA[idx].title}`);
    }
  };

  const handlePrevTrack = () => {
    const nextIdx = (activeTrackIndex - 1 + TRACKS_DATA.length) % TRACKS_DATA.length;
    handleSelectTrack(nextIdx);
  };

  const handleNextTrack = () => {
    const nextIdx = (activeTrackIndex + 1) % TRACKS_DATA.length;
    handleSelectTrack(nextIdx);
  };

  const handleScrub = (seconds) => {
    setPlayProgress(Math.floor(seconds));
    if (!isPlaying) {
      handleTogglePlay();
    }
  };

  // Timer ticker
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        setPlayProgress((prev) => {
          const currentTrack = TRACKS_DATA[activeTrackIndex];
          if (prev >= currentTrack.durationSec) {
            handleNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    }
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, activeTrackIndex]);

  return (
    <div className="relative min-h-screen bg-[#141414] text-[#D6D6D6] selection:bg-[#E2E800] selection:text-[#141414]">
      {/* Navigation Header */}
      <Navbar
        isAudioActive={isPlaying}
        onToggleAudio={handleTogglePlay}
        currentRoute={currentRoute}
        onNavigate={navigateToRoute}
      />

      {/* Main Content: Conditional Route Views */}
      {currentRoute === '/galery' ? (
        <main className="flex flex-col">
          <PressKitGalleryPage
            onOpenLightbox={handleOpenLightbox}
            onBackToHome={() => navigateToRoute('/')}
          />
        </main>
      ) : (
        <main className="flex flex-col">
          <Hero
            onExploreSounds={() => {
              const el = document.getElementById('sounds-of-me');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreGallery={() => navigateToRoute('/galery')}
            onBookTour={() => {
              const el = document.getElementById('kalender');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <AboutMe />

          {/* Press Kit Galery 3D Perspective Carousel */}
          <StageGalleryMirrorHall
            onOpenLightbox={handleOpenLightbox}
            onViewAllGallery={() => navigateToRoute('/galery')}
          />

          <SoundsOfMe
            activeTrackIndex={activeTrackIndex}
            isPlaying={isPlaying}
            playProgress={playProgress}
            onSelectTrack={handleSelectTrack}
            onTogglePlay={handleTogglePlay}
            onPrevTrack={handlePrevTrack}
            onNextTrack={handleNextTrack}
            onScrub={handleScrub}
          />

          <CalendarCMS
            events={events}
            onOpenCMS={() => setIsCMSOpen(true)}
            onRSVP={handleRSVP}
          />

          <EPKRider
            onBookingSubmit={handleBookingSubmit}
          />
        </main>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-[#444444] bg-[#141414] relative z-10">
        <div className="w-[92%] max-w-[1560px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/asset/3d-logo.png" alt="Ronald 3D" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(226,232,0,0.6)]" />
            <span className="font-display font-black text-sm tracking-wider text-white">
              RONALD <span className="text-[#E2E800]">3D</span> &copy; 2026
            </span>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="https://www.instagram.com/ronald_3d/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#1e1e1e] hover:bg-[#e1306c] hover:text-white border border-[#444444] text-xs font-mono text-[#D6D6D6] transition-all"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/c/Ronald3D"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#1e1e1e] hover:bg-[#ff0000] hover:text-white border border-[#444444] text-xs font-mono text-[#D6D6D6] transition-all"
            >
              YouTube
            </a>
            <a
              href="https://open.spotify.com/artist/3HkeKnw42As9Ag8BluG93o"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#1e1e1e] hover:bg-[#1db954] hover:text-black border border-[#444444] text-xs font-mono text-[#D6D6D6] transition-all"
            >
              Spotify
            </a>
            <a
              href="https://soundcloud.com/ronald3d"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#1e1e1e] hover:bg-[#ff5500] hover:text-white border border-[#444444] text-xs font-mono text-[#D6D6D6] transition-all"
            >
              SoundCloud
            </a>
            <a
              href="https://www.tiktok.com/@ronald.3d"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#1e1e1e] hover:bg-[#E2E800] hover:text-[#141414] border border-[#444444] text-xs font-mono text-[#D6D6D6] transition-all"
            >
              TikTok
            </a>
          </div>

          <p className="text-xs text-[#979797] font-mono text-center md:text-right">
            All Rights Reserved • Powered by React & Cloudflare D1
          </p>
        </div>
      </footer>

      {/* Modals & Notifications */}
      <LightboxModal
        isOpen={lightboxData.isOpen}
        onClose={handleCloseLightbox}
        image={lightboxData.image}
        title={lightboxData.title}
        caption={lightboxData.caption}
      />

      <CMSModal
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        events={events}
        onSaveEvent={handleSaveEvent}
        onDeleteEvent={handleDeleteEvent}
        onResetDefaults={handleResetDefaults}
        isD1Connected={isD1Connected}
        inquiries={inquiries}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
}
