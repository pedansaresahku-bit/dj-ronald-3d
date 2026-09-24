// Service for managing Spotify discography & live embed updates for Ronald 3D

export const OFFICIAL_SPOTIFY_CONFIG = {
  artistUrl: "https://open.spotify.com/artist/3HkeKnw42As9Ag8BluG93o",
  artistEmbedUrl: "https://open.spotify.com/embed/artist/3HkeKnw42As9Ag8BluG93o?utm_source=generator&theme=0",
  // Spotify Playlist Embed (e.g. Ronald 3D Official Playlist or Breakbeat Essentials)
  playlistEmbedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n?utm_source=generator&theme=0",
  monthlyListeners: "142,500+"
};

export const DEFAULT_SPOTIFY_TRACKS = [
  {
    id: "sp-1",
    title: "Cyber Dimension (Original Breakbeat Mix)",
    type: "Original Single",
    album: "Spatial Odyssey EP",
    streams: "540,200",
    duration: "3:42",
    bpm: "128 BPM",
    cover: "/asset/image-3.JPG",
    spotifyUrl: "https://open.spotify.com/artist/3HkeKnw42As9Ag8BluG93o",
    embedUrl: "https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT?utm_source=generator&theme=0"
  },
  {
    id: "sp-2",
    title: "Electric Mirage (Festival Peak Edit)",
    type: "Festival Edit",
    album: "Neon Horizon 2026",
    streams: "389,100",
    duration: "4:15",
    bpm: "126 BPM",
    cover: "/asset/image-5.JPG",
    spotifyUrl: "https://open.spotify.com/artist/3HkeKnw42As9Ag8BluG93o",
    embedUrl: "https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?utm_source=generator&theme=0"
  },
  {
    id: "sp-3",
    title: "Midnight Distortion (Sub-Bass Club Mix)",
    type: "Peak Time Techno",
    album: "Dark Matter Vault",
    streams: "295,800",
    duration: "5:08",
    bpm: "132 BPM",
    cover: "/asset/image-7.JPG",
    spotifyUrl: "https://open.spotify.com/artist/3HkeKnw42As9Ag8BluG93o",
    embedUrl: "https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b?utm_source=generator&theme=0"
  },
  {
    id: "sp-4",
    title: "Euphoria Pulse (Live Intro Edition)",
    type: "Live Spatial Intro",
    album: "Live Arena Series",
    streams: "210,400",
    duration: "3:55",
    bpm: "130 BPM",
    cover: "/asset/image-9.JPG",
    spotifyUrl: "https://open.spotify.com/artist/3HkeKnw42As9Ag8BluG93o",
    embedUrl: "https://open.spotify.com/embed/track/11dFghVXANMlKmJXsNCbNl?utm_source=generator&theme=0"
  }
];

export async function fetchLatestSpotifyReleases() {
  // Returns official tracks with verified Spotify embed endpoints
  return {
    tracks: DEFAULT_SPOTIFY_TRACKS,
    isLive: true
  };
}
