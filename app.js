/**
 * RONALD 3D - Official DJ Profile Interactive Application
 * Features: 3D Canvas, Sounds of Me Player, Stage Galery Lightbox,
 * Full Interactive Kalender with Dynamic CMS Event Management (localStorage)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ==========================================================================
     1. 3D Audio-Reactive Particle Mesh (Home Hero Background)
     ========================================================================== */
  const canvas = document.getElementById('hero-3d-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let time = 0;
    let isSoundPulsing = false;

    const cols = 36;
    const rows = 24;
    let points = [];

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      mouse.x = width / 2;
      mouse.y = height / 2;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
      initMesh();
    }

    function initMesh() {
      points = [];
      const spacingX = width / (cols - 1) * 1.3;
      const spacingY = height / (rows - 1) * 1.3;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = (c - cols / 2) * spacingX;
          const originY = (r - rows / 2) * spacingY;
          points.push({
            x: originX,
            y: originY,
            z: 0,
            baseX: originX,
            baseY: originY,
            col: c,
            row: r
          });
        }
      }
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    }, { passive: true });

    resizeCanvas();

    function drawMesh() {
      if (getComputedStyle(canvas).display === 'none') {
        requestAnimationFrame(drawMesh);
        return;
      }
      time += 0.025;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const mouseOffsetX = (mouse.x - centerX) * 0.001;
      const mouseOffsetY = (mouse.y - centerY) * 0.001;
      const pulseEnergy = isSoundPulsing ? (Math.sin(time * 8) * 20 + 25) : 0;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const distFromCenter = Math.sqrt(p.baseX * p.baseX + p.baseY * p.baseY);
        
        const wave1 = Math.sin(distFromCenter * 0.006 - time * 1.8) * 45;
        const wave2 = Math.cos(p.baseX * 0.008 + time * 1.2) * 25;
        const soundWave = isSoundPulsing ? Math.sin(p.col * 0.4 + time * 6) * pulseEnergy : 0;
        
        p.z = wave1 + wave2 + soundWave;

        const fov = 400;
        const projectedScale = fov / (fov + 200 + p.z * 0.5);
        
        const rotatedX = p.baseX + (mouseOffsetX * p.z * 40);
        const rotatedY = p.baseY + (mouseOffsetY * p.z * 40);

        p.projX = centerX + rotatedX * projectedScale;
        p.projY = centerY + (rotatedY + 100) * projectedScale;
        p.alpha = Math.max(0.08, Math.min(0.65, (p.z + 50) / 100));
      }

      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p1 = points[idx];

          if (c < cols - 1) {
            const p2 = points[idx + 1];
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${p1.alpha * 0.45})`;
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.stroke();
          }

          if (r < rows - 1) {
            const p3 = points[idx + cols];
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${p1.alpha * 0.35})`;
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p3.projX, p3.projY);
            ctx.stroke();
          }

          if ((c + r) % 3 === 0) {
            ctx.beginPath();
            ctx.fillStyle = (r % 2 === 0) ? `rgba(0, 240, 255, ${p1.alpha * 0.9})` : `rgba(245, 158, 11, ${p1.alpha * 0.8})`;
            ctx.arc(p1.projX, p1.projY, 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      requestAnimationFrame(drawMesh);
    }

    drawMesh();

    window.setMeshSoundPulse = (active) => {
      isSoundPulsing = active;
    };
  }

  /* ==========================================================================
     2. STAGE GALERY (Interactive Swiper / Slider Showcase Engine)
     ========================================================================== */
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const carouselCards = Array.from(document.querySelectorAll('.carousel-slide-card'));
  const galleryTrack = document.getElementById('gallery-carousel-track');
  const mainImg = document.getElementById('gallery-main-img');
  const ambientBg = document.getElementById('gallery-ambient-bg');
  const stageTag = document.getElementById('gallery-stage-tag');
  const stageTitle = document.getElementById('gallery-stage-title');
  const stageCaption = document.getElementById('gallery-stage-caption');
  const slideCounter = document.getElementById('gallery-slide-counter');
  const progressBar = document.getElementById('gallery-progress-bar');
  const dotsContainer = document.getElementById('gallery-dots-bar');

  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');
  const zoomBtn = document.getElementById('gallery-zoom-btn');
  const autoplayBtn = document.getElementById('gallery-autoplay-btn');
  const autoplayIconPlay = document.getElementById('autoplay-icon-play');
  const autoplayIconPause = document.getElementById('autoplay-icon-pause');
  const autoplayLabel = document.getElementById('autoplay-label');

  const trackScrollLeft = document.getElementById('track-scroll-left');
  const trackScrollRight = document.getElementById('track-scroll-right');
  const mainImageWrap = document.getElementById('gallery-main-image-wrap');

  // Collect slide metadata
  const allSlides = carouselCards.map((card, idx) => ({
    originalIndex: idx,
    cat: card.getAttribute('data-cat'),
    img: card.getAttribute('data-img'),
    tag: card.getAttribute('data-tag') || 'STAGE MOMENT',
    title: card.getAttribute('data-title') || 'Ronald 3D Live',
    caption: card.getAttribute('data-caption') || 'Performance Moment',
    cardElem: card
  }));

  let currentCategory = 'all';
  let activeFilteredSlides = [...allSlides];
  let currentActiveIndex = 0; // index within activeFilteredSlides

  let isAutoplaying = false;
  let autoplayInterval = null;
  let progressVal = 0;
  const SLIDE_DURATION_MS = 4500;
  const PROGRESS_TICK_MS = 50;

  function renderDotIndicators() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    activeFilteredSlides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `gallery-dot ${idx === currentActiveIndex ? 'active' : ''}`;
      dot.setAttribute('data-slide-index', idx);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoplayTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function renderActiveSlide(idx, isSmooth = true) {
    if (activeFilteredSlides.length === 0) return;
    if (idx < 0) idx = activeFilteredSlides.length - 1;
    if (idx >= activeFilteredSlides.length) idx = 0;

    currentActiveIndex = idx;
    const currentSlide = activeFilteredSlides[currentActiveIndex];

    // Fade transition on main image
    if (mainImg) {
      mainImg.style.opacity = '0.3';
      mainImg.style.transform = 'scale(0.97)';
      setTimeout(() => {
        mainImg.src = currentSlide.img;
        mainImg.alt = currentSlide.title;
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'scale(1)';
      }, 120);
    }

    // Ambient backdrop
    if (ambientBg) {
      ambientBg.style.backgroundImage = `url('${currentSlide.img}')`;
    }

    // Info overlay
    if (stageTag) stageTag.innerHTML = `<i data-lucide="sparkles" class="w-3 h-3 text-cyan"></i> ${currentSlide.tag}`;
    if (stageTitle) stageTitle.textContent = currentSlide.title;
    if (stageCaption) stageCaption.innerHTML = currentSlide.caption;
    if (slideCounter) {
      const currentNum = String(currentActiveIndex + 1).padStart(2, '0');
      const totalNum = String(activeFilteredSlides.length).padStart(2, '0');
      slideCounter.textContent = `${currentNum} / ${totalNum}`;
    }

    // Highlight active card in track
    carouselCards.forEach(c => c.classList.remove('active'));
    if (currentSlide.cardElem) {
      currentSlide.cardElem.classList.add('active');
      // Scroll track to keep active card centered
      if (galleryTrack) {
        const trackRect = galleryTrack.getBoundingClientRect();
        const cardRect = currentSlide.cardElem.getBoundingClientRect();
        const offset = cardRect.left - trackRect.left - (trackRect.width / 2) + (cardRect.width / 2);
        galleryTrack.scrollBy({ left: offset, behavior: 'smooth' });
      }
    }

    // Update dots
    document.querySelectorAll('.gallery-dot').forEach((dot, dIdx) => {
      dot.classList.toggle('active', dIdx === currentActiveIndex);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function goToSlide(idx) {
    renderActiveSlide(idx);
    resetProgress();
  }

  function nextSlide() {
    goToSlide(currentActiveIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentActiveIndex - 1);
  }

  // Bind Arrows
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplayTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplayTimer();
    });
  }

  // Bind Carousel Cards Click
  carouselCards.forEach(card => {
    card.addEventListener('click', () => {
      const originalIdx = parseInt(card.getAttribute('data-index'), 10);
      const targetFilteredIdx = activeFilteredSlides.findIndex(s => s.originalIndex === originalIdx);
      if (targetFilteredIdx !== -1) {
        goToSlide(targetFilteredIdx);
        resetAutoplayTimer();
      }
    });
  });

  // Track scroll arrows
  if (trackScrollLeft && galleryTrack) {
    trackScrollLeft.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: -340, behavior: 'smooth' });
    });
  }

  if (trackScrollRight && galleryTrack) {
    trackScrollRight.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }

  // Category Filtering
  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      currentCategory = tab.getAttribute('data-cat');

      if (currentCategory === 'all') {
        activeFilteredSlides = [...allSlides];
        carouselCards.forEach(c => c.style.display = 'flex');
      } else {
        activeFilteredSlides = allSlides.filter(s => s.cat === currentCategory);
        carouselCards.forEach(c => {
          if (c.getAttribute('data-cat') === currentCategory) {
            c.style.display = 'flex';
          } else {
            c.style.display = 'none';
          }
        });
      }

      currentActiveIndex = 0;
      renderDotIndicators();
      renderActiveSlide(0);
      resetAutoplayTimer();
    });
  });

  // Autoplay Logic
  function startAutoplay() {
    isAutoplaying = true;
    if (autoplayIconPlay) autoplayIconPlay.classList.add('hidden');
    if (autoplayIconPause) autoplayIconPause.classList.remove('hidden');
    if (autoplayLabel) autoplayLabel.textContent = 'Pause';
    if (autoplayBtn) autoplayBtn.style.borderColor = 'var(--accent-cyan)';

    resetProgress();
    autoplayInterval = setInterval(() => {
      progressVal += (PROGRESS_TICK_MS / SLIDE_DURATION_MS) * 100;
      if (progressBar) progressBar.style.width = `${progressVal}%`;

      if (progressVal >= 100) {
        nextSlide();
        resetProgress();
      }
    }, PROGRESS_TICK_MS);
  }

  function stopAutoplay() {
    isAutoplaying = false;
    if (autoplayIconPlay) autoplayIconPlay.classList.remove('hidden');
    if (autoplayIconPause) autoplayIconPause.classList.add('hidden');
    if (autoplayLabel) autoplayLabel.textContent = 'Play Slide';
    if (autoplayBtn) autoplayBtn.style.borderColor = 'rgba(255, 255, 255, 0.14)';

    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
    resetProgress();
  }

  function resetProgress() {
    progressVal = 0;
    if (progressBar) progressBar.style.width = '0%';
  }

  function resetAutoplayTimer() {
    if (isAutoplaying) {
      stopAutoplay();
      startAutoplay();
    }
  }

  if (autoplayBtn) {
    autoplayBtn.addEventListener('click', () => {
      if (isAutoplaying) {
        stopAutoplay();
        showToast('Slideshow Galery: Dijeda (Paused)');
      } else {
        startAutoplay();
        showToast('Slideshow Galery: Otomatis Berjalan (Playing)');
      }
    });
  }

  // Touch Swipe & Mouse Drag Support for Stage
  let touchStartX = 0;
  let touchEndX = 0;

  if (mainImageWrap) {
    mainImageWrap.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mainImageWrap.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    mainImageWrap.addEventListener('mousedown', (e) => {
      touchStartX = e.clientX;
    });

    mainImageWrap.addEventListener('mouseup', (e) => {
      touchEndX = e.clientX;
      handleSwipe();
    });

    // Double click to zoom
    mainImageWrap.addEventListener('dblclick', () => {
      const cur = activeFilteredSlides[currentActiveIndex];
      if (cur) openLightbox(cur.img, `${cur.title} • ${cur.caption}`);
    });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoplayTimer();
    }
  }

  // Lightbox Integration
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close-btn');

  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || "Ronald 3D Stage Moment";
    lightboxModal.classList.remove('hidden');
  }

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.add('hidden');
  }

  if (zoomBtn) {
    zoomBtn.addEventListener('click', () => {
      const cur = activeFilteredSlides[currentActiveIndex];
      if (cur) openLightbox(cur.img, `${cur.title} • ${cur.caption}`);
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.querySelector('.lightbox-backdrop')?.addEventListener('click', closeLightbox);
  }

  // Keyboard navigation when user presses left/right arrow keys
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      const galleryElem = document.getElementById('stage-gallery');
      if (galleryElem) {
        const rect = galleryElem.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          prevSlide();
          resetAutoplayTimer();
        }
      }
    } else if (e.key === 'ArrowRight') {
      const galleryElem = document.getElementById('stage-gallery');
      if (galleryElem) {
        const rect = galleryElem.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          nextSlide();
          resetAutoplayTimer();
        }
      }
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // Initialize Gallery View
  renderDotIndicators();
  renderActiveSlide(0, false);

  /* ==========================================================================
     3. SOUNDS OF ME (Audio Synthesizer Engine & Waveform Scrubber)
     ========================================================================== */
  const trackData = [
    {
      id: 1,
      title: "Cyber Dimension (Original Mix)",
      genre: "MELODIC TECHNO &bull; 128 BPM",
      duration: "3:42",
      durationSec: 222,
      cover: "asset/image-3.JPG",
      freqs: [65.41, 130.81, 196.00, 261.63]
    },
    {
      id: 2,
      title: "Electric Mirage (Festival Edit)",
      genre: "TECH HOUSE &bull; 126 BPM",
      duration: "4:15",
      durationSec: 255,
      cover: "asset/image-5.JPG",
      freqs: [73.42, 146.83, 220.00, 293.66]
    },
    {
      id: 3,
      title: "Midnight Distortion",
      genre: "PEAK TIME TECHNO &bull; 132 BPM",
      duration: "5:08",
      durationSec: 308,
      cover: "asset/image-7.JPG",
      freqs: [55.00, 110.00, 164.81, 220.00]
    },
    {
      id: 4,
      title: "Euphoria Pulse (Live Intro)",
      genre: "MELODIC TRANCE &bull; 130 BPM",
      duration: "3:55",
      durationSec: 235,
      cover: "asset/image-9.JPG",
      freqs: [87.31, 174.61, 261.63, 349.23]
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let playProgress = 0;
  let progressInterval = null;

  let audioCtx = null;
  let synthGain = null;
  let synthOsc1 = null;
  let synthOsc2 = null;
  let kickInterval = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
        synthGain = audioCtx.createGain();
        synthGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        synthGain.connect(audioCtx.destination);
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSynthAudio() {
    initAudioContext();
    if (!audioCtx) return;

    const track = trackData[currentTrackIndex];
    stopSynthAudio();

    try {
      synthOsc1 = audioCtx.createOscillator();
      synthOsc1.type = 'sawtooth';
      synthOsc1.frequency.setValueAtTime(track.freqs[0], audioCtx.currentTime);

      synthOsc2 = audioCtx.createOscillator();
      synthOsc2.type = 'sine';
      synthOsc2.frequency.setValueAtTime(track.freqs[1], audioCtx.currentTime);

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, audioCtx.currentTime);

      synthOsc1.connect(filter);
      synthOsc2.connect(filter);
      filter.connect(synthGain);

      synthOsc1.start();
      synthOsc2.start();

      kickInterval = setInterval(() => {
        if (!isPlaying || !audioCtx) return;
        const kickOsc = audioCtx.createOscillator();
        const kickGain = audioCtx.createGain();
        kickOsc.frequency.setValueAtTime(140, audioCtx.currentTime);
        kickOsc.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.12);
        kickGain.gain.setValueAtTime(0.22, audioCtx.currentTime);
        kickGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        kickOsc.connect(kickGain);
        kickGain.connect(audioCtx.destination);
        kickOsc.start();
        kickOsc.stop(audioCtx.currentTime + 0.16);
      }, 468);
    } catch (e) {
      console.warn("Audio note:", e);
    }
  }

  function stopSynthAudio() {
    if (synthOsc1) {
      try { synthOsc1.stop(); synthOsc1.disconnect(); } catch (e) {}
      synthOsc1 = null;
    }
    if (synthOsc2) {
      try { synthOsc2.stop(); synthOsc2.disconnect(); } catch (e) {}
      synthOsc2 = null;
    }
    if (kickInterval) {
      clearInterval(kickInterval);
      kickInterval = null;
    }
  }

  // Populate waveform bars
  const waveformContainer = document.getElementById('waveform-visualizer');
  if (waveformContainer) {
    waveformContainer.innerHTML = '';
    for (let i = 0; i < 48; i++) {
      const bar = document.createElement('div');
      bar.className = 'wave-bar';
      const heightPercent = Math.max(15, Math.sin(i * 0.25) * 45 + Math.cos(i * 0.7) * 25 + 30);
      bar.style.height = `${heightPercent}%`;
      waveformContainer.appendChild(bar);
    }
  }

  function updatePlayerUI() {
    const track = trackData[currentTrackIndex];

    const titleElem = document.getElementById('current-track-title');
    const genreElem = document.getElementById('current-track-genre');
    const coverElem = document.getElementById('current-cover-img');
    const totalTimeElem = document.getElementById('player-total-time');
    const mainPlayIcon = document.getElementById('main-play-icon');
    const mainPauseIcon = document.getElementById('main-pause-icon');

    if (titleElem) titleElem.textContent = track.title;
    if (genreElem) genreElem.innerHTML = track.genre;
    if (coverElem) coverElem.src = track.cover;
    if (totalTimeElem) totalTimeElem.textContent = track.duration;

    if (mainPlayIcon && mainPauseIcon) {
      if (isPlaying) {
        mainPlayIcon.classList.add('hidden');
        mainPauseIcon.classList.remove('hidden');
      } else {
        mainPlayIcon.classList.remove('hidden');
        mainPauseIcon.classList.add('hidden');
      }
    }

    const stickyTitle = document.getElementById('sticky-title');
    const stickyThumb = document.getElementById('sticky-thumb');
    const stickyPlayIcon = document.getElementById('sticky-play-icon');
    const stickyPauseIcon = document.getElementById('sticky-pause-icon');
    const stickyPlayer = document.getElementById('sticky-player');

    if (stickyTitle) stickyTitle.textContent = track.title;
    if (stickyThumb) stickyThumb.src = track.cover;
    if (stickyPlayer) {
      if (isPlaying) stickyPlayer.classList.add('playing');
      else stickyPlayer.classList.remove('playing');
    }

    if (stickyPlayIcon && stickyPauseIcon) {
      if (isPlaying) {
        stickyPlayIcon.classList.add('hidden');
        stickyPauseIcon.classList.remove('hidden');
      } else {
        stickyPlayIcon.classList.remove('hidden');
        stickyPauseIcon.classList.add('hidden');
      }
    }

    const trackItems = document.querySelectorAll('.track-playlist .track-item');
    trackItems.forEach((item, idx) => {
      if (idx === currentTrackIndex) {
        item.classList.add('active');
        const icon = item.querySelector('.track-num');
        if (icon) icon.innerHTML = isPlaying ? '<i data-lucide="volume-2" class="w-4 h-4 text-cyan"></i>' : (idx + 1).toString().padStart(2, '0');
      } else {
        item.classList.remove('active');
        const icon = item.querySelector('.track-num');
        if (icon) icon.textContent = (idx + 1).toString().padStart(2, '0');
      }
    });

    if (window.lucide) window.lucide.createIcons();

    if (window.setMeshSoundPulse) {
      window.setMeshSoundPulse(isPlaying);
    }
  }

  function startProgress() {
    if (progressInterval) clearInterval(progressInterval);
    progressInterval = setInterval(() => {
      if (!isPlaying) return;
      playProgress += 1;
      const track = trackData[currentTrackIndex];
      if (playProgress > track.durationSec) {
        playTrackByIndex(currentTrackIndex + 1);
        return;
      }

      const percent = (playProgress / track.durationSec) * 100;
      const progressBar = document.getElementById('waveform-progress');
      if (progressBar) progressBar.style.width = `${percent}%`;

      const bars = document.querySelectorAll('.wave-bar');
      const activeBarCount = Math.floor((percent / 100) * bars.length);
      bars.forEach((bar, i) => {
        if (i <= activeBarCount) bar.classList.add('active');
        else bar.classList.remove('active');
      });

      const mins = Math.floor(playProgress / 60);
      const secs = Math.floor(playProgress % 60).toString().padStart(2, '0');
      const currentTimeElem = document.getElementById('player-current-time');
      const stickyTimeElem = document.getElementById('sticky-time');

      if (currentTimeElem) currentTimeElem.textContent = `${mins}:${secs}`;
      if (stickyTimeElem) stickyTimeElem.textContent = `${mins}:${secs} / ${track.duration}`;
    }, 1000);
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playSynthAudio();
      startProgress();
      showToast(`Sounds of Me: Streaming "${trackData[currentTrackIndex].title}"`);
    } else {
      stopSynthAudio();
      if (progressInterval) clearInterval(progressInterval);
    }
    updatePlayerUI();
  }

  function playTrackByIndex(idx) {
    if (idx < 0) idx = trackData.length - 1;
    if (idx >= trackData.length) idx = 0;
    currentTrackIndex = idx;
    playProgress = 0;
    isPlaying = true;
    playSynthAudio();
    startProgress();
    updatePlayerUI();
    showToast(`Track: ${trackData[currentTrackIndex].title}`);
  }

  const mainPlayBtn = document.getElementById('main-play-btn');
  if (mainPlayBtn) mainPlayBtn.addEventListener('click', togglePlay);

  const stickyPlayBtn = document.getElementById('sticky-play-btn');
  const stickyNextBtn = document.getElementById('sticky-next-btn');
  const stickyPrevBtn = document.getElementById('sticky-prev-btn');

  if (stickyPlayBtn) stickyPlayBtn.addEventListener('click', togglePlay);
  if (stickyNextBtn) stickyNextBtn.addEventListener('click', () => playTrackByIndex(currentTrackIndex + 1));
  if (stickyPrevBtn) stickyPrevBtn.addEventListener('click', () => playTrackByIndex(currentTrackIndex - 1));

  const quickSoundBtn = document.getElementById('quick-sound-toggle');
  if (quickSoundBtn) {
    quickSoundBtn.addEventListener('click', () => {
      togglePlay();
      const onIcon = quickSoundBtn.querySelector('.sound-icon-on');
      const offIcon = quickSoundBtn.querySelector('.sound-icon-off');
      if (isPlaying) {
        onIcon.classList.remove('hidden');
        offIcon.classList.add('hidden');
      } else {
        onIcon.classList.add('hidden');
        offIcon.classList.remove('hidden');
      }
    });
  }

  document.querySelectorAll('.track-playlist .track-item').forEach(item => {
    item.addEventListener('click', () => {
      const trackId = parseInt(item.getAttribute('data-track-id'), 10) - 1;
      playTrackByIndex(trackId);
    });
  });

  const waveformWrap = document.querySelector('.waveform-container');
  if (waveformWrap) {
    waveformWrap.addEventListener('click', (e) => {
      const rect = waveformWrap.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const scrubPercent = Math.max(0, Math.min(1, clickX / rect.width));
      const track = trackData[currentTrackIndex];
      playProgress = Math.floor(scrubPercent * track.durationSec);
      if (!isPlaying) togglePlay();
      else updatePlayerUI();
    });
  }

  // Video controls
  const featureVideo = document.getElementById('feature-video');
  const videoPlayToggle = document.getElementById('video-play-toggle');
  const videoSoundToggle = document.getElementById('video-sound-toggle');
  const vidIconPlay = document.getElementById('vid-icon-play');
  const vidIconPause = document.getElementById('vid-icon-pause');
  const vidSoundOff = document.getElementById('vid-sound-off');
  const vidSoundOn = document.getElementById('vid-sound-on');

  if (featureVideo && videoPlayToggle) {
    videoPlayToggle.addEventListener('click', () => {
      if (featureVideo.paused) {
        featureVideo.play();
        vidIconPlay.classList.add('hidden');
        vidIconPause.classList.remove('hidden');
      } else {
        featureVideo.pause();
        vidIconPlay.classList.remove('hidden');
        vidIconPause.classList.add('hidden');
      }
    });
  }

  if (featureVideo && videoSoundToggle) {
    videoSoundToggle.addEventListener('click', () => {
      featureVideo.muted = !featureVideo.muted;
      if (featureVideo.muted) {
        vidSoundOff.classList.remove('hidden');
        vidSoundOn.classList.add('hidden');
      } else {
        vidSoundOff.classList.add('hidden');
        vidSoundOn.classList.remove('hidden');
      }
    });
  }

  /* ==========================================================================
     4. KALENDER & DYNAMIC CMS EVENT MANAGER (Cloudflare D1 & LocalStorage)
     ========================================================================== */
  const DEFAULT_GIGS = [
    { id: 'gig-1', date: '2026-10-18', title: 'Neon Horizon Festival', city: 'Jakarta International Expo', country: 'ID', stage: 'Mainstage • 01:00 AM', status: 'Selling Fast' },
    { id: 'gig-2', date: '2026-10-24', title: 'Zouk Soundsystem Headline', city: 'Zouk Club, Singapore', country: 'SG', stage: 'Headline Set • All Night Long', status: 'Sold Out' },
    { id: 'gig-3', date: '2026-11-07', title: 'Ultra Matrix Electronic Arena', city: 'Bangkok Arena, Thailand', country: 'TH', stage: 'Resistance Arena • 23:30', status: 'Available' },
    { id: 'gig-4', date: '2026-11-21', title: 'Omnia Clifftop Sunset Session', city: 'Savaya Uluwatu, Bali', country: 'ID', stage: 'Sunset to Sunrise 4H Set', status: 'Few Left' },
    { id: 'gig-5', date: '2026-12-12', title: 'Tokyo Cyberpunk Warehouse Rave', city: 'AgeHa Bay, Tokyo', country: 'JP', stage: '3D Visual Live Experience', status: 'Available' }
  ];

  let cachedEvents = [];
  let isD1Connected = false;

  function getLocalEvents() {
    try {
      const stored = localStorage.getItem('ronald3d_events');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Storage access note:", e);
    }
    return DEFAULT_GIGS;
  }

  function saveLocalEvents(events) {
    try {
      localStorage.setItem('ronald3d_events', JSON.stringify(events));
    } catch (e) {
      console.warn("Failed to write localStorage:", e);
    }
  }

  function updateD1StatusUI(status, isConnected = false) {
    const statusText = document.getElementById('d1-status-text');
    const statusDot = document.getElementById('d1-dot');
    const statusPill = document.getElementById('d1-status-pill');

    if (statusText) statusText.textContent = status;
    if (statusDot) {
      if (isConnected) {
        statusDot.style.backgroundColor = '#10b981';
        statusDot.classList.add('pulse-glow');
      } else {
        statusDot.style.backgroundColor = 'var(--accent-cyan)';
        statusDot.classList.remove('pulse-glow');
      }
    }
    if (statusPill) {
      if (isConnected) {
        statusPill.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        statusPill.style.color = '#10b981';
      } else {
        statusPill.style.borderColor = 'rgba(0, 240, 255, 0.3)';
        statusPill.style.color = 'var(--accent-cyan)';
      }
    }
  }

  async function loadEventsData() {
    // Initialise with local storage first for instant zero-latency render
    cachedEvents = getLocalEvents();
    refreshAllCalendarViews();

    // Check Cloudflare D1 API
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          cachedEvents = json.data;
          saveLocalEvents(cachedEvents);
          isD1Connected = true;
          updateD1StatusUI('Cloudflare D1: Connected', true);
          refreshAllCalendarViews();
          return;
        } else if (json.d1_active) {
          isD1Connected = true;
          updateD1StatusUI('Cloudflare D1: Connected', true);
          return;
        }
      }
    } catch (err) {
      console.info("D1 API not active locally (using LocalStorage fallback):", err.message);
    }

    isD1Connected = false;
    updateD1StatusUI('Local Storage Mode (D1 Ready)', false);
  }

  let calCurrentYear = 2026;
  let calCurrentMonth = 9; // October (0-indexed: 9 = Oct)
  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const shortMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  function refreshAllCalendarViews() {
    const events = cachedEvents.length > 0 ? cachedEvents : getLocalEvents();
    renderCalendar(calCurrentYear, calCurrentMonth, events);
    renderTourScheduleList(events);
    renderCMSTable(events);

    const countBadge = document.getElementById('tour-count-badge');
    if (countBadge) countBadge.textContent = `${events.length} SHOWS`;

    if (window.lucide) window.lucide.createIcons();
  }

  function renderCalendar(year, month, events) {
    const daysContainer = document.getElementById('cal-days-container');
    const monthDisplay = document.getElementById('cal-month-display');
    if (!daysContainer || !monthDisplay) return;

    monthDisplay.textContent = `${monthNames[month]} ${year}`;
    daysContainer.innerHTML = '';

    // Create lookup map of dates
    const gigMap = {};
    events.forEach(ev => {
      gigMap[ev.date] = ev;
    });

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Previous month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const cell = document.createElement('div');
      cell.className = 'cal-day-cell other-month';
      cell.textContent = prevMonthDays - i;
      daysContainer.appendChild(cell);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day-cell';
      cell.textContent = day;

      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      if (gigMap[dateKey]) {
        const gig = gigMap[dateKey];
        cell.classList.add('has-gig');
        cell.title = `${gig.title} (${gig.city})`;
        cell.addEventListener('click', () => {
          document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
          cell.classList.add('selected');
          showToast(`Kalender: ${gig.title} in ${gig.city} (${gig.status})`);
          
          const scheduleItem = document.querySelector(`.schedule-item[data-date="${dateKey}"]`);
          if (scheduleItem) {
            scheduleItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            scheduleItem.style.borderColor = 'var(--accent-cyan)';
            setTimeout(() => { scheduleItem.style.borderColor = 'var(--border-subtle)'; }, 2000);
          }
        });
      } else {
        cell.addEventListener('click', () => {
          document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
          cell.classList.add('selected');
          showToast(`Tanggal ${day} ${monthNames[month]} ${year}: Tersedia untuk Booking Event.`);
        });
      }

      daysContainer.appendChild(cell);
    }

    // Next month filler days
    const totalCells = firstDayIndex + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let j = 1; j <= remaining; j++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day-cell other-month';
      cell.textContent = j;
      daysContainer.appendChild(cell);
    }
  }

  function renderTourScheduleList(events) {
    const listContainer = document.getElementById('tour-schedule-list');
    if (!listContainer) return;

    if (events.length === 0) {
      listContainer.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-dim);">Belum ada jadwal event tersimpan. Tambahkan melalui tombol CMS di atas.</div>`;
      return;
    }

    // Sort by date ascending
    const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

    listContainer.innerHTML = sorted.map(ev => {
      const d = new Date(ev.date);
      const mStr = isNaN(d.getTime()) ? 'DATE' : shortMonths[d.getMonth()];
      const dayNum = isNaN(d.getTime()) ? '00' : String(d.getDate()).padStart(2, '0');

      let statusClass = 'status-available';
      if (ev.status === 'Selling Fast' || ev.status === 'Few Left') statusClass = 'status-fast';
      else if (ev.status === 'Sold Out') statusClass = 'status-soldout';

      const isSold = ev.status === 'Sold Out';

      return `
        <div class="schedule-item" data-date="${ev.date}">
          <div class="schedule-date-box">
            <span class="s-month">${mStr}</span>
            <span class="s-day">${dayNum}</span>
          </div>
          <div class="schedule-info">
            <div class="schedule-title">${ev.title}</div>
            <div class="schedule-venue"><i data-lucide="map-pin" class="inline-icon"></i> ${ev.city} &bull; ${ev.country || 'ID'}</div>
            <div class="schedule-stage">${ev.stage || 'Headline Performance'}</div>
          </div>
          <div class="schedule-action">
            <span class="status-pill ${statusClass}">${ev.status.toUpperCase()}</span>
            ${isSold ? `
              <button class="btn btn-sm btn-disabled" disabled>Waitlist</button>
            ` : `
              <button class="btn btn-sm btn-primary get-ticket-btn" data-event="${ev.title} (${ev.city})">
                RSVP <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 ml-1"></i>
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Rebind RSVP buttons
    bindTicketButtons();
  }

  function bindTicketButtons() {
    const ticketModal = document.getElementById('ticket-modal');
    const ticketModalTitle = document.getElementById('ticket-modal-title');
    document.querySelectorAll('.get-ticket-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const eventName = btn.getAttribute('data-event') || 'Live Event';
        if (ticketModalTitle) ticketModalTitle.textContent = eventName;
        if (ticketModal) ticketModal.classList.remove('hidden');
      });
    });
  }

  /* --- CMS Modal & Table Logic --- */
  const cmsModal = document.getElementById('cms-modal');
  const cmsOpenBtn = document.getElementById('open-cms-modal-btn');
  const cmsCloseBtn = document.getElementById('cms-modal-close');
  const cmsForm = document.getElementById('cms-event-form');
  const cmsEditId = document.getElementById('cms-edit-id');
  const cmsBtnText = document.getElementById('cms-btn-text');
  const cmsCancelBtn = document.getElementById('cms-cancel-btn');
  const cmsResetDefaultsBtn = document.getElementById('cms-reset-defaults-btn');

  if (cmsOpenBtn && cmsModal) {
    cmsOpenBtn.addEventListener('click', () => {
      cmsModal.classList.remove('hidden');
      renderCMSTable(cachedEvents.length > 0 ? cachedEvents : getLocalEvents());
    });
  }

  if (cmsCloseBtn && cmsModal) {
    cmsCloseBtn.addEventListener('click', () => cmsModal.classList.add('hidden'));
    cmsModal.querySelector('.cms-modal-backdrop')?.addEventListener('click', () => cmsModal.classList.add('hidden'));
  }

  function renderCMSTable(events) {
    const tbody = document.getElementById('cms-events-tbody');
    if (!tbody) return;

    if (events.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-dim); padding:20px;">Belum ada event. Gunakan form di atas untuk menambahkan.</td></tr>`;
      return;
    }

    tbody.innerHTML = events.map(ev => `
      <tr>
        <td><strong>${ev.date}</strong></td>
        <td>
          <div style="font-weight:700; color:#fff;">${ev.title}</div>
          <div style="font-size:0.78rem; color:var(--text-muted);">${ev.city} (${ev.country || 'ID'}) &bull; ${ev.stage || ''}</div>
        </td>
        <td><span class="status-pill ${ev.status === 'Sold Out' ? 'status-soldout' : ev.status.includes('Fast') || ev.status.includes('Left') ? 'status-fast' : 'status-available'}">${ev.status}</span></td>
        <td>
          <div class="cms-action-btn-group">
            <button class="cms-btn-icon edit-gig-btn" data-id="${ev.id}" title="Edit Event"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
            <button class="cms-btn-icon del del-gig-btn" data-id="${ev.id}" title="Hapus Event"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

    // Bind Edit Buttons
    document.querySelectorAll('.edit-gig-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const ev = cachedEvents.find(e => e.id === id);
        if (ev) {
          cmsEditId.value = ev.id;
          document.getElementById('cms-event-title').value = ev.title;
          document.getElementById('cms-event-date').value = ev.date;
          document.getElementById('cms-event-city').value = ev.city;
          document.getElementById('cms-event-country').value = ev.country || 'ID';
          document.getElementById('cms-event-stage').value = ev.stage || '';
          document.getElementById('cms-event-status').value = ev.status;

          cmsBtnText.textContent = 'Perbarui Event';
          cmsCancelBtn.classList.remove('hidden');
          cmsForm.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Bind Delete Buttons
    document.querySelectorAll('.del-gig-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const evToDelete = cachedEvents.find(e => e.id === id);
        if (confirm(`Yakin ingin menghapus event "${evToDelete ? evToDelete.title : id}"?`)) {
          cachedEvents = cachedEvents.filter(e => e.id !== id);
          saveLocalEvents(cachedEvents);
          refreshAllCalendarViews();
          showToast(`Event berhasil dihapus.`);

          // Cloudflare D1 API sync
          if (isD1Connected) {
            try {
              await fetch(`/api/events?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
            } catch (err) {
              console.warn("D1 delete sync note:", err);
            }
          }
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // Handle CMS Form Submit (Add or Update)
  if (cmsForm) {
    cmsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const editId = cmsEditId.value;
      const title = document.getElementById('cms-event-title').value.trim();
      const date = document.getElementById('cms-event-date').value;
      const city = document.getElementById('cms-event-city').value.trim();
      const country = document.getElementById('cms-event-country').value.trim().toUpperCase() || 'ID';
      const stage = document.getElementById('cms-event-stage').value.trim() || 'Headline Set';
      const status = document.getElementById('cms-event-status').value;

      const eventPayload = {
        id: editId || ('gig-' + Date.now()),
        title,
        date,
        city,
        country,
        stage,
        status
      };

      if (editId) {
        // Update local state
        cachedEvents = cachedEvents.map(ev => ev.id === editId ? eventPayload : ev);
        showToast(`Event "${title}" berhasil diperbarui!`);

        // D1 PUT sync
        if (isD1Connected) {
          try {
            await fetch('/api/events', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(eventPayload)
            });
          } catch (err) {
            console.warn("D1 PUT sync error:", err);
          }
        }
      } else {
        // Add new
        cachedEvents.push(eventPayload);
        showToast(`Event "${title}" berhasil ditambahkan ke Kalender!`);

        // D1 POST sync
        if (isD1Connected) {
          try {
            await fetch('/api/events', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(eventPayload)
            });
          } catch (err) {
            console.warn("D1 POST sync error:", err);
          }
        }
      }

      saveLocalEvents(cachedEvents);
      cmsForm.reset();
      cmsEditId.value = '';
      cmsBtnText.textContent = 'Simpan ke Kalender';
      cmsCancelBtn.classList.add('hidden');
      
      // Auto switch calendar month to the event's month
      const evDate = new Date(date);
      if (!isNaN(evDate.getTime())) {
        calCurrentYear = evDate.getFullYear();
        calCurrentMonth = evDate.getMonth();
      }

      refreshAllCalendarViews();
    });
  }

  if (cmsCancelBtn) {
    cmsCancelBtn.addEventListener('click', () => {
      cmsForm.reset();
      cmsEditId.value = '';
      cmsBtnText.textContent = 'Simpan ke Kalender';
      cmsCancelBtn.classList.add('hidden');
    });
  }

  if (cmsResetDefaultsBtn) {
    cmsResetDefaultsBtn.addEventListener('click', () => {
      if (confirm("Kembalikan jadwal kalender ke 5 event tur default?")) {
        cachedEvents = [...DEFAULT_GIGS];
        saveLocalEvents(cachedEvents);
        cmsForm.reset();
        cmsEditId.value = '';
        cmsBtnText.textContent = 'Simpan ke Kalender';
        cmsCancelBtn.classList.add('hidden');
        refreshAllCalendarViews();
        showToast("Kalender telah di-reset ke jadwal default.");
      }
    });
  }

  // Month navigation buttons
  const prevMonthBtn = document.getElementById('cal-prev-month');
  const nextMonthBtn = document.getElementById('cal-next-month');

  if (prevMonthBtn && nextMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      calCurrentMonth--;
      if (calCurrentMonth < 0) {
        calCurrentMonth = 11;
        calCurrentYear--;
      }
      renderCalendar(calCurrentYear, calCurrentMonth, cachedEvents);
    });

    nextMonthBtn.addEventListener('click', () => {
      calCurrentMonth++;
      if (calCurrentMonth > 11) {
        calCurrentMonth = 0;
        calCurrentYear++;
      }
      renderCalendar(calCurrentYear, calCurrentMonth, cachedEvents);
    });
  }

  // Initial load
  loadEventsData();

  // Ticket modal close handlers
  const ticketModal = document.getElementById('ticket-modal');
  const ticketModalClose = document.getElementById('ticket-modal-close');
  if (ticketModalClose && ticketModal) {
    ticketModalClose.addEventListener('click', () => ticketModal.classList.add('hidden'));
    ticketModal.querySelector('.ticket-modal-backdrop')?.addEventListener('click', () => ticketModal.classList.add('hidden'));
  }

  document.querySelectorAll('.ticket-option-row').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.ticket-option-row').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  /* ==========================================================================
     5. EPK RIDER & BOOKING FORM HANDLER
     ========================================================================== */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const promoterName = document.getElementById('promoter-name')?.value;
      const eventName = document.getElementById('event-name')?.value;
      const eventDate = document.getElementById('event-date')?.value;

      showToast(`Terima kasih ${promoterName}! Permintaan booking untuk "${eventName}" pada ${eventDate} telah diterima. Management akan menghubungi Anda segera.`);
      bookingForm.reset();
    });
  }

  /* ==========================================================================
     6. Mobile Navigation & Smooth Anchors
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuBtn && mobileNavPanel) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileNavPanel.classList.toggle('hidden');
      if (isHidden) {
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      } else {
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
      }
    });

    document.querySelectorAll('.mobile-nav-item').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavPanel.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }

  /* ==========================================================================
     7. Toast Notification Utility
     ========================================================================== */
  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-cyan"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  updatePlayerUI();
});
