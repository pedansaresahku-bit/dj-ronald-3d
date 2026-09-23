import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Maximize2, ArrowUpRight, Camera } from 'lucide-react';
import { GALLERY_DATA } from '../data/galleryData';

export default function StageGalleryMirrorHall({ onOpenLightbox, onViewAllGallery }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const photos = GALLERY_DATA;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
    setTimerKey(prev => prev + 1);
  }, [photos.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setTimerKey(prev => prev + 1);
  }, [photos.length]);

  // Clean 10-second automatic timer (0 React state re-renders during countdown)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(timer);
  }, [handleNext, timerKey]);

  return (
    <section id="stage-gallery" className="py-20 relative z-10 overflow-hidden bg-obsidian">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[380px] h-[120px] bg-cyan/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="w-[92%] max-w-[1560px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono font-semibold uppercase mb-3">
            <Camera className="w-3.5 h-3.5 text-cyan" />
            <span>PRESS KIT GALLERY &bull; 3D SLIDE</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3">
            Press Kit <span className="bg-gradient-to-r from-white via-cyan to-purple bg-clip-text text-transparent">Galery</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base font-light mb-5">
            Dokumentasi visual panggung dan performa live Ronald 3D dengan tampilan 3D bersih dan beresolusi tinggi.
          </p>

          {/* "Lihat Semua" Menu Action Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={onViewAllGallery}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan/10 hover:bg-cyan hover:text-black border border-cyan/40 text-cyan text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-cyan/10 hover:shadow-cyan/30 transition-all hover:scale-105 active:scale-95 group"
            >
              <span>Lihat Semua ({photos.length} Foto)</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3D Perspective Carousel Viewport */}
        <div className="relative w-full py-2 md:py-6 flex flex-col items-center justify-center select-none">
          
          <div 
            className="relative w-full h-[440px] sm:h-[500px] md:h-[560px] flex items-center justify-center"
            style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
          >
            {photos.map((photo, index) => {
              let offset = index - activeIndex;

              const total = photos.length;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCurrent = offset === 0;
              // Performance optimization: only render max 5 cards into DOM
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // 3D positioning
              const translateX = offset * (window.innerWidth < 640 ? 180 : window.innerWidth < 1024 ? 260 : 340);
              const rotateY = offset * -25;
              const scale = isCurrent ? 1.05 : 0.82;
              const translateZ = isCurrent ? 60 : -100;
              const opacity = isCurrent ? 1 : 0.45;
              const zIndex = 20 - Math.abs(offset);

              return (
                <div
                  key={photo.id}
                  onClick={() => {
                    if (isCurrent) {
                      onOpenLightbox(photo.img, photo.title, photo.caption);
                    } else {
                      setActiveIndex(index);
                      setTimerKey(prev => prev + 1);
                    }
                  }}
                  className={`absolute top-0 bottom-0 my-auto w-[270px] sm:w-[350px] md:w-[420px] h-[360px] sm:h-[440px] md:h-[490px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 ease-out gpu-accel ${
                    isCurrent
                      ? 'border-2 border-cyan shadow-[0_0_30px_rgba(0,240,255,0.3)] ring-2 ring-cyan/20'
                      : 'border border-white/10 hover:border-white/30 brightness-75 hover:brightness-100'
                  }`}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Photo Canvas */}
                  <img
                    src={photo.img}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Top Zoom Button on Hover/Active */}
                  {isCurrent && (
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLightbox(photo.img, photo.title, photo.caption);
                        }}
                        className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-cyan/40 text-cyan flex items-center justify-center hover:bg-cyan hover:text-black transition-all shadow-md"
                        title="Zoom Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation & Progress Controls */}
          <div className="w-full max-w-xl mx-auto mt-6 flex flex-col items-center gap-4 px-4">
            
            {/* Arrow Navigation & Dots */}
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-obsidian-surface border border-white/15 text-white flex items-center justify-center hover:bg-cyan hover:text-black hover:border-cyan transition-all active:scale-95"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot Pagination */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-xs sm:max-w-md">
                {photos.slice(0, 12).map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => {
                      setActiveIndex(dotIdx);
                      setTimerKey(prev => prev + 1);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      dotIdx === activeIndex
                        ? 'w-6 bg-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-obsidian-surface border border-white/15 text-white flex items-center justify-center hover:bg-cyan hover:text-black hover:border-cyan transition-all active:scale-95"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* 10-Second Pure CSS Progress Bar (0 CPU overhead) */}
            <div className="w-full max-w-xs sm:max-w-sm h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                key={timerKey}
                className="h-full bg-gradient-to-r from-cyan to-purple animate-progress-10s"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
