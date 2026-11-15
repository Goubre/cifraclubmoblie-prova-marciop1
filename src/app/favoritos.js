import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors } from '../theme/colors';
import { usePersistedState } from '../hooks/usePersistedState';

export default function FavoritesRoute() {
  const [favorites, , ready, reloadFavorites] = usePersistedState('app:v1:favorites', []);

  useFocusEffect(useCallback(() => {
    if (ready) reloadFavorites();
  }, [ready, reloadFavorites]));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Músicas favoritas</Text>
      {!ready ? <ActivityIndicator color={colors.primary} style={styles.loading} /> : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => `${item.song}-${item.artist}`}
          ListEmptyComponent={<Text style={styles.empty}>Toque no coração em uma cifra para salvá-la aqui.</Text>}
          renderItem={({ item }) => (
            <Pressable style={styles.row} onPress={() => router.push({ pathname: '/musica', params: { song: item.song, artist: item.artist, artworkUrl: item.artworkUrl, storeUrl: item.storeUrl } })}>
              {item.artworkUrl ? <Image source={{ uri: item.artworkUrl }} style={styles.artwork} /> : null}
              <View style={styles.info}>
                <Text style={styles.song}>{item.song}</Text>
                <Text style={styles.artist}>{item.artist}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { color: colors.text, fontSize: 27, fontWeight: '800', marginBottom: 16 },
  row: { minHeight: 78, flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, backgroundColor: colors.surface, marginBottom: 9 },
  artwork: { width: 54, height: 54, borderRadius: 9, marginRight: 12 },
  info: { flex: 1 },
  song: { color: colors.text, fontWeight: '700', fontSize: 15 },
  artist: { color: colors.textSecondary, marginTop: 4 },
  empty: { color: colors.textSecondary, marginTop: 20 },
  loading: { marginTop: 20 },
});
