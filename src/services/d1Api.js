import { DEFAULT_GIGS } from '../data/defaultGigs';

const STORAGE_KEY = 'ronald3d_events';

export const d1Api = {
  getLocalEvents() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("LocalStorage access note:", e);
    }
    return DEFAULT_GIGS;
  },

  saveLocalEvents(events) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (e) {
      console.warn("LocalStorage write note:", e);
    }
  },

  clearLocalEvents() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("LocalStorage clear note:", e);
    }
  },

  async fetchEvents() {
    // 1. Primary: Attempt to fetch live events from Cloudflare D1
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const json = await res.json();
        if (json.d1_active) {
          const liveData = Array.isArray(json.data) ? json.data : [];
          this.saveLocalEvents(liveData);
          return { events: liveData, isD1: true };
        }
      }
    } catch (err) {
      console.info("Cloudflare D1 offline or local mode:", err.message);
    }

    // 2. Fallback: Local storage or clean default
    return { events: this.getLocalEvents(), isD1: false };
  },

  async createEvent(eventData, isD1 = false) {
    if (isD1) {
      try {
        await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData)
        });
      } catch (err) {
        console.warn("D1 POST sync note:", err);
      }
    }
  },

  async updateEvent(eventData, isD1 = false) {
    if (isD1) {
      try {
        await fetch('/api/events', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData)
        });
      } catch (err) {
        console.warn("D1 PUT sync note:", err);
      }
    }
  },

  async deleteEvent(id, isD1 = false) {
    if (isD1) {
      try {
        await fetch(`/api/events?id=${encodeURIComponent(id)}`, {
          method: 'DELETE'
        });
      } catch (err) {
        console.warn("D1 DELETE sync note:", err);
      }
    }
  }
};
