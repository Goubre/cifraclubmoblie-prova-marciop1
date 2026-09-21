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

const tabs = [
  'Cifras',
  'Letras',
  'Tabs PRO',
  'Baixo',
  'Bateria',
];

export default function ArtistScreen({
  artistName = 'Nirvana',
  onBack,
  onOpenSong,
}) {
  const [activeTab, setActiveTab] = useState('Cifras');
  const [following, setFollowing] = useState(false);

  const artist = artists[artistName] || artists.Nirvana;

  function getTypeName() {
    if (activeTab === 'Cifras') {
      return 'Cifra';
    }

    if (activeTab === 'Letras') {
      return 'Letra';
    }

    if (activeTab === 'Tabs PRO') {
      return 'Tab PRO';
    }

    if (activeTab === 'Baixo') {
      return 'Tab de baixo';
    }

    return 'Tab de bateria';
  }

  function handleSongPress(song) {
    if (activeTab === 'Cifras') {
      onOpenSong(song, artist.name);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <Pressable
            onPress={onBack}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <Text style={styles.topTitle}>Artista</Text>

          <Pressable style={styles.optionsButton}>
            <Text style={styles.optionsText}>•••</Text>
          </Pressable>
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
                  following && styles.followingButtonText,
                ]}
              >
                {following ? 'Seguindo' : 'Seguir'}
              </Text>
            </Pressable>

            <Pressable
              style={styles.playButton}
              onPress={() =>
                handleSongPress(artist.songs[0])
              }
            >
              <Text style={styles.playButtonText}>▶</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Músicas populares
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabs}
        >
          {tabs.map((tab) => {
            const selected = activeTab === tab;

            return (
              <Pressable
                key={tab}
                style={[
                  styles.tab,
                  selected && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={
                    selected
                      ? styles.activeTabText
                      : styles.tabText
                  }
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.selectedType}>
          <Text style={styles.selectedTypeLabel}>
            Exibindo
          </Text>

          <Text style={styles.selectedTypeValue}>
            {activeTab}
          </Text>
        </View>

        <View style={styles.songList}>
          {artist.songs.map((song, index) => (
            <Pressable
              key={song}
              style={styles.song}
              onPress={() => handleSongPress(song)}
            >
              <Text style={styles.songNumber}>
                {String(index + 1).padStart(2, '0')}
              </Text>

              <View style={styles.songIcon}>
                <Text style={styles.songIconText}>
                  {activeTab === 'Letras' ? '≡' : '♪'}
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
                  {artist.name} • {getTypeName()}
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>

        {activeTab !== 'Cifras' && (
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>
              {activeTab}
            </Text>

            <Text style={styles.infoCardText}>
              Você está visualizando as opções de{' '}
              {activeTab.toLowerCase()} disponíveis para{' '}
              {artist.name}.
            </Text>
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

  topBar: {
    height: 54,
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
    fontSize: 14,
    fontWeight: '600',
  },

  optionsButton: {
    width: 44,
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  optionsText: {
    color: colors.textSecondary,
    fontSize: 16,
  },

  artistHeader: {
    alignItems: 'center',
    paddingTop: 16,
  },

  artistImage: {
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: '#4b2c18',
    alignItems: 'center',
    justifyContent: 'center',
  },

  artistLogo: {
    color: colors.primary,
    fontSize: 43,
    fontWeight: '900',
  },

  smallLogo: {
    fontSize: 25,
  },

  artistName: {
    color: colors.text,
    fontSize: 29,
    fontWeight: '800',
    marginTop: 18,
    textAlign: 'center',
  },

  genre: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 7,
  },

  artistInfo: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 6,
  },

  artistActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  followButton: {
    height: 40,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    justifyContent: 'center',
  },

  followingButton: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },

  followButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },

  followingButtonText: {
    color: colors.textDark,
  },

  playButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  playButtonText: {
    color: colors.white,
    fontSize: 14,
    marginLeft: 2,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '800',
    marginTop: 35,
    marginBottom: 16,
  },

  tabs: {
    marginBottom: 15,
  },

  tab: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },

  activeTab: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },

  tabText: {
    color: colors.textSecondary,
    fontSize: 13,
  },

  activeTabText: {
    color: colors.textDark,
    fontSize: 13,
    fontWeight: '700',
  },

  selectedType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  selectedTypeLabel: {
    color: colors.muted,
    fontSize: 12,
    marginRight: 6,
  },

  selectedTypeValue: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },

  songList: {
    marginTop: 5,
  },

  song: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  songNumber: {
    color: colors.muted,
    fontSize: 12,
    width: 27,
  },

  songIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  songIconText: {
    color: colors.primary,
    fontSize: 18,
  },

  songInfo: {
    flex: 1,
  },

  songTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },

  songType: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },

  arrow: {
    color: colors.muted,
    fontSize: 25,
    paddingLeft: 10,
  },

  infoCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 15,
    marginTop: 20,
  },

  infoCardTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },

  infoCardText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  bottomSpace: {
    height: 40,
  },
});