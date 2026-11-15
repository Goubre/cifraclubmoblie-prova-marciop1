import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { usePersistedState } from '../hooks/usePersistedState';
import { initialLists } from '../data/initialLists';
import { colors } from '../theme/colors';

export default function AddSongToListRoute() {
  const { song = '', artist = '' } = useLocalSearchParams();
  const songName = Array.isArray(song) ? song[0] : song;
  const artistName = Array.isArray(artist) ? artist[0] : artist;
  const [playlists, setPlaylists, ready, reloadPlaylists] = usePersistedState('app:v1:playlists', initialLists);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function addSong(playlistName) {
    if (!ready || saving) return;
    setSaving(true);
    setMessage('');
    const updated = playlists.map((playlist) => {
      if (playlist.nome !== playlistName) return playlist;
      const songs = playlist.songs || [];
      const alreadyAdded = songs.some((item) => item.song === songName && item.artist === artistName);
      return alreadyAdded ? playlist : { ...playlist, songs: [...songs, { song: songName, artist: artistName }] };
    });

    try {
      await setPlaylists(updated);
      const current = playlists.find((playlist) => playlist.nome === playlistName);
      const alreadyAdded = current?.songs?.some((item) => item.song === songName && item.artist === artistName);
      setMessage(alreadyAdded ? 'Essa cifra já está nesta lista.' : 'Cifra adicionada à lista.');
      if (!alreadyAdded) router.back();
    } catch {
      await reloadPlaylists();
      setMessage('Não foi possível salvar a cifra. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar à lista</Text>
      <Text style={styles.subtitle}>{songName} · {artistName}</Text>
      {!ready ? <ActivityIndicator color={colors.primary} style={styles.loading} /> : (
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.nome}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Crie uma lista para guardar esta cifra.</Text>}
          renderItem={({ item }) => {
            const count = (item.songs || []).length;
            return (
              <Pressable style={styles.row} onPress={() => addSong(item.nome)} disabled={saving}>
                <View style={styles.icon}><Text style={styles.iconText}>{item.icon || '♫'}</Text></View>
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
  info: { flex: 1 },
  name: { color: colors.text, fontWeight: '700', fontSize: 15 },
  count: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  arrow: { color: colors.primary, fontSize: 25 },
  empty: { color: colors.textSecondary, textAlign: 'center', padding: 20 },
  loading: { marginTop: 24 },
  saving: { marginVertical: 12 },
  message: { color: colors.primary, textAlign: 'center', fontWeight: '600', marginVertical: 12 },
});
