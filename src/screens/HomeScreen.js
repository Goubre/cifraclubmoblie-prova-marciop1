import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';

import { colors } from '../theme/colors';
import BottomNav from '../components/BottomNav';

export default function HomeScreen({
  onNavigate,
  onOpenArtist,
  onOpenSong,
}) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = [
    'Todos',
    'Rock',
    'Pop',
    'Sertanejo',
    'MPB',
  ];

  const songs = [
    {
      title: 'Come As You Are',
      artist: 'Nirvana',
      genre: 'Rock',
    },
    {
      title: 'Nothing Else Matters',
      artist: 'Metallica',
      genre: 'Rock',
    },
    {
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      genre: 'Rock',
    },
    {
      title: 'Californication',
      artist: 'Red Hot Chili Peppers',
      genre: 'Rock',
    },
    {
      title: 'Trevo',
      artist: 'ANAVITÓRIA',
      genre: 'Pop',
    },
    {
      title: 'Velha Infância',
      artist: 'Tribalistas',
      genre: 'MPB',
    },
    {
      title: 'Evidências',
      artist: 'Chitãozinho & Xororó',
      genre: 'Sertanejo',
    },
  ];

  const filteredSongs =
    selectedCategory === 'Todos'
      ? songs.slice(0, 4)
      : songs.filter(
          (song) => song.genre === selectedCategory
        );

  function handleSongPress(song) {
    if (
      song.artist === 'Nirvana' ||
      song.artist === 'Metallica' ||
      song.artist === "Guns N' Roses" ||
      song.artist === 'Red Hot Chili Peppers'
    ) {
      onOpenSong?.(song.title, song.artist);
      return;
    }

    onNavigate('Busca');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <View style={styles.logoRow}>
              <Text style={styles.logo}>cifraclub</Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>30 anos</Text>
              </View>
            </View>

            <Text style={styles.welcome}>
              O que você quer tocar hoje?
            </Text>
          </View>

          <Pressable
            style={styles.searchButton}
            onPress={() => onNavigate('Busca')}
          >
            <Text style={styles.searchIcon}>⌕</Text>
          </Pressable>
        </View>

        <Text style={styles.title}>
          Descubra músicas para tocar
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <Pressable
                key={category}
                style={
                  active
                    ? styles.categoryActive
                    : styles.category
                }
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={
                    active
                      ? styles.categoryActiveText
                      : styles.categoryText
                  }
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.highlight}>
          <View style={styles.highlightTop}>
            <View style={styles.featureBadge}>
              <Text style={styles.featureBadgeText}>
                DESTAQUE
              </Text>
            </View>

            <Text style={styles.highlightMusic}>♫</Text>
          </View>

          <View style={styles.highlightContent}>
            <Text style={styles.highlightSmall}>
              Uma das mais tocadas
            </Text>

            <Text style={styles.highlightTitle}>
              Come As You Are
            </Text>

            <Pressable
              onPress={() => onOpenArtist?.('Nirvana')}
            >
              <Text style={styles.highlightArtist}>
                Nirvana
              </Text>
            </Pressable>

            <Pressable
              style={styles.highlightButton}
              onPress={() =>
                onOpenSong?.('Come As You Are', 'Nirvana')
              }
            >
              <Text style={styles.playIcon}>▶</Text>

              <Text style={styles.highlightButtonText}>
                Abrir cifra
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Continue tocando
          </Text>
        </View>

        <Pressable
          style={styles.recentCard}
          onPress={() =>
            onOpenSong?.('Come As You Are', 'Nirvana')
          }
        >
          <View style={styles.songCover}>
            <Text style={styles.coverText}>♪</Text>
          </View>

          <View style={styles.songInfo}>
            <Text style={styles.songName}>
              Come As You Are
            </Text>

            <Text style={styles.artist}>
              Nirvana • Cifra
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Músicas em alta
            </Text>

            {selectedCategory !== 'Todos' && (
              <Text style={styles.filterLabel}>
                {selectedCategory}
              </Text>
            )}
          </View>

          <Pressable onPress={() => onNavigate('Busca')}>
            <Text style={styles.seeAll}>Ver mais</Text>
          </Pressable>
        </View>

        <View style={styles.trendingContainer}>
          {filteredSongs.map((song, index) => (
            <Pressable
              key={`${song.title}-${song.artist}`}
              style={styles.trendingSong}
              onPress={() => handleSongPress(song)}
            >
              <Text style={styles.songNumber}>
                {String(index + 1).padStart(2, '0')}
              </Text>

              <View style={styles.trendingCover}>
                <Text style={styles.trendingCoverText}>
                  ♪
                </Text>
              </View>

              <View style={styles.songInfo}>
                <Text
                  style={styles.trendingTitle}
                  numberOfLines={1}
                >
                  {song.title}
                </Text>

                <Text
                  style={styles.artist}
                  numberOfLines={1}
                >
                  {song.artist}
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Artistas populares
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {[
            { name: 'Nirvana', initials: 'N' },
            { name: 'Metallica', initials: 'M' },
            { name: "Guns N' Roses", initials: 'GNR' },
            { name: 'Foo Fighters', initials: 'FF' },
          ].map((artist) => (
            <Pressable
              key={artist.name}
              style={styles.artistCard}
              onPress={() => onOpenArtist?.(artist.name)}
            >
              <View style={styles.artistCircle}>
                <Text style={styles.artistInitials}>
                  {artist.initials}
                </Text>
              </View>

              <Text
                style={styles.artistCardName}
                numberOfLines={1}
              >
                {artist.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <BottomNav
        active="Início"
        onNavigate={onNavigate}
      />
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
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: -1,
  },

  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 7,
  },

  badgeText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 10,
  },

  welcome: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 6,
  },

  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  searchIcon: {
    color: colors.text,
    fontSize: 25,
  },

  title: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '800',
    marginBottom: 19,
  },

  categoryScroll: {
    marginBottom: 22,
  },

  category: {
    backgroundColor: colors.surface,
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 9,
    borderWidth: 1,
    borderColor: colors.border,
  },

  categoryActive: {
    backgroundColor: colors.text,
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 9,
  },

  categoryText: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  categoryActiveText: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '700',
  },

  highlight: {
    minHeight: 225,
    backgroundColor: '#201812',
    borderRadius: 22,
    padding: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#34271e',
  },

  highlightTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  featureBadge: {
    backgroundColor: colors.primarySoft,
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  featureBadgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  highlightMusic: {
    color: '#4b3729',
    fontSize: 50,
    fontWeight: 'bold',
  },

  highlightContent: {
    marginTop: 25,
  },

  highlightSmall: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },

  highlightTitle: {
    color: colors.text,
    fontSize: 29,
    fontWeight: '800',
    letterSpacing: -0.6,
  },

  highlightArtist: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 3,
  },

  highlightButton: {
    backgroundColor: colors.text,
    borderRadius: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  playIcon: {
    color: colors.textDark,
    fontSize: 10,
    marginRight: 8,
  },

  highlightButtonText: {
    color: colors.textDark,
    fontWeight: '700',
    fontSize: 13,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 29,
    marginBottom: 14,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },

  filterLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },

  seeAll: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },

  recentCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  songCover: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  coverText: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: 'bold',
  },

  songInfo: {
    flex: 1,
  },

  songName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },

  artist: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },

  arrow: {
    color: colors.muted,
    fontSize: 27,
    paddingHorizontal: 6,
  },

  trendingContainer: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  trendingSong: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  songNumber: {
    color: colors.muted,
    width: 28,
    fontSize: 12,
    fontWeight: '600',
  },

  trendingCover: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  trendingCoverText: {
    color: colors.primary,
    fontSize: 18,
  },

  trendingTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },

  artistCard: {
    width: 92,
    marginRight: 14,
    alignItems: 'center',
  },

  artistCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: '#4b2c18',
    alignItems: 'center',
    justifyContent: 'center',
  },

  artistInitials: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '800',
  },

  artistCardName: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 9,
    width: 90,
    textAlign: 'center',
  },

  bottomSpace: {
    height: 30,
  },
});