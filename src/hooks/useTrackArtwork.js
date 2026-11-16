import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { withCache } from '../services/cache';

function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function trackKey(song, artist) {
  return `${normalize(song)}::${normalize(artist)}`;
}

export function useTrackArtwork(tracks) {
  const [artwork, setArtwork] = useState({});

  useEffect(() => {
    let active = true;
    if (!tracks.length) return () => { active = false; };

    Promise.all(tracks.map(async ({ title, artist }) => {
      const key = trackKey(title, artist);
      try {
        const results = await withCache(
          `app:v1:track-cover:${key}`,
          () => api.searchMusic(`${title} ${artist}`, { limit: 8 }),
          24 * 60 * 60 * 1000,
        );
        const normalizedTitle = normalize(title);
        const normalizedArtist = normalize(artist);
        const match = results.find((item) => (
          normalize(item.song) === normalizedTitle && normalize(item.artist) === normalizedArtist
        )) || results.find((item) => normalize(item.song) === normalizedTitle);
        return [key, match || null];
      } catch {
        return [key, null];
      }
    })).then((entries) => {
      if (active) setArtwork(Object.fromEntries(entries.filter(([, item]) => item)));
    });

    return () => { active = false; };
  }, [tracks]);

  return artwork;
}
