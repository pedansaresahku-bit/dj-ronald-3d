import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  X, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Upload, 
  Check, 
  AlertCircle,
  Building,
  Mail,
  User,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function CMSModal({ 
  isOpen, 
  onClose, 
  events = [], 
  onSaveEvent, 
  onDeleteEvent, 
  onResetDefaults, 
  isD1Connected,
  inquiries = []
}) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active view: 'list' (Slide 2) | 'form' (Slide 3)
  const [currentView, setCurrentView] = useState('list');
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' | 'inquiries'

  // Form State for Add / Edit
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    venue: '',
    date: '2026-09-02',
    city: '',
    country: 'INDONESIA',
    stage: 'Headline Performance',
    status: 'Available',
    flyer: '/asset/image-1.JPG',
    description: '',
    mapsUrl: ''
  });

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle CMS Login
  const handleLogin = (e) => {
    e.preventDefault();
    // Accept password (default 'admin' or 'ronald3d' or any input >= 4 chars)
    if (password.trim().toLowerCase() === 'admin' || password.trim().toLowerCase() === 'ronald3d' || password.trim().length >= 4) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Password salah. Gunakan password manajemen (contoh: admin atau ronald3d)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setCurrentView('list');
    setAuthError('');
  };

  // Open Form for Adding New Event
  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({
      id: '',
      title: '',
      venue: '',
      date: '2026-09-02',
      city: '',
      country: 'INDONESIA',
      stage: 'Headline Performance',
      status: 'Available',
      flyer: '/asset/image-1.JPG',
      description: '',
      mapsUrl: ''
    });
    setCurrentView('form');
  };

  // Open Form for Editing Existing Event
  const handleOpenEdit = (event) => {
    setIsEditing(true);
    setFormData({
      id: event.id || '',
      title: event.title || '',
      venue: event.venue || event.title || '',
      date: event.date || '2026-09-02',
      city: event.city || '',
      country: (event.country || 'INDONESIA').toUpperCase(),
      stage: event.stage || 'Headline Performance',
      status: event.status || 'Available',
      flyer: event.flyer || '/asset/image-1.JPG',
      description: event.description || '',
      mapsUrl: event.mapsUrl || ''
    });
    setCurrentView('form');
  };

  // Handle Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.city) return;

    const eventToSave = {
      ...formData,
      id: formData.id || ('gig-' + Date.now()),
      title: formData.title.toUpperCase(),
      city: formData.city.toUpperCase(),
      country: (formData.country || 'INDONESIA').toUpperCase(),
      venue: formData.venue || formData.title,
      mapsUrl: formData.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(formData.city + ' ' + formData.title)}`
    };

    onSaveEvent(eventToSave, isEditing);
    setCurrentView('list');
  };

  // Handle local flyer image upload simulation
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, flyer: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Format date helper: "2 September 2026"
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-');
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const monthName = monthNames[parseInt(m, 10) - 1] || m;
      return `${parseInt(d, 10)} ${monthName} ${y}`;
    } catch {
      return dateStr;
    }
  };

  // Format date header info: "(WEDNESDAY, 02 SEPTEMBER 2026)"
  const formatDateHeaderInfo = (dateStr) => {
    if (!dateStr) return '';
    try {
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) return '';
      const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
      const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
      const dayName = dayNames[dateObj.getDay()];
      const dayNum = String(dateObj.getDate()).padStart(2, '0');
      const monthName = monthNames[dateObj.getMonth()];
      const year = dateObj.getFullYear();
      return `(${dayName}, ${dayNum} ${monthName} ${year})`;
    } catch {
      return '';
    }
  };

  // Format DD/MM/YYYY for input badge
  const formatDateDDMMYYYY = (dateStr) => {
    if (!dateStr) return '02/09/2026';
    try {
      const [y, m, d] = dateStr.split('-');
      return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
    } catch {
      return dateStr;
    }
  };

  // Sorted events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Dark Dimmed Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#090a0f] border border-white/10 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        >

          {/* ========================================================================= */}
          {/* SLIDE 1: MANAGEMENT ACCESS ONLY (PASSWORD LOCK SCREEN)                    */}
          {/* ========================================================================= */}
          {!isAuthenticated ? (
            <div className="p-6 sm:p-10 flex flex-col justify-between min-h-[500px]">
              
              {/* Header Top Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-400 flex items-center justify-center shadow-[0_0_12px_rgba(250,204,21,0.2)]">
                    <Lock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm sm:text-base text-white tracking-wider uppercase">
                      RONALD 3D // MANAGEMENT CMS
                    </h3>
                    <p className="text-[11px] font-mono text-gray-400">
                      Live Event & Promoter Management Dashboard
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Center Lock Screen Content */}
              <div className="flex flex-col items-center text-center my-auto py-8">
                
                {/* Glowing Center Lock Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#18160f] to-[#0c0d12] border-2 border-amber-400 shadow-[0_0_30px_rgba(250,204,21,0.3)] flex items-center justify-center mb-6">
                  <Lock className="w-7 h-7 text-amber-400" />
                </div>

                <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-wider uppercase mb-2">
                  MANAGEMENT ACCESS ONLY
                </h2>

                <p className="text-xs text-gray-400 max-w-md font-light leading-relaxed mb-8">
                  Masukan password manajemen untuk mengakses panel kelola event & jadwal DJ Ronald 3D.
                </p>

                {/* Password Input Form */}
                <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="password"
                      autoFocus
                      required
                      placeholder="masukan password anda disini"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl bg-[#0e0f17] border-2 border-amber-400 text-center text-xs sm:text-sm text-white placeholder:text-gray-600 focus:outline-none focus:shadow-[0_0_20px_rgba(250,204,21,0.25)] transition-all font-mono"
                    />
                  </div>

                  {authError && (
                    <p className="text-xs text-red-400 font-mono flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{authError}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-400/25 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
                  >
                    LOGIN CMS
                  </button>
                </form>

              </div>

              {/* Footer Notice */}
              <div className="text-center pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono text-gray-500">
                  Default Demo Access: Masukan password apapun (min. 4 karakter) atau 'admin' / 'ronald3d'
                </span>
              </div>

            </div>
          ) : (
            /* ========================================================================= */
            /* SLIDE 2 & SLIDE 3: AUTHENTICATED MANAGEMENT DASHBOARD                     */
            /* ========================================================================= */
            <div className="p-5 sm:p-7 flex flex-col h-full overflow-hidden">
              
              {/* Header Top Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-400 flex items-center justify-center shadow-[0_0_12px_rgba(250,204,21,0.2)]">
                    <Lock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm sm:text-base text-white tracking-wider uppercase">
                      RONALD 3D // MANAGEMENT CMS
                    </h3>
                    <p className="text-[11px] font-mono text-gray-400">
                      Live Event & Promoter Management Dashboard
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLogout}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>LOG OUT</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Navigation Tabs Bar & Action Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('calendar');
                      setCurrentView('list');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-display font-extrabold tracking-wider transition-all uppercase ${
                      activeTab === 'calendar'
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    CLUB & GIG CALENDAR ({events.length})
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('inquiries');
                      setCurrentView('list');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-display font-extrabold tracking-wider transition-all uppercase ${
                      activeTab === 'inquiries'
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    PROMOTER INQUIRIES ({inquiries.length})
                  </button>
                </div>

                {activeTab === 'calendar' && currentView === 'list' && (
                  <button
                    onClick={handleOpenAdd}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-display font-extrabold text-xs tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-400/20 transition-all uppercase self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>ADD NEW EVENT</span>
                  </button>
                )}
              </div>

              {/* ========================================================================= */}
              {/* SLIDE 2: EVENT LIST VIEW                                                  */}
              {/* ========================================================================= */}
              {currentView === 'list' && activeTab === 'calendar' && (
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5">
                  {sortedEvents.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 font-mono text-xs border border-white/5 rounded-2xl bg-white/[0.01]">
                      Belum ada event tersimpan di Cloudflare D1. Klik tombol "+ ADD NEW EVENT" di atas untuk menambahkan.
                    </div>
                  ) : (
                    sortedEvents.map((ev, idx) => {
                      const dayNumber = String(idx + 1).padStart(2, '0');
                      return (
                        <div
                          key={ev.id || idx}
                          className="p-3 sm:p-3.5 rounded-2xl bg-[#0c0d12] border border-white/5 hover:border-amber-400/40 transition-all flex items-center justify-between gap-3 group"
                        >
                          {/* Left: Thumbnail & Info */}
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* DJ / Flyer Thumbnail */}
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/60 border border-white/10 shrink-0">
                              <img
                                src={ev.flyer || '/asset/image-1.JPG'}
                                alt={ev.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>

                            {/* Date Badge + Title + Country */}
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black bg-amber-400/10 text-amber-400 border border-amber-400/30 uppercase">
                                  DAY {dayNumber}
                                </span>
                                <span className="text-xs font-mono text-gray-400">
                                  {formatDisplayDate(ev.date)}
                                </span>
                              </div>

                              <h4 className="font-display font-black text-sm text-white truncate uppercase tracking-wide">
                                {ev.title} — <span className="text-amber-400">{ev.country || 'INDONESIA'}</span>
                              </h4>
                            </div>
                          </div>

                          {/* Right: Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleOpenEdit(ev)}
                              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-amber-400 border border-white/5 flex items-center justify-center transition-all"
                              title="Edit Event"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => onDeleteEvent(ev.id, ev.title)}
                              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-white/5 flex items-center justify-center transition-all"
                              title="Hapus Event"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Promoter Inquiries Tab View */}
              {currentView === 'list' && activeTab === 'inquiries' && (
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5">
                  {inquiries.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 font-mono text-xs border border-white/5 rounded-2xl bg-white/[0.01]">
                      Belum ada permintaan booking promoter masuk. Form di section EPK Rider akan otomatis menyimpan inquiry di sini.
                    </div>
                  ) : (
                    inquiries.map((inq, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#0c0d12] border border-white/5 flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-400 font-display uppercase">{inq.eventName}</span>
                          <span className="text-[11px] font-mono text-gray-400">{inq.eventDate || 'Date TBD'}</span>
                        </div>
                        <div className="text-xs text-gray-300">
                          <strong>Promoter:</strong> {inq.promoterName} ({inq.email})
                        </div>
                        {inq.message && (
                          <p className="text-xs text-gray-400 italic bg-black/40 p-2.5 rounded-xl border border-white/5">
                            "{inq.message}"
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* SLIDE 3: ADD / EDIT EVENT FORM                                            */}
              {/* ========================================================================= */}
              {currentView === 'form' && (
                <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
                  
                  {/* Form Section Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h3 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-wider">
                        {isEditing ? 'EDIT EVENT' : 'ADD NEW EVENT'}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentView('list')}
                      className="text-xs font-mono text-gray-400 hover:text-white uppercase transition-colors"
                    >
                      CANCEL
                    </button>
                  </div>

                  {/* Field 1: Tanggal Acara */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-mono font-bold text-gray-300 uppercase">
                        TANGGAL ACARA (DD/MM/YYYY) *
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-amber-400/15 text-amber-400 border border-amber-400/30">
                          {formatDateDDMMYYYY(formData.date)}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500 uppercase">
                          {formatDateHeaderInfo(formData.date)}
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#0c0d12] border border-white/10 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Field 2 & 3: Club / Venue Name + Kota */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-gray-300 uppercase mb-1.5">
                        CLUB / VENUE NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. W CLUB SAMARINDA"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#0c0d12] border border-white/10 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none transition-colors uppercase font-display font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-gray-300 uppercase mb-1.5">
                        KOTA *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SAMARINDA"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#0c0d12] border border-white/10 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none transition-colors uppercase font-mono font-semibold"
                      />
                    </div>
                  </div>

                  {/* Field 4: Flyer Image Box */}
                  <div className="p-4 rounded-2xl bg-[#0c0d12] border border-white/10 flex flex-col sm:flex-row items-center gap-4">
                    {/* Thumbnail Image */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-black/60 border border-white/10 shrink-0">
                      <img
                        src={formData.flyer || '/asset/image-1.JPG'}
                        alt="Flyer Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Flyer Upload Controls */}
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-xs font-display font-extrabold text-amber-400 uppercase tracking-wide mb-0.5">
                        UPLOAD EVENT FLYER POSTER IMAGE
                      </h4>
                      <p className="text-[11px] text-gray-400 font-light mb-3">
                        Upload a high-resolution festival flyer or stage photo (PNG, JPG, WebP).
                      </p>

                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-semibold text-gray-200 flex items-center justify-center sm:justify-start gap-2 transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>CHOOSE IMAGE FILE...</span>
                      </button>
                    </div>
                  </div>

                  {/* Field 5: Description (Optional) */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-gray-300 uppercase mb-1.5">
                      DESCRIPTION (OPTIONAL)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Add special notes, guest details, or event highlights..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0c0d12] border border-white/10 text-xs text-white focus:border-amber-400 focus:outline-none transition-colors resize-none font-sans"
                    />
                  </div>

                  {/* Form Footer Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5 mt-auto">
                    <button
                      type="button"
                      onClick={() => setCurrentView('list')}
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-display font-bold uppercase transition-all"
                    >
                      CANCEL
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-display font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20 transition-all hover:scale-105 active:scale-95"
                    >
                      PUBLISH EVENT
                    </button>
                  </div>

                </form>
              )}

            </div>
          )}

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
