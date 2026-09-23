import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { TRACKS_DATA } from '../data/tracksData';

export default function StickyPlayer({
  activeTrackIndex,
  isPlaying,
  playProgress,
  onTogglePlay,
  onPrevTrack,
  onNextTrack
}) {
  const currentTrack = TRACKS_DATA[activeTrackIndex] || TRACKS_DATA[0];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-40 p-2 sm:p-3 bg-obsidian-surface/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.7)] flex justify-center">
      <div className="w-[94%] max-w-[1560px] mx-auto flex items-center justify-between gap-4">
        
        {/* Track Thumbnail & Info */}
        <div className="flex items-center gap-3 min-w-0 max-w-[200px] sm:max-w-xs">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
          />
          <div className="min-w-0">
            <span className="block text-xs font-bold text-white truncate font-display">
              {currentTrack.title}
            </span>
            <span className="block text-[11px] text-cyan font-mono truncate">
              Ronald 3D • {currentTrack.genre.split('•')[0]}
            </span>
          </div>
        </div>

        {/* Central Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevTrack}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
            aria-label="Previous Track"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-full bg-cyan text-black flex items-center justify-center shadow-lg shadow-cyan/30 hover:scale-105 transition-transform"
            aria-label="Play or Pause"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
          </button>

          <button
            onClick={onNextTrack}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
            aria-label="Next Track"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mini Waveform & Timer */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Animated EQ Bars */}
          <div className="flex items-end gap-1 h-5 w-16">
            {Array.from({ length: 5 }).map((_, barIdx) => (
              <span
                key={barIdx}
                className={`w-1.5 rounded-full transition-all duration-200 ${
                  isPlaying ? 'bg-cyan shadow-[0_0_6px_rgba(0,240,255,0.8)]' : 'bg-white/20'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(20, (Math.sin(barIdx * 1.5 + playProgress) * 40) + 50)}%` : '20%'
                }}
              />
            ))}
          </div>

          <span className="font-mono text-xs text-gray-400 whitespace-nowrap">
            {formatTime(playProgress)} / {currentTrack.duration}
          </span>
        </div>

      </div>
    </aside>
  );
}
