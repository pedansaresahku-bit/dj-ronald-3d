import { DEFAULT_GIGS } from '../data/defaultGigs';

const STORAGE_KEY = 'ronald3d_events';

export const d1Api = {
  getLocalEvents() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 15) {
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

  async fetchEvents() {
    // Attempt to fetch from Cloudflare D1
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          this.saveLocalEvents(json.data);
          return { events: json.data, isD1: true };
        } else if (json.d1_active) {
          return { events: this.getLocalEvents(), isD1: true };
        }
      }
    } catch (err) {
      // Local fallback
      console.info("Cloudflare D1 offline or local mode:", err.message);
    }

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
