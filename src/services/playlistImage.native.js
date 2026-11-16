import { Directory, File, Paths } from 'expo-file-system';

export async function savePlaylistCover(uri) {
  const directory = new Directory(Paths.document, 'playlist-covers');
  directory.create({ idempotent: true, intermediates: true });

  const image = new File(uri);
  const destination = new File(directory, `cover-${Date.now()}.jpg`);
  await image.copy(destination);
  return destination.uri;
}

export async function removePlaylistCover(uri) {
  if (!uri) return;
  try {
    const directory = new Directory(Paths.document, 'playlist-covers');
    if (!uri.startsWith(directory.uri)) return;
    const image = new File(uri);
    if (image.exists) image.delete();
  } catch {
    // Arquivos ausentes não impedem a atualização da playlist.
  }
}
