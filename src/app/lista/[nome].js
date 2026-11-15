import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { usePersistedState } from '../../hooks/usePersistedState';
import { initialLists } from '../../data/initialLists';
import { colors } from '../../theme/colors';

export default function PlaylistRoute() {
  const { nome } = useLocalSearchParams();
  const listName = Array.isArray(nome) ? nome[0] : nome;
  const [playlists, , ready] = usePersistedState('app:v1:playlists', initialLists);
  const playlist = playlists.find((item) => item.nome === listName);
  const songs = playlist?.songs || [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{listName}</Text>
      <Text style={styles.subtitle}>{songs.length} {songs.length === 1 ? 'música' : 'músicas'}</Text>
      {!ready ? <Text style={styles.empty}>Carregando sua lista…</Text> : (
        <FlatList
          data={songs}
          keyExtractor={(item, index) => `${item.song}-${item.artist}-${index}`}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Esta lista ainda não tem cifras. Abra uma música e toque em “Adicionar à lista”.</Text>}
          renderItem={({ item }) => (
            <Pressable style={styles.row} onPress={() => router.push({ pathname: '/musica', params: { song: item.song, artist: item.artist } })}>
              <Text style={styles.song}>{item.song}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { color: colors.text, fontSize: 25, fontWeight: '800' },
  subtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 5, marginBottom: 16 },
  list: { flexGrow: 1 },
  row: { padding: 15, borderRadius: 12, backgroundColor: colors.surface, marginBottom: 9 },
  song: { color: colors.text, fontWeight: '700', fontSize: 15 },
  artist: { color: colors.textSecondary, marginTop: 4 },
  empty: { color: colors.textSecondary, fontSize: 13, lineHeight: 20, marginTop: 22 },
});
