// Service to fetch and manage SoundCloud tracks from Ronald 3D (https://soundcloud.com/ronald3d)

export const OFFICIAL_SOUNDCLOUD_PROFILE = {
  url: "https://soundcloud.com/ronald3d",
  username: "ronald3d",
  embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ronald3d&color=%23e2e800&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
};

export const DEFAULT_SOUNDCLOUD_TRACKS = [
  {
    id: "mimpi-yang-sempurna-ronald-3d",
    title: "Mimpi Yang Sempurna - [Ronald 3D] -DJ Julia x Zaki- prev",
    author: "Ronald 3D - R3D",
    genre: "BREAKBEAT REMIX",
    duration: "04:18",
    plays: "34.5K",
    likes: "2.1K",
    thumbnail: "https://i1.sndcdn.com/artworks-44eakoUkquNEJM3d-UhU7WA-t500x500.jpg",
    trackUrl: "https://soundcloud.com/ronald3d/mimpi-yang-sempurna-ronald-3d",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ronald3d/mimpi-yang-sempurna-ronald-3d&color=%23e2e800&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
  },
  {
    id: "kamin-ronald-3d-garry-khoman",
    title: "Камин - [Ronald 3D] -Garry Khoman- prev",
    author: "Ronald 3D - R3D",
    genre: "CLUB BREAKBEAT",
    duration: "03:52",
    plays: "41.8K",
    likes: "2.8K",
    thumbnail: "https://i1.sndcdn.com/artworks-Jmzi1YfW3dlzP2Zf-uRmCkg-t500x500.jpg",
    trackUrl: "https://soundcloud.com/ronald3d/kamin-ronald-3d-garry-khoman",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ronald3d/kamin-ronald-3d-garry-khoman&color=%23e2e800&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
  },
  {
    id: "dj-breakbeat-breaks-dealers",
    title: "DJ Breakbeat Breaks Dealers - [Ronald 3D x Alka Flow x Rey Limitless x Noka Axl]",
    author: "Ronald 3D - R3D",
    genre: "COLLABORATION SET",
    duration: "05:10",
    plays: "68.2K",
    likes: "4.5K",
    thumbnail: "https://i1.sndcdn.com/artworks-ojsJ0MzcNSmhvliL-NVRQqg-t500x500.jpg",
    trackUrl: "https://soundcloud.com/ronald3d/dj-breakbeat-breaks-dealers",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ronald3d/dj-breakbeat-breaks-dealers&color=%23e2e800&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
  },
  {
    id: "dora-x-jakarta-ronald-3d-x-bto",
    title: "Dora x Jakarta - [Ronald 3D x bTo] -LBDJS-",
    author: "Ronald 3D - R3D",
    genre: "INDONESIAN BREAKBEAT",
    duration: "04:35",
    plays: "52.4K",
    likes: "3.2K",
    thumbnail: "https://i1.sndcdn.com/artworks-MWhn7aFyENgcVVNr-Xce3PQ-t500x500.jpg",
    trackUrl: "https://soundcloud.com/ronald3d/dora-x-jakarta-ronald-3d-x-bto",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ronald3d/dora-x-jakarta-ronald-3d-x-bto&color=%23e2e800&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
  }
];

export async function fetchLatestSoundCloudTracks() {
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent('https://soundcloud.com/ronald3d')}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(proxyUrl, {
      signal: controller.signal,
      cache: 'no-cache'
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const html = await response.text();
      const matches = [...html.matchAll(/href="\/ronald3d\/([^"/?#]+)"/g)].map(m => m[1]);
      const uniqueSlugs = [...new Set(matches)].filter(t => !['tracks', 'albums', 'sets', 'reposts', 'comments', 'likes', 'followers', 'following'].includes(t)).slice(0, 4);

      if (uniqueSlugs.length > 0) {
        const promises = uniqueSlugs.map(async (slug, i) => {
          const trackUrl = `https://soundcloud.com/ronald3d/${slug}`;
          try {
            const oembed = await fetch(`https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`);
            if (oembed.ok) {
              const data = await oembed.json();
              return {
                id: slug,
                title: data.title || DEFAULT_SOUNDCLOUD_TRACKS[i]?.title || `Ronald 3D Set #${i + 1}`,
                author: data.author_name || "Ronald 3D - R3D",
                genre: "BREAKBEAT TRACK",
                duration: DEFAULT_SOUNDCLOUD_TRACKS[i]?.duration || "Audio HD",
                plays: DEFAULT_SOUNDCLOUD_TRACKS[i]?.plays || "Live Stream",
                likes: DEFAULT_SOUNDCLOUD_TRACKS[i]?.likes || "Popular",
                thumbnail: data.thumbnail_url || DEFAULT_SOUNDCLOUD_TRACKS[i]?.thumbnail,
                trackUrl: trackUrl,
                embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&color=%23e2e800&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`
              };
            }
          } catch (e) { }
          return DEFAULT_SOUNDCLOUD_TRACKS[i];
        });

        const tracks = await Promise.all(promises);
        return { tracks: tracks.filter(Boolean), isLive: true };
      }
    }
  } catch (err) {
    console.info("SoundCloud live fetch fallback:", err.message);
  }

  return { tracks: DEFAULT_SOUNDCLOUD_TRACKS, isLive: false };
}
