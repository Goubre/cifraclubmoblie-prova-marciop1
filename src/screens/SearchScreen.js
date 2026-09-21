import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';

import BottomNav from '../components/BottomNav';
import { colors } from '../theme/colors';

export default function SearchScreen({
  onNavigate,
  onOpenArtist,
  onOpenSong,
}) {
  const [search, setSearch] = useState('');

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
          item.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.subtitle
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    : [];

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
      >
        <View style={styles.header}>
          <Text style={styles.title}>Busca</Text>
          <Text style={styles.subtitle}>
            Encontre sua próxima música
          </Text>
        </View>

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
            <Pressable onPress={() => setSearch('')}>
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
            <Text style={styles.sectionTitle}>Resultados</Text>

            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.resultItem}
                  onPress={() => handleResultPress(item)}
                >
                  <View style={styles.resultIcon}>
                    <Text style={styles.resultIconText}>
                      {item.type === 'artist' ? '♫' : '♪'}
                    </Text>
                  </View>

                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle}>
                      {item.title}
                    </Text>

                    <Text style={styles.resultSubtitle}>
                      {item.subtitle}
                    </Text>
                  </View>

                  <Text style={styles.arrow}>›</Text>
                </Pressable>
              ))
            ) : (
              <View style={styles.empty}>
                <Text style={styles.emptyIcon}>⌕</Text>

                <Text style={styles.emptyTitle}>
                  Nenhum resultado
                </Text>

                <Text style={styles.noResults}>
                  Tente pesquisar outro artista ou música.
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>

      <BottomNav active="Busca" onNavigate={onNavigate} />
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