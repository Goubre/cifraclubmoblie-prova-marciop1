import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';

import { colors } from '../theme/colors';

const artists = {
  Nirvana: {
    name: 'Nirvana',
    initials: 'N',
    description: 'Rock • Grunge',
    info: '1.245 cifras • 2,8 milhões de fãs',
    songs: [
      'Come As You Are',
      'Smells Like Teen Spirit',
      'Heart-Shaped Box',
      'Polly',
      'About a Girl',
    ],
  },

  Metallica: {
    name: 'Metallica',
    initials: 'M',
    description: 'Metal • Heavy Metal',
    info: '1.087 cifras • 2,4 milhões de fãs',
    songs: [
      'Enter Sandman',
      'Nothing Else Matters',
      'Master of Puppets',
      'The Unforgiven',
      'One',
    ],
  },

  "Guns N' Roses": {
    name: "Guns N' Roses",
    initials: 'GNR',
    description: 'Rock • Hard Rock',
    info: '932 cifras • 2,1 milhões de fãs',
    songs: [
      "Sweet Child O' Mine",
      'November Rain',
      'Patience',
      "Knockin' on Heaven's Door",
      'Welcome to the Jungle',
    ],
  },

  'Red Hot Chili Peppers': {
    name: 'Red Hot Chili Peppers',
    initials: 'RHCP',
    description: 'Rock • Alternative',
    info: '814 cifras • 1,7 milhão de fãs',
    songs: [
      'Californication',
      'Otherside',
      'Under the Bridge',
      'Snow (Hey Oh)',
      "Can't Stop",
    ],
  },

  'Foo Fighters': {
    name: 'Foo Fighters',
    initials: 'FF',
    description: 'Rock • Alternative',
    info: '653 cifras • 1,2 milhão de fãs',
    songs: [
      'Everlong',
      'The Pretender',
      'Learn to Fly',
      'Best of You',
      'My Hero',
    ],
  },
};

export default function ArtistScreen({
  artistName = 'Nirvana',
  onBack,
  onOpenSong,
}) {
  const [following, setFollowing] = useState(false);

  const artist = artists[artistName] || artists.Nirvana;

  function openFirstSong() {
    onOpenSong(artist.songs[0], artist.name);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <Pressable
            onPress={onBack}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <Text style={styles.topTitle}>
            Artista
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <View style={styles.artistHeader}>
          <View style={styles.artistImage}>
            <Text
              style={[
                styles.artistLogo,
                artist.initials.length > 2 &&
                  styles.smallLogo,
              ]}
            >
              {artist.initials}
            </Text>
          </View>

          <Text style={styles.artistName}>
            {artist.name}
          </Text>

          <Text style={styles.genre}>
            {artist.description}
          </Text>

          <Text style={styles.artistInfo}>
            {artist.info}
          </Text>

          <View style={styles.artistActions}>
            <Pressable
              style={[
                styles.followButton,
                following && styles.followingButton,
              ]}
              onPress={() => setFollowing(!following)}
            >
              <Text
                style={[
                  styles.followButtonText,
                  following &&
                    styles.followingButtonText,
                ]}
              >
                {following ? 'Seguindo' : 'Seguir'}
              </Text>
            </Pressable>

            <Pressable
              style={styles.playButton}
              onPress={openFirstSong}
            >
              <Text style={styles.playButtonIcon}>
                ▶
              </Text>

              <Text style={styles.playButtonText}>
                Tocar
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Cifras
            </Text>

            <Text style={styles.sectionSubtitle}>
              Músicas populares de {artist.name}
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {artist.songs.length}
            </Text>
          </View>
        </View>

        <View style={styles.songList}>
          {artist.songs.map((song, index) => (
            <Pressable
              key={song}
              style={({ pressed }) => [
                styles.song,
                pressed && styles.songPressed,
              ]}
              onPress={() =>
                onOpenSong(song, artist.name)
              }
            >
              <Text style={styles.songNumber}>
                {String(index + 1).padStart(2, '0')}
              </Text>

              <View style={styles.songIcon}>
                <Text style={styles.songIconText}>
                  ♪
                </Text>
              </View>

              <View style={styles.songInfo}>
                <Text
                  style={styles.songTitle}
                  numberOfLines={1}
                >
                  {song}
                </Text>

                <Text style={styles.songType}>
                  {artist.name} • Cifra
                </Text>
              </View>

              <Text style={styles.arrow}>
                ›
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Text style={styles.tipIconText}>♪</Text>
          </View>

          <View style={styles.tipInfo}>
            <Text style={styles.tipTitle}>
              Escolha uma música
            </Text>

            <Text style={styles.tipText}>
              Toque em uma das cifras acima para abrir
              os acordes e ferramentas.
            </Text>
          </View>
        </View>

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
  },

  scrollContent: {
    paddingHorizontal: 20,
  },

  topBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },

  backText: {
    color: colors.text,
    fontSize: 38,
    lineHeight: 38,
  },

  topTitle: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },

  headerSpace: {
    width: 44,
  },

  artistHeader: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },

  artistImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: '#4b2c18',
    alignItems: 'center',
    justifyContent: 'center',
  },

  artistLogo: {
    color: colors.primary,
    fontSize: 39,
    fontWeight: '900',
  },

  smallLogo: {
    fontSize: 23,
  },

  artistName: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 16,
    textAlign: 'center',
  },

  genre: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },

  artistInfo: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 6,
  },

  artistActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 19,
  },

  followButton: {
    height: 42,
    paddingHorizontal: 24,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  followingButton: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },

  followButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },

  followingButtonText: {
    color: colors.textDark,
  },

  playButton: {
    height: 42,
    paddingHorizontal: 19,
    borderRadius: 21,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  playButtonIcon: {
    color: colors.white,
    fontSize: 11,
    marginRight: 7,
  },

  playButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 14,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '800',
  },

  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },

  countBadge: {
    minWidth: 31,
    height: 31,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  countText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },

  songList: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 14,
    overflow: 'hidden',
  },

  song: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  songPressed: {
    opacity: 0.55,
  },

  songNumber: {
    color: colors.muted,
    fontSize: 11,
    width: 27,
    fontWeight: '600',
  },

  songIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  songIconText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },

  songInfo: {
    flex: 1,
    paddingRight: 8,
  },

  songTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },

  songType: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },

  arrow: {
    color: colors.muted,
    fontSize: 27,
  },

  tipCard: {
    backgroundColor: colors.surface,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  tipIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tipIconText: {
    color: colors.primary,
    fontSize: 17,
  },

  tipInfo: {
    flex: 1,
    marginLeft: 12,
  },

  tipTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },

  tipText: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },

  bottomSpace: {
    height: 40,
  },
});