const API_URL = 'https://jsonplaceholder.typicode.com';
const MUSIC_API_URL = 'https://itunes.apple.com/search';
const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/w/api.php';

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

async function artistImage(artistName, { signal } = {}) {
  const params = new URLSearchParams({
    action: 'query',
    titles: artistName,
    prop: 'pageimages',
    pithumbsize: '640',
    format: 'json',
    formatversion: '2',
    origin: '*',
  });
  try {
    const response = await fetch(`${WIKIPEDIA_API_URL}?${params.toString()}`, { signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const page = payload.query?.pages?.[0];
    if (page && !page.missing && page.thumbnail?.source) {
      return {
        url: page.thumbnail.source,
        title: page.title,
        sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`,
        sourceLabel: 'Imagem da Wikipédia',
      };
    }
  } catch (error) {
    if (signal?.aborted) throw error;
  }

  try {
    const tracks = await searchMusic(artistName, { signal, limit: 30 });
    const normalizedArtist = artistName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const match = tracks.find((track) => (
      track.artist.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedArtist
    ));
    if (!match) return null;
    return {
      url: match.artworkUrl,
      title: match.album || match.song,
      sourceUrl: match.storeUrl,
      sourceLabel: 'Capa de álbum pelo iTunes',
    };
  } catch (error) {
    if (signal?.aborted) throw error;
    return null;
  }
}

export const api = {
  users: (signal) => request('/users', { signal }),
  user: (id, signal) => request(`/users/${id}`, { signal }),
  searchMusic,
  artistImage,
};
