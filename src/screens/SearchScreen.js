import React, { useCallback, useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
  ActivityIndicator,
  Image,
  Linking,
  RefreshControl,
} from 'react-native';

import { colors } from '../theme/colors';
import { api } from '../services/api';
import { withCache } from '../services/cache';

export default function SearchScreen({
  onNavigate,
  onOpenArtist,
  onOpenSong,
}) {
  const [search, setSearch] = useState('');
  const [musicResults, setMusicResults] = useState([]);
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicRefreshing, setMusicRefreshing] = useState(false);
  const [musicError, setMusicError] = useState('');
  const requestRef = useRef(null);
  const lastRequestAtRef = useRef(0);

  const results = [
    {
      id: 1,
      title: 'Nirvana',
      subtitle: 'Artista',
      type: 'artist',
      artist: 'Nirvana',
    },
    {
      id: 2,
      title: 'Come As You Are',
      subtitle: 'Nirvana',
      type: 'song',
      artist: 'Nirvana',
    },
    {
      id: 3,
      title: 'Smells Like Teen Spirit',
      subtitle: 'Nirvana',
      type: 'song',
      artist: 'Nirvana',
    },
    {
      id: 4,
      title: 'Heart-Shaped Box',
      subtitle: 'Nirvana',
      type: 'song',
      artist: 'Nirvana',
    },

    {
      id: 5,
      title: 'Metallica',
      subtitle: 'Artista',
      type: 'artist',
      artist: 'Metallica',
    },
    {
      id: 6,
      title: 'Enter Sandman',
      subtitle: 'Metallica',
      type: 'song',
      artist: 'Metallica',
    },
    {
      id: 7,
      title: 'Nothing Else Matters',
      subtitle: 'Metallica',
      type: 'song',
      artist: 'Metallica',
    },
    {
      id: 8,
      title: 'Master of Puppets',
      subtitle: 'Metallica',
      type: 'song',
      artist: 'Metallica',
    },

    {
      id: 9,
      title: "Guns N' Roses",
      subtitle: 'Artista',
      type: 'artist',
      artist: "Guns N' Roses",
    },
    {
      id: 10,
      title: "Sweet Child O' Mine",
      subtitle: "Guns N' Roses",
      type: 'song',
      artist: "Guns N' Roses",
    },
    {
      id: 11,
      title: 'November Rain',
      subtitle: "Guns N' Roses",
      type: 'song',
      artist: "Guns N' Roses",
    },
    {
      id: 12,
      title: 'Patience',
      subtitle: "Guns N' Roses",
      type: 'song',
      artist: "Guns N' Roses",
    },

    {
      id: 13,
      title: 'Red Hot Chili Peppers',
      subtitle: 'Artista',
      type: 'artist',
      artist: 'Red Hot Chili Peppers',
    },
    {
      id: 14,
      title: 'Californication',
      subtitle: 'Red Hot Chili Peppers',
      type: 'song',
      artist: 'Red Hot Chili Peppers',
    },
    {
      id: 15,
      title: 'Otherside',
      subtitle: 'Red Hot Chili Peppers',
      type: 'song',
      artist: 'Red Hot Chili Peppers',
    },
    {
      id: 16,
      title: 'Under the Bridge',
      subtitle: 'Red Hot Chili Peppers',
      type: 'song',
      artist: 'Red Hot Chili Peppers',
    },

    {
      id: 17,
      title: 'Foo Fighters',
      subtitle: 'Artista',
      type: 'artist',
      artist: 'Foo Fighters',
    },
    {
      id: 18,
      title: 'Everlong',
      subtitle: 'Foo Fighters',
      type: 'song',
      artist: 'Foo Fighters',
    },
    {
      id: 19,
      title: 'The Pretender',
      subtitle: 'Foo Fighters',
      type: 'song',
      artist: 'Foo Fighters',
    },
    {
      id: 20,
      title: 'Learn to Fly',
      subtitle: 'Foo Fighters',
      type: 'song',
      artist: 'Foo Fighters',
    },
  ];

  const filteredResults = search.trim()
    ? results.filter(
        (item) =>
          item.type === 'artist' && (
          item.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.subtitle
            .toLowerCase()
            .includes(search.toLowerCase())
          )
      )
    : [];

  const loadMusic = useCallback(async (term, refresh = false) => {
    const controller = new AbortController();
    requestRef.current?.abort();
    requestRef.current = controller;
    lastRequestAtRef.current = Date.now();
    if (refresh) setMusicRefreshing(true);
    else setMusicLoading(true);
    setMusicError('');

    try {
      const tracks = await withCache(
        `app:v1:itunes-search:${term.trim().toLowerCase()}`,
        () => api.searchMusic(term, { signal: controller.signal }),
        refresh ? 0 : undefined,
      );
      if (!controller.signal.aborted) setMusicResults(Array.isArray(tracks) ? tracks : []);
    } catch (error) {
      if (error.name !== 'AbortError' && !controller.signal.aborted) {
        setMusicResults([]);
        setMusicError(error.message || 'Não foi possível buscar músicas.');
      }
    } finally {
      if (!controller.signal.aborted) {
        setMusicLoading(false);
        setMusicRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    const term = search.trim();
    if (term.length < 2) {
      const timer = setTimeout(() => {
        requestRef.current?.abort();
        setMusicResults([]);
        setMusicLoading(false);
        setMusicError('');
      }, 0);
      return () => clearTimeout(timer);
    }

    const elapsed = Date.now() - lastRequestAtRef.current;
    const delay = Math.max(650, 3000 - elapsed);
    const timer = setTimeout(() => {
      setMusicLoading(true);
      setMusicResults([]);
      setMusicError('');
      loadMusic(term);
    }, delay);
    return () => {
      clearTimeout(timer);
      requestRef.current?.abort();
    };
  }, [loadMusic, search]);

  function handleResultPress(item) {
    if (item.type === 'artist') {
      onOpenArtist(item.artist);
      return;
    }

    if (item.type === 'song') {
      onOpenSong(item.title, item.artist);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={musicRefreshing} onRefresh={() => search.trim().length >= 2 && loadMusic(search.trim(), true)} tintColor={colors.primary} />}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Busca</Text>
          <Text style={styles.subtitle}>
            Encontre sua próxima música
          </Text>
        </View>

        <Pressable style={styles.communityButton} onPress={() => router.push('/comunidade')}>
          <Text style={styles.communityTitle}>Explorar comunidade</Text>
          <Text style={styles.communitySubtitle}>Veja perfis carregados ao vivo pela API →</Text>
        </Pressable>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Música, artista ou banda"
            placeholderTextColor={colors.muted}
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')} accessibilityRole="button" accessibilityLabel="Limpar busca">
              <Text style={styles.clearButton}>×</Text>
            </Pressable>
          )}
        </View>

        {search.trim() === '' ? (
          <>
            <Text style={styles.sectionTitle}>Explore</Text>

            <View style={styles.categories}>
              <View style={styles.category}>
                <Text style={styles.categoryIcon}>♪</Text>
                <Text style={styles.categoryText}>Músicas</Text>
              </View>

              <View style={styles.category}>
                <Text style={styles.categoryIcon}>♫</Text>
                <Text style={styles.categoryText}>Artistas</Text>
              </View>

              <View style={styles.category}>
                <Text style={styles.categoryIcon}>▣</Text>
                <Text style={styles.categoryText}>Álbuns</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              Artistas populares
            </Text>

            {[
              'Nirvana',
              'Metallica',
              "Guns N' Roses",
              'Red Hot Chili Peppers',
              'Foo Fighters',
            ].map((artist) => (
              <Pressable
                key={artist}
                style={styles.popularArtist}
                onPress={() => onOpenArtist(artist)}
              >
                <View style={styles.artistAvatar}>
                  <Text style={styles.artistAvatarText}>
                    {artist.charAt(0)}
                  </Text>
                </View>

                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>{artist}</Text>
                  <Text style={styles.resultSubtitle}>Artista</Text>
                </View>

                <Text style={styles.arrow}>›</Text>
              </Pressable>
            ))}
          </>
        ) : (
          <View style={styles.results}>
            <Text style={styles.sectionTitle}>Resultados da busca</Text>

            {filteredResults.map((item) => (
              <Pressable key={`artist-${item.id}`} style={styles.resultItem} onPress={() => handleResultPress(item)}>
                <View style={styles.resultIcon}><Text style={styles.resultIconText}>♫</Text></View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>{item.title}</Text>
                  <Text style={styles.resultSubtitle}>Artista</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </Pressable>
            ))}

            {musicLoading && (
              <View style={styles.apiState}>
                <ActivityIndicator color={colors.primary} />
                <Text style={styles.apiStateText}>Buscando no catálogo musical...</Text>
              </View>
            )}

            {!!musicError && (
              <View style={styles.empty}>
                <Text style={styles.noResults}>{musicError}</Text>
                <Pressable style={styles.retryButton} onPress={() => loadMusic(search.trim())}>
                  <Text style={styles.retryButtonText}>Tentar novamente</Text>
                </Pressable>
              </View>
            )}

            {search.trim().length === 1 && filteredResults.length === 0 && (
              <View style={styles.empty}>
                <Text style={styles.noResults}>Digite pelo menos duas letras para pesquisar.</Text>
              </View>
            )}

            {!musicLoading && !musicError && musicResults.length === 0 && filteredResults.length === 0 && search.trim().length >= 2 && (
              <View style={styles.empty}>
                <Text style={styles.emptyIcon}>⌕</Text>
                <Text style={styles.emptyTitle}>Nenhuma música encontrada</Text>
                <Text style={styles.noResults}>Tente pesquisar outro artista ou música.</Text>
              </View>
            )}

            {musicResults.map((item) => (
              <View key={item.id} style={styles.musicResult}>
                <Pressable
                  style={styles.musicResultMain}
                  onPress={() => onOpenSong(item.song, item.artist, item.artworkUrl, item.storeUrl)}
                  accessibilityRole="button"
                  accessibilityLabel={`Abrir cifra de ${item.song}, ${item.artist}`}
                >
                  <Image source={{ uri: item.artworkUrl }} style={styles.musicResultArtwork} />
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle} numberOfLines={1}>{item.song}</Text>
                    <Text style={styles.resultSubtitle} numberOfLines={1}>{item.artist}</Text>
                    {!!item.album && <Text style={styles.albumName} numberOfLines={1}>{item.album}</Text>}
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </Pressable>
                {!!item.storeUrl && (
                  <Pressable style={styles.appleLink} onPress={() => Linking.openURL(item.storeUrl)}>
                    <Text style={styles.appleLinkText}>Abrir no Apple Music</Text>
                  </Pressable>
                )}
              </View>
            ))}
            {!musicLoading && musicResults.length > 0 && (
              <Text style={styles.attribution}>Capas e dados fornecidos pelo iTunes.</Text>
            )}
          </View>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: StatusBar.currentHeight || 0,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 14,
    marginBottom: 22,
  },

  communityButton: { backgroundColor: colors.primarySoft, borderRadius: 14, borderWidth: 1, borderColor: colors.primary, padding: 14, marginBottom: 20 },
  communityTitle: { color: colors.text, fontWeight: '700', fontSize: 14 },
  communitySubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 5 },

  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 5,
  },

  searchContainer: {
    height: 56,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  searchIcon: {
    color: colors.textSecondary,
    fontSize: 24,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    height: '100%',
  },

  clearButton: {
    color: colors.textSecondary,
    fontSize: 27,
    paddingHorizontal: 5,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 15,
  },

  categories: {
    flexDirection: 'row',
  },

  category: {
    flex: 1,
    minHeight: 85,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryIcon: {
    color: colors.primary,
    fontSize: 21,
    marginBottom: 7,
  },

  categoryText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },

  popularArtist: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  artistAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  artistAvatarText: {
    color: colors.primary,
    fontSize: 19,
    fontWeight: '800',
  },

  results: {
    marginTop: 2,
  },

  resultItem: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  musicResult: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  musicResultMain: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
  },

  musicResultArtwork: {
    width: 58,
    height: 58,
    borderRadius: 10,
    backgroundColor: colors.surfaceLight,
    marginRight: 12,
  },

  albumName: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 3,
  },

  appleLink: {
    alignSelf: 'flex-end',
    paddingTop: 9,
    paddingHorizontal: 4,
  },

  appleLinkText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },

  attribution: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 8,
    marginBottom: 12,
  },

  apiState: {
    alignItems: 'center',
    paddingVertical: 22,
  },

  apiStateText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },

  retryButton: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    marginTop: 14,
  },

  retryButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },

  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  resultIconText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },

  resultInfo: {
    flex: 1,
  },

  resultTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },

  resultSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },

  arrow: {
    color: colors.muted,
    fontSize: 28,
  },

  empty: {
    alignItems: 'center',
    paddingTop: 50,
  },

  emptyIcon: {
    color: colors.muted,
    fontSize: 42,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
  },

  noResults: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 7,
  },

  bottomSpace: {
    height: 30,
  },
});
