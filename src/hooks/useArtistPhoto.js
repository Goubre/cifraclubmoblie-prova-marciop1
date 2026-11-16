import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { withCache } from '../services/cache';

export function useArtistPhoto(artistName) {
  const [result, setResult] = useState({ artistName: null, photo: null });

  useEffect(() => {
    let active = true;

    withCache(
      `app:v2:artist-photo:${artistName.toLowerCase()}`,
      () => api.artistImage(artistName),
      24 * 60 * 60 * 1000,
    )
      .then((result) => {
        if (active) setResult({ artistName, photo: result });
      })
      .catch(() => {
        if (active) setResult({ artistName, photo: null });
      });

    return () => { active = false; };
  }, [artistName]);

  return result.artistName === artistName ? result.photo : null;
}
