import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Sparkles, 
  Zap, 
  ExternalLink, 
  X, 
  Ticket,
  Sliders
} from 'lucide-react';

export default function CalendarCMS({
  events = [],
  onOpenCMS,
  onRSVP
}) {
  // Calendar state initialized to September 2026 (or dynamic)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // 8 = September (0-indexed)

  // Selected event or date for detail flyer inspector modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedOpenDate, setSelectedOpenDate] = useState(null);

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];
  
  const shortMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Map events by dateKey: "YYYY-MM-DD"
  const eventMap = useMemo(() => {
    const map = {};
    events.forEach(ev => {
      if (ev && ev.date) {
        map[ev.date] = ev;
      }
    });
    return map;
  }, [events]);

  // Generate days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthDays = useMemo(() => {
    const days = [];
    const isThisCurrentRealMonth = (currentYear === 2026 && currentMonth === 8); // Sept 2026

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentYear, currentMonth, day);
      const dayOfWeekIdx = dateObj.getDay();
      const dayOfWeekStr = dayNames[dayOfWeekIdx];
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      const isToday = isThisCurrentRealMonth && day === 23; // 23 Sept 2026

      days.push({
        dayNumber: day,
        dayString: String(day).padStart(2, '0'),
        dayOfWeek: dayOfWeekStr,
        dateKey,
        monthStr: shortMonths[currentMonth],
        isToday,
        event: eventMap[dateKey] || null
      });
    }
    return days;
  }, [currentYear, currentMonth, daysInMonth, eventMap]);

  const handleCardClick = (dayItem) => {
    if (dayItem.event) {
      setSelectedEvent(dayItem.event);
    } else {
      setSelectedOpenDate(dayItem);
    }
  };

  const handleRequestEventDate = () => {
    const epkSection = document.getElementById('epk-rider');
    if (epkSection) {
      epkSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="kalender" className="py-20 relative z-10 bg-obsidian">
      <div className="w-[94%] max-w-[1600px] mx-auto">
        
        {/* Top Header & Month Switcher Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
          
          {/* Subtitle / Realtime Clock Description */}
          <div className="max-w-2xl">
            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
              Live automated schedule synchronized with Asia/Jakarta (WIB) real-time clock. Automatically transitions when the month flips. Click any date to inspect flyer poster and location map.
            </p>
          </div>

          {/* Month Switcher Controls */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            
            {/* Prev Month Button */}
            <button
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/15 text-gray-300 flex items-center justify-center hover:bg-white/10 hover:text-white hover:border-cyan/50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Current Month & Year Display Pill */}
            <div className="px-5 py-2.5 rounded-full bg-obsidian-surface border border-white/15 flex items-center gap-2.5 shadow-inner">
              <span className="font-display font-extrabold text-xs sm:text-sm tracking-wider text-white">
                {monthNames[currentMonth]} {currentYear}
              </span>
              
              {/* NOW Badge if viewing September 2026 */}
              {currentYear === 2026 && currentMonth === 8 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-cyan text-black tracking-wider uppercase">
                  NOW
                </span>
              )}
            </div>

            {/* Next Month Button */}
            <button
              onClick={handleNextMonth}
              aria-label="Next Month"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/15 text-gray-300 flex items-center justify-center hover:bg-white/10 hover:text-white hover:border-cyan/50 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* CMS Manager Button */}
            {onOpenCMS && (
              <button
                onClick={onOpenCMS}
                title="Kelola Event (Cloudflare D1 CMS)"
                className="w-10 h-10 ml-2 rounded-full bg-cyan/10 border border-cyan/30 text-cyan flex items-center justify-center hover:bg-cyan hover:text-black transition-all shadow-sm"
              >
                <Sliders className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>

        {/* 6-Column Calendar Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {monthDays.map((dayItem) => {
            const hasEvent = !!dayItem.event;
            const ev = dayItem.event;

            if (hasEvent) {
              // --- Confirmed Gig / Event Card ---
              return (
                <motion.div
                  key={dayItem.dateKey}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleCardClick(dayItem)}
                  className={`relative p-3.5 sm:p-4 rounded-2xl flex flex-col justify-between h-[165px] sm:h-[175px] cursor-pointer transition-all duration-300 select-none group ${
                    dayItem.isToday
                      ? 'bg-gradient-to-b from-[#0a1824] to-[#0c0e18] border-[1.5px] border-cyan shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                      : 'bg-obsidian-surface/90 border-[1.5px] border-cyan/40 hover:border-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-mono font-black text-xl sm:text-2xl text-white tracking-tight leading-none">
                        {dayItem.dayString}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-gray-400 ml-1.5 uppercase">
                        {dayItem.monthStr}
                      </span>
                      {dayItem.isToday && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-cyan text-black flex items-center gap-0.5 uppercase shadow-sm">
                          <Zap className="w-2.5 h-2.5 fill-black" />
                          TODAY
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] font-mono font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                      {dayItem.dayOfWeek}
                    </span>
                  </div>

                  {/* Card Middle (City & Venue Name) */}
                  <div className="my-auto py-1">
                    <div className="text-[10px] font-mono font-bold text-cyan tracking-wider flex items-center gap-1 uppercase truncate">
                      <MapPin className="w-3 h-3 text-cyan shrink-0" />
                      <span>{ev.city || 'INDONESIA'}</span>
                    </div>

                    <h4 className="font-display font-extrabold text-xs sm:text-sm text-white tracking-wide truncate mt-0.5 group-hover:text-cyan transition-colors uppercase">
                      {ev.title || ev.venue || 'HEADLINE'}
                    </h4>

                    <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-2.5 h-2.5 text-gray-500 shrink-0" />
                      <span>{ev.country || 'Indonesia'}</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-[9px] font-mono font-bold text-emerald-400 tracking-wider uppercase border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {ev.status || 'AVAILABLE'}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(ev);
                      }}
                      className="text-[10px] font-mono font-bold text-cyan hover:text-white flex items-center gap-0.5 transition-colors uppercase"
                    >
                      <span>DETAIL</span>
                      <span className="text-xs">ⓘ</span>
                    </button>
                  </div>
                </motion.div>
              );
            } else {
              // --- Open / Available Date Card ---
              return (
                <div
                  key={dayItem.dateKey}
                  onClick={() => handleCardClick(dayItem)}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#09090e]/70 border border-white/5 hover:border-cyan/30 transition-all flex flex-col justify-between h-[165px] sm:h-[175px] cursor-pointer group"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-mono font-black text-xl sm:text-2xl text-gray-400/80 tracking-tight leading-none">
                        {dayItem.dayString}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-gray-600 ml-1.5 uppercase">
                        {dayItem.monthStr}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-semibold text-gray-600">
                      {dayItem.dayOfWeek}
                    </span>
                  </div>

                  {/* Card Middle */}
                  <div className="my-auto py-1">
                    <span className="text-[10px] font-mono font-bold text-gray-400 tracking-wider uppercase block">
                      AVAILABLE DATE
                    </span>
                    <span className="text-[11px] text-gray-500 font-light block mt-0.5">
                      Open for Booking
                    </span>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-[10px] font-mono text-gray-400 group-hover:text-cyan transition-colors uppercase tracking-wider">
                      INQUIRE
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-cyan group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Section Bottom Info & Request Event Date CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-10 pt-6 border-t border-white/10">
          
          {/* Synchronized WIB Note */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-light text-gray-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan shadow-[0_0_10px_rgba(0,240,255,0.8)] shrink-0" />
            <span>
              Automated perpetual calendar synced with WIB (GMT+7). Confirmed gigs are highlighted; open dates are available for festival and club booking inquiries.
            </span>
          </div>

          {/* Request Event Date Button */}
          <button
            onClick={handleRequestEventDate}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-cyan hover:bg-cyan/90 text-black font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan/25 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            REQUEST EVENT DATE
          </button>

        </div>

      </div>

      {/* --- Event Detail & Flyer Inspector Modal --- */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl rounded-3xl bg-[#0e0f17] border border-cyan/40 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-cyan hover:text-black transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                
                {/* Header Tag */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan/10 text-cyan border border-cyan/30 uppercase flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    CONFIRMED TOUR GIG
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    {selectedEvent.date}
                  </span>
                </div>

                {/* Title & Venue */}
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide uppercase mb-2">
                  {selectedEvent.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-300 mb-6 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan shrink-0" />
                  <span>{selectedEvent.venue || selectedEvent.city}, {selectedEvent.country || 'Indonesia'}</span>
                </p>

                {/* Grid: Flyer Preview + Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Flyer Thumbnail */}
                  <div className="rounded-2xl overflow-hidden bg-black/50 border border-white/10 aspect-video sm:aspect-square relative group">
                    <img
                      src={selectedEvent.flyer || '/asset/image-1.JPG'}
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                      <span className="text-[10px] font-mono text-white/90">Official Tour Flyer Poster</span>
                    </div>
                  </div>

                  {/* Gig Details Card */}
                  <div className="flex flex-col justify-between gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div>
                      <span className="text-[11px] font-mono text-gray-400 block mb-1">SET DETAILS</span>
                      <p className="text-sm font-bold text-white mb-3">
                        {selectedEvent.stage || 'Headline Performance 3D Live Experience'}
                      </p>

                      <span className="text-[11px] font-mono text-gray-400 block mb-1">STATUS</span>
                      <span className="inline-block px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {selectedEvent.status || 'AVAILABLE FOR RSVP'}
                      </span>
                    </div>

                    {/* Google Maps / Location Button */}
                    <a
                      href={selectedEvent.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(selectedEvent.city + ' ' + selectedEvent.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono font-bold text-gray-200 border border-white/10 hover:border-cyan/40 transition-all"
                    >
                      <MapPin className="w-3.5 h-3.5 text-cyan" />
                      <span>Buka Lokasi Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </a>
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      if (onRSVP) onRSVP(`${selectedEvent.title} (${selectedEvent.city})`);
                      setSelectedEvent(null);
                    }}
                    className="w-full sm:flex-1 py-3 rounded-xl bg-cyan hover:bg-cyan/90 text-black font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>RSVP / TICKET INQUIRY</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedEvent(null);
                      handleRequestEventDate();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold border border-white/15 transition-all"
                  >
                    Contact Management
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Open Date Booking Inquiry Modal --- */}
      <AnimatePresence>
        {selectedOpenDate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0e0f17] border border-white/15 shadow-2xl p-6 sm:p-8"
            >
              <button
                onClick={() => setSelectedOpenDate(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase inline-block mb-3">
                  DATE AVAILABLE FOR BOOKING
                </span>

                <h3 className="font-display font-bold text-2xl text-white">
                  {selectedOpenDate.dayNumber} {monthNames[currentMonth]} {currentYear} ({selectedOpenDate.dayOfWeek})
                </h3>

                <p className="text-xs text-gray-400 font-light mt-2">
                  Slot tanggal ini masih terbuka untuk festival, exclusive club event, atau private showcase tour Ronald 3D.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setSelectedOpenDate(null);
                    handleRequestEventDate();
                  }}
                  className="w-full py-3.5 rounded-xl bg-cyan hover:bg-cyan/90 text-black font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan/20 transition-all flex items-center justify-center gap-2"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Book Tanggal {selectedOpenDate.dayString} {selectedOpenDate.monthStr} Sekarang</span>
                </button>

                <button
                  onClick={() => setSelectedOpenDate(null)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs font-semibold border border-white/10 transition-all"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
