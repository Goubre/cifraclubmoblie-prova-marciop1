const API_URL = 'https://jsonplaceholder.typicode.com';
const MUSIC_API_URL = 'https://itunes.apple.com/search';

async function request(path, { signal } = {}) {
  const response = await fetch(`${API_URL}${path}`, { signal });
  if (!response.ok) throw new Error(`Não foi possível carregar os dados (HTTP ${response.status}).`);
  return response.json();
}

async function searchMusic(term, { signal, limit = 20 } = {}) {
  const params = new URLSearchParams({
    term: term.trim(),
    media: 'music',
    entity: 'song',
    country: 'br',
    limit: String(limit),
  });
  const response = await fetch(`${MUSIC_API_URL}?${params.toString()}`, { signal });
  if (!response.ok) throw new Error(`Não foi possível buscar músicas (HTTP ${response.status}).`);

  const payload = await response.json();
  const results = Array.isArray(payload.results) ? payload.results : [];
  return results
    .filter((item) => item.trackId && item.trackName && item.artistName && item.artworkUrl100)
    .map((item) => ({
      id: String(item.trackId),
      song: item.trackName,
      artist: item.artistName,
      album: item.collectionName || '',
      artworkUrl: item.artworkUrl100.replace(/\/\d+x\d+bb\.jpg$/i, '/300x300bb.jpg'),
      storeUrl: item.trackViewUrl || item.collectionViewUrl || '',
      genre: item.primaryGenreName || '',
    }));
}

export const api = {
  users: (signal) => request('/users', { signal }),
  user: (id, signal) => request(`/users/${id}`, { signal }),
  searchMusic,
};
