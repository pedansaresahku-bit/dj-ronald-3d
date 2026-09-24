// Service to fetch and manage the latest 4 YouTube videos directly from Ronald 3D's official channel (@Ronald3D)

export const OFFICIAL_RONALD3D_CHANNEL = {
  handle: "@Ronald3D",
  url: "https://www.youtube.com/@Ronald3D",
  videosUrl: "https://www.youtube.com/@Ronald3D/videos",
  channelId: "UCbCibA_G-IpGeyEQfpSi4kw"
};

// Official 4 latest releases from https://www.youtube.com/@Ronald3D/videos
export const DEFAULT_YOUTUBE_VIDEOS = [
  {
    id: "CMlWFVXpSDA",
    youtubeId: "CMlWFVXpSDA",
    title: "Breakbeat Mode Halu - req Jenyfer | Ronald 3D mixtape",
    author: "Ronald 3D",
    publishedAt: "2026-09-10T12:00:00Z",
    thumbnail: "https://i.ytimg.com/vi/CMlWFVXpSDA/hqdefault.jpg",
    duration: "Mixtape HD",
    views: "Official Release",
    tag: "LATEST RELEASE"
  },
  {
    id: "fQQR6Ugzq6s",
    youtubeId: "fQQR6Ugzq6s",
    title: "Breakbeat Hokage Breaks Dealers - [Ronald 3D x Alka Flow x Rey Limitless x Noka Axl]",
    author: "Ronald 3D",
    publishedAt: "2026-08-28T12:00:00Z",
    thumbnail: "https://i.ytimg.com/vi/fQQR6Ugzq6s/hqdefault.jpg",
    duration: "Collaboration Mix",
    views: "Official Mix",
    tag: "SPECIAL COLLAB"
  },
  {
    id: "iEg6FYCJ1QE",
    youtubeId: "iEg6FYCJ1QE",
    title: "Breakbeat Nostalgia Berpelukan - Req MR Asep",
    author: "Ronald 3D",
    publishedAt: "2026-08-14T12:00:00Z",
    thumbnail: "https://i.ytimg.com/vi/iEg6FYCJ1QE/hqdefault.jpg",
    duration: "Breakbeat Set",
    views: "Official Mix",
    tag: "OFFICIAL RELEASE"
  },
  {
    id: "qhcCAXEJmO4",
    youtubeId: "qhcCAXEJmO4",
    title: "DJ Breakbeat Mode Yakuza - [Ronald 3D Mixed] Req By : Amry_4D",
    author: "Ronald 3D",
    publishedAt: "2026-07-30T12:00:00Z",
    thumbnail: "https://i.ytimg.com/vi/qhcCAXEJmO4/hqdefault.jpg",
    duration: "Yakuza Mix",
    views: "Official Mix",
    tag: "OFFICIAL RELEASE"
  }
];

// Asynchronous multi-strategy fetcher to ensure videos automatically update when new videos are uploaded
export async function fetchLatestYouTubeVideos() {
  // Strategy 1: Fetch via CORS-friendly scraping proxy for @Ronald3D/videos
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent('https://www.youtube.com/@Ronald3D/videos')}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(proxyUrl, {
      signal: controller.signal,
      cache: 'no-cache'
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const html = await response.text();
      const videoIdMatches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
      const uniqueVideoIds = [...new Set(videoIdMatches)].slice(0, 4);

      if (uniqueVideoIds.length >= 4) {
        // Fetch metadata via fast oEmbed API for each video ID
        const videoPromises = uniqueVideoIds.map(async (vid, idx) => {
          try {
            const oembedRes = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vid}`);
            if (oembedRes.ok) {
              const data = await oembedRes.json();
              return {
                id: vid,
                youtubeId: vid,
                title: data.title || DEFAULT_YOUTUBE_VIDEOS[idx]?.title || `Ronald 3D Track #${idx + 1}`,
                author: data.author_name || "Ronald 3D",
                publishedAt: new Date().toISOString(),
                thumbnail: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
                duration: "Official Video",
                views: "Latest Upload",
                tag: idx === 0 ? "LATEST UPLOAD" : "OFFICIAL RELEASE"
              };
            }
          } catch (e) {
            // fallback for this single video
          }
          return DEFAULT_YOUTUBE_VIDEOS[idx] || {
            id: vid,
            youtubeId: vid,
            title: `Ronald 3D Mix (${vid})`,
            thumbnail: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
            duration: "Official Video",
            views: "Official Mix",
            tag: idx === 0 ? "LATEST UPLOAD" : "OFFICIAL RELEASE"
          };
        });

        const fetchedVideos = await Promise.all(videoPromises);
        return { videos: fetchedVideos, isLiveFeed: true };
      }
    }
  } catch (err) {
    console.info("YouTube automatic live fetch fallback:", err.message);
  }

  // Graceful fallback to verified official Ronald 3D latest 4 videos
  return { videos: DEFAULT_YOUTUBE_VIDEOS, isLiveFeed: false };
}
