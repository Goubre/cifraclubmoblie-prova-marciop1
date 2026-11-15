import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { usePersistedState } from '../hooks/usePersistedState';
export default function FavoritesRoute() {
  const [favorites] = usePersistedState('app:v1:favorites', []);
  return <SafeAreaView style={styles.container}><Text style={styles.title}>Músicas favoritas</Text><FlatList data={favorites} keyExtractor={(item) => `${item.song}-${item.artist}`} ListEmptyComponent={<Text style={styles.empty}>Suas cifras salvas aparecerão aqui.</Text>} renderItem={({ item }) => <Pressable style={styles.row} onPress={() => router.push({ pathname: '/musica', params: { song: item.song, artist: item.artist } })}><Text style={styles.song}>{item.song}</Text><Text style={styles.artist}>{item.artist}</Text></Pressable>} /></SafeAreaView>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, backgroundColor: colors.background }, title: { color: colors.text, fontSize: 27, fontWeight: '800', marginBottom: 16 }, row: { padding: 15, borderRadius: 12, backgroundColor: colors.surface, marginBottom: 9 }, song: { color: colors.text, fontWeight: '700', fontSize: 15 }, artist: { color: colors.textSecondary, marginTop: 4 }, empty: { color: colors.textSecondary, marginTop: 20 } });
