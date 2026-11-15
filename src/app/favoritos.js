import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors } from '../theme/colors';
import { usePersistedState } from '../hooks/usePersistedState';

export default function FavoritesRoute() {
  const [favorites, setFavorites, ready, reloadFavorites] = usePersistedState('app:v1:favorites', []);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useFocusEffect(useCallback(() => {
    if (ready) reloadFavorites();
  }, [ready, reloadFavorites]));

  async function removeFavorite() {
    if (!removeTarget || saving) return;
    setSaving(true);
    setError('');
    try {
      await setFavorites((current) => current.filter((item) => (
        item.song !== removeTarget.song || item.artist !== removeTarget.artist
      )));
      setRemoveTarget(null);
    } catch {
      await reloadFavorites();
      setError('Não foi possível remover a música. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Músicas favoritas</Text>
        <Text style={styles.subtitle}>{favorites.length} {favorites.length === 1 ? 'música salva' : 'músicas salvas'}</Text>
      </View>
      {removeTarget && (
        <View style={styles.confirmCard}>
          <View style={styles.confirmCopy}>
            <Text style={styles.confirmTitle}>Remover dos favoritos?</Text>
            <Text style={styles.confirmText} numberOfLines={1}>{removeTarget.song} · {removeTarget.artist}</Text>
          </View>
          <Pressable style={styles.cancelButton} onPress={() => setRemoveTarget(null)} disabled={saving}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </Pressable>
          <Pressable style={styles.confirmRemoveButton} onPress={removeFavorite} disabled={saving}>
            {saving ? <ActivityIndicator size="small" color={colors.white} /> : <Text style={styles.confirmRemoveText}>Remover</Text>}
          </Pressable>
        </View>
      )}
      {!!error && <Text style={styles.error}>{error}</Text>}
      {!ready ? <ActivityIndicator color={colors.primary} style={styles.loading} /> : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => `${item.song}-${item.artist}`}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.empty}>Toque no coração em uma cifra para salvá-la aqui.</Text>}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Pressable style={styles.songMain} onPress={() => router.push({ pathname: '/musica', params: { song: item.song, artist: item.artist, artworkUrl: item.artworkUrl, storeUrl: item.storeUrl } })}>
                {item.artworkUrl ? <Image source={{ uri: item.artworkUrl }} style={styles.artwork} /> : <View style={styles.artworkFallback}><Text style={styles.fallbackIcon}>♫</Text></View>}
                <View style={styles.info}>
                  <Text style={styles.song} numberOfLines={1}>{item.song}</Text>
                  <Text style={styles.artist} numberOfLines={1}>{item.artist}</Text>
                </View>
              </Pressable>
              <Pressable style={styles.removeButton} onPress={() => setRemoveTarget(item)} accessibilityRole="button" accessibilityLabel={`Remover ${item.song} dos favoritos`}>
                <Text style={styles.removeButtonText}>Remover</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20, backgroundColor: colors.background },
  header: { marginBottom: 18 },
  title: { color: colors.text, fontSize: 27, fontWeight: '800' },
  subtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 5 },
  listContent: { flexGrow: 1, paddingBottom: 28 },
  row: { minHeight: 80, flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 15, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, marginBottom: 10 },
  songMain: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center' },
  artwork: { width: 56, height: 56, borderRadius: 11, marginRight: 12, backgroundColor: colors.surfaceLight },
  artworkFallback: { width: 56, height: 56, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginRight: 12, backgroundColor: colors.primarySoft },
  fallbackIcon: { color: colors.primary, fontSize: 22 },
  info: { flex: 1 },
  song: { color: colors.text, fontWeight: '700', fontSize: 15 },
  artist: { color: colors.textSecondary, marginTop: 4 },
  removeButton: { minHeight: 38, justifyContent: 'center', paddingHorizontal: 10, marginLeft: 6, borderRadius: 10, backgroundColor: colors.primarySoft },
  removeButtonText: { color: colors.primary, fontSize: 11, fontWeight: '800' },
  confirmCard: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', padding: 14, marginBottom: 15, borderRadius: 16, backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.primary },
  confirmCopy: { flexBasis: '100%', marginBottom: 10 },
  confirmTitle: { color: colors.text, fontWeight: '800', fontSize: 14 },
  confirmText: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  cancelButton: { minHeight: 38, justifyContent: 'center', paddingHorizontal: 13, borderRadius: 10, backgroundColor: colors.surfaceLight, marginRight: 8 },
  cancelButtonText: { color: colors.text, fontSize: 12, fontWeight: '700' },
  confirmRemoveButton: { minWidth: 88, minHeight: 38, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 13, borderRadius: 10, backgroundColor: '#b93838' },
  confirmRemoveText: { color: colors.white, fontSize: 12, fontWeight: '800' },
  error: { color: '#ff8a80', fontSize: 12, marginBottom: 12 },
  empty: { color: colors.textSecondary, fontSize: 13, lineHeight: 20, marginTop: 20, padding: 20, borderRadius: 15, backgroundColor: colors.surface, textAlign: 'center' },
  loading: { marginTop: 20 },
});
