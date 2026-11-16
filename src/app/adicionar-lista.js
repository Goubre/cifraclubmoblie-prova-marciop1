import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { usePersistedState } from '../hooks/usePersistedState';
import { initialLists } from '../data/initialLists';
import { colors } from '../theme/colors';
import Artwork from '../components/Artwork';

export default function AddSongToListRoute() {
  const { song = '', artist = '', artworkUrl = '', storeUrl = '' } = useLocalSearchParams();
  const songName = Array.isArray(song) ? song[0] : song;
  const artistName = Array.isArray(artist) ? artist[0] : artist;
  const coverUrl = Array.isArray(artworkUrl) ? artworkUrl[0] : artworkUrl;
  const musicStoreUrl = Array.isArray(storeUrl) ? storeUrl[0] : storeUrl;
  const [playlists, setPlaylists, ready, reloadPlaylists] = usePersistedState('app:v1:playlists', initialLists);
  const [favorites, setFavorites, favoritesReady, reloadFavorites] = usePersistedState('app:v1:favorites', []);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function addSong(playlistName) {
    if (!ready || !favoritesReady || saving) return;
    setSaving(true);
    setMessage('');
    const isFavorites = playlistName === 'Favoritas';
    const currentItems = isFavorites
      ? favorites
      : playlists.find((playlist) => playlist.nome === playlistName)?.songs || [];
    const alreadyAdded = currentItems.some((item) => item.song === songName && item.artist === artistName);
    const updated = playlists.map((playlist) => {
      if (playlist.nome !== playlistName) return playlist;
      const songs = playlist.songs || [];
      return alreadyAdded ? playlist : { ...playlist, songs: [...songs, { song: songName, artist: artistName, artworkUrl: coverUrl, storeUrl: musicStoreUrl }] };
    });

    try {
      if (isFavorites) {
        if (!alreadyAdded) await setFavorites((current) => [...current, { song: songName, artist: artistName, artworkUrl: coverUrl, storeUrl: musicStoreUrl }]);
      } else {
        await setPlaylists(updated);
      }
      setMessage(alreadyAdded ? 'Essa cifra já está nesta lista.' : 'Cifra adicionada à lista.');
      if (!alreadyAdded) router.back();
    } catch {
      if (isFavorites) await reloadFavorites();
      else await reloadPlaylists();
      setMessage('Não foi possível salvar a cifra. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar à lista</Text>
      <Text style={styles.subtitle}>{songName} · {artistName}</Text>
      {(!ready || !favoritesReady) ? <ActivityIndicator color={colors.primary} style={styles.loading} /> : (
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.nome}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Crie uma lista para guardar esta cifra.</Text>}
          renderItem={({ item }) => {
            const count = item.nome === 'Favoritas' ? favorites.length : (item.songs || []).length;
            return (
              <Pressable style={styles.row} onPress={() => addSong(item.nome)} disabled={saving}>
                <Artwork uri={coverUrl || item.coverUri || item.songs?.[0]?.artworkUrl} name={item.nome} type="playlist" style={styles.icon} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.nome}</Text>
                  <Text style={styles.count}>{count} {count === 1 ? 'música' : 'músicas'}</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </Pressable>
            );
          }}
        />
      )}
      {!!message && <Text style={styles.message}>{message}</Text>}
      {saving && <ActivityIndicator color={colors.primary} style={styles.saving} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { color: colors.text, fontSize: 26, fontWeight: '800' },
  subtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 6, marginBottom: 18 },
  list: { flexGrow: 1 },
  row: { minHeight: 72, flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 9, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  icon: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: colors.primarySoft, marginRight: 12 },
  iconText: { color: colors.primary, fontSize: 20 },
  iconImage: { width: 44, height: 44, borderRadius: 12 },
  info: { flex: 1 },
  name: { color: colors.text, fontWeight: '700', fontSize: 15 },
  count: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  arrow: { color: colors.primary, fontSize: 25 },
  empty: { color: colors.textSecondary, textAlign: 'center', padding: 20 },
  loading: { marginTop: 24 },
  saving: { marginVertical: 12 },
  message: { color: colors.primary, textAlign: 'center', fontWeight: '600', marginVertical: 12 },
});
