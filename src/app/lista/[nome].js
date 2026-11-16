import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { usePersistedState } from '../../hooks/usePersistedState';
import { initialLists } from '../../data/initialLists';
import { colors } from '../../theme/colors';
import Artwork from '../../components/Artwork';
import { removePlaylistCover, savePlaylistCover } from '../../services/playlistImage';

export default function PlaylistRoute() {
  const { nome } = useLocalSearchParams();
  const listName = Array.isArray(nome) ? nome[0] : nome;
  const [playlists, setPlaylists, listsReady, reloadLists] = usePersistedState('app:v1:playlists', initialLists);
  const [favorites, setFavorites, favoritesReady, reloadFavorites] = usePersistedState('app:v1:favorites', []);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [coverError, setCoverError] = useState('');
  const [changingCover, setChangingCover] = useState(false);
  const isFavorites = listName === 'Favoritas';
  const playlist = playlists.find((item) => item.nome === listName);
  const songs = isFavorites ? favorites : playlist?.songs || [];
  const ready = listsReady && favoritesReady;

  useFocusEffect(useCallback(() => {
    if (listsReady) reloadLists();
    if (favoritesReady) reloadFavorites();
  }, [favoritesReady, listsReady, reloadFavorites, reloadLists]));

  async function removeSong() {
    if (!removeTarget || saving) return;
    setSaving(true);
    setError('');
    try {
      if (isFavorites) {
        await setFavorites((current) => current.filter((item) => (
          item.song !== removeTarget.song || item.artist !== removeTarget.artist
        )));
      } else {
        await setPlaylists((current) => current.map((item) => (
          item.nome === listName
            ? { ...item, songs: (item.songs || []).filter((song) => (
              song.song !== removeTarget.song || song.artist !== removeTarget.artist
            )) }
            : item
        )));
      }
      setRemoveTarget(null);
    } catch {
      if (isFavorites) await reloadFavorites();
      else await reloadLists();
      setError('Não foi possível remover a música. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  async function choosePlaylistCover() {
    if (!playlist?.custom || changingCover) return;
    setChangingCover(true);
    setCoverError('');
    let newCoverUri;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.82,
        base64: Platform.OS === 'web',
      });
      if (result.canceled || !result.assets?.[0]?.uri) return;

      newCoverUri = await savePlaylistCover(result.assets[0].uri, result.assets[0].base64);
      await setPlaylists((current) => current.map((item) => (
        item.nome === listName ? { ...item, coverUri: newCoverUri } : item
      )));
      if (playlist.coverUri && playlist.coverUri !== newCoverUri) {
        await removePlaylistCover(playlist.coverUri);
      }
    } catch {
      if (newCoverUri) await removePlaylistCover(newCoverUri);
      await reloadLists();
      setCoverError('Não foi possível salvar a foto. Tente escolher outra imagem.');
    } finally {
      setChangingCover(false);
    }
  }

  const coverUrl = playlist?.coverUri || songs[0]?.artworkUrl;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ready ? songs : []}
        keyExtractor={(item, index) => `${item.song}-${item.artist}-${index}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={(
          <>
            <View style={styles.hero}>
              <Artwork uri={coverUrl} name={listName} type={playlist?.coverUri ? 'playlist' : 'track'} style={styles.heroArtwork} />
              <View style={styles.heroInfo}>
                <Text style={styles.eyebrow}>{isFavorites ? 'SUA COLEÇÃO' : 'PLAYLIST'}</Text>
                <Text style={styles.title}>{listName}</Text>
                <Text style={styles.subtitle}>
                  {songs.length} {songs.length === 1 ? 'música' : 'músicas'}
                </Text>
              </View>
            </View>

            {!isFavorites && playlist?.custom && (
              <Pressable
                style={styles.changeCoverButton}
                onPress={choosePlaylistCover}
                disabled={changingCover}
                accessibilityRole="button"
              >
                <Text style={styles.changeCoverIcon}>{changingCover ? '…' : '▧'}</Text>
                <Text style={styles.changeCoverText}>
                  {changingCover ? 'Salvando foto…' : playlist.coverUri ? 'Trocar foto da playlist' : 'Escolher foto da galeria'}
                </Text>
              </Pressable>
            )}
            {!!coverError && <Text style={styles.error}>{coverError}</Text>}

            {removeTarget && (
              <View style={styles.confirmCard}>
                <View style={styles.confirmCopy}>
                  <Text style={styles.confirmTitle}>Remover esta música?</Text>
                  <Text style={styles.confirmText} numberOfLines={1}>
                    {removeTarget.song} · {removeTarget.artist}
                  </Text>
                </View>
                <Pressable style={styles.cancelButton} onPress={() => setRemoveTarget(null)} disabled={saving}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.confirmRemoveButton} onPress={removeSong} disabled={saving}>
                  {saving ? <ActivityIndicator size="small" color={colors.white} /> : <Text style={styles.confirmRemoveText}>Remover</Text>}
                </Pressable>
              </View>
            )}

            {!!error && <Text style={styles.error}>{error}</Text>}
            {!ready && <ActivityIndicator style={styles.loading} color={colors.primary} />}
            {ready && songs.length > 0 && (
              <Text style={styles.sectionLabel}>MÚSICAS DA LISTA</Text>
            )}
          </>
        )}
        ListEmptyComponent={ready ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}><Text style={styles.heroMusicNote}>♫</Text></View>
            <Text style={styles.emptyTitle}>Sua lista está vazia</Text>
            <Text style={styles.emptyText}>
              Abra uma música e escolha “Adicionar à lista” para guardar uma cifra aqui.
            </Text>
            <Pressable style={styles.browseButton} onPress={() => router.push('/busca')}>
              <Text style={styles.browseButtonText}>Encontrar músicas</Text>
            </Pressable>
          </View>
        ) : null}
        renderItem={({ item }) => (
          <View style={styles.songCard}>
            <Pressable
              style={styles.songMain}
              onPress={() => router.push({
                pathname: '/musica',
                params: { song: item.song, artist: item.artist, artworkUrl: item.artworkUrl, storeUrl: item.storeUrl },
              })}
              accessibilityRole="button"
              accessibilityLabel={`Abrir ${item.song}, ${item.artist}`}
            >
              <Artwork uri={item.artworkUrl} name={item.song} type="track" style={styles.songArtwork} />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle} numberOfLines={1}>{item.song}</Text>
                <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
              </View>
              <Text style={styles.openArrow}>›</Text>
            </Pressable>
            <Pressable
              style={styles.removeButton}
              onPress={() => setRemoveTarget(item)}
              accessibilityRole="button"
              accessibilityLabel={`Remover ${item.song} da lista`}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  listContent: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 32 },
  hero: { flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 22, borderRadius: 22, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  heroArtwork: { width: 96, height: 96, borderRadius: 16, backgroundColor: colors.surfaceLight },
  heroArtworkFallback: { width: 96, height: 96, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: colors.primarySoft },
  heroMusicNote: { color: colors.primary, fontSize: 32, fontWeight: '700' },
  heroInfo: { flex: 1, marginLeft: 16 },
  eyebrow: { color: colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { color: colors.text, fontSize: 24, lineHeight: 30, fontWeight: '800', marginTop: 5 },
  subtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 6 },
  changeCoverButton: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start', paddingHorizontal: 14, marginTop: -9, marginBottom: 17, borderRadius: 12, backgroundColor: colors.primarySoft },
  changeCoverIcon: { color: colors.primary, fontSize: 16, marginRight: 8 },
  changeCoverText: { color: colors.primary, fontSize: 12, fontWeight: '800' },
  confirmCard: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', padding: 14, marginBottom: 15, borderRadius: 16, backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.primary },
  confirmCopy: { flexBasis: '100%', marginBottom: 10 },
  confirmTitle: { color: colors.text, fontWeight: '800', fontSize: 14 },
  confirmText: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  cancelButton: { minHeight: 38, justifyContent: 'center', paddingHorizontal: 13, borderRadius: 10, backgroundColor: colors.surfaceLight, marginRight: 8 },
  cancelButtonText: { color: colors.text, fontSize: 12, fontWeight: '700' },
  confirmRemoveButton: { minWidth: 88, minHeight: 38, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 13, borderRadius: 10, backgroundColor: '#b93838' },
  confirmRemoveText: { color: colors.white, fontSize: 12, fontWeight: '800' },
  error: { color: '#ff8a80', fontSize: 12, marginBottom: 12 },
  loading: { marginTop: 20 },
  sectionLabel: { color: colors.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 10 },
  songCard: { flexDirection: 'row', alignItems: 'center', padding: 10, marginBottom: 10, borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, elevation: 2 },
  songMain: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center' },
  songArtwork: { width: 58, height: 58, borderRadius: 11, backgroundColor: colors.surfaceLight },
  songArtworkFallback: { width: 58, height: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: colors.primarySoft },
  songFallbackIcon: { color: colors.primary, fontSize: 22 },
  songInfo: { flex: 1, minWidth: 0, marginLeft: 12 },
  songTitle: { color: colors.text, fontSize: 14, fontWeight: '700' },
  songArtist: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  openArrow: { color: colors.muted, fontSize: 24, paddingHorizontal: 5 },
  removeButton: { minHeight: 38, justifyContent: 'center', paddingHorizontal: 10, marginLeft: 6, borderRadius: 10, backgroundColor: colors.primarySoft },
  removeButtonText: { color: colors.primary, fontSize: 11, fontWeight: '800' },
  emptyCard: { alignItems: 'center', padding: 24, marginTop: 16, borderRadius: 22, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  emptyIcon: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center', borderRadius: 32, backgroundColor: colors.primarySoft },
  emptyTitle: { color: colors.text, fontSize: 17, fontWeight: '800', marginTop: 15 },
  emptyText: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 7 },
  browseButton: { minHeight: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, marginTop: 18, borderRadius: 14, backgroundColor: colors.primary },
  browseButtonText: { color: colors.white, fontSize: 13, fontWeight: '800' },
});
