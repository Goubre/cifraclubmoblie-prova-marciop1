import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';

import { colors } from '../theme/colors';

export default function ArtistScreen({ onBack }) {
  const songs = [
    'Come As You Are',
    'Smells Like Teen Spirit',
    'Heart-Shaped Box',
    'Polly',
    'About a Girl',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.artistHeader}>
          <View style={styles.artistImage}>
            <Text style={styles.artistLogo}>NIRVANA</Text>
          </View>

          <Text style={styles.artistName}>Nirvana</Text>

          <Text style={styles.artistInfo}>
            1.245 cifras • 2.8 milhões de fãs
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Músicas populares</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabs}
        >
          <View style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Cifra</Text>
          </View>

          <View style={styles.tab}>
            <Text style={styles.tabText}>Letra</Text>
          </View>

          <View style={styles.tab}>
            <Text style={styles.tabText}>Tabs PRO</Text>
          </View>

          <View style={styles.tab}>
            <Text style={styles.tabText}>Tab de baixo</Text>
          </View>
        </ScrollView>

        <View style={styles.songList}>
          {songs.map((song, index) => (
            <Pressable key={song} style={styles.song}>
              <View style={styles.songNumber}>
                <Text style={styles.songNumberText}>{index + 1}</Text>
              </View>

              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{song}</Text>
                <Text style={styles.songType}>Nirvana • Cifra</Text>
              </View>

              <Text style={styles.more}>•••</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 15,
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },

  backText: {
    color: '#ffffff',
    fontSize: 40,
    lineHeight: 40,
  },

  artistHeader: {
    alignItems: 'center',
    marginTop: 10,
  },

  artistImage: {
    width: 135,
    height: 135,
    borderRadius: 68,
    backgroundColor: '#f2c500',
    justifyContent: 'center',
    alignItems: 'center',
  },

  artistLogo: {
    color: '#111111',
    fontSize: 20,
    fontWeight: 'bold',
  },

  artistName: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 18,
  },

  artistInfo: {
    color: '#8e8e8e',
    fontSize: 14,
    marginTop: 7,
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 34,
    marginBottom: 15,
  },

  tabs: {
    marginBottom: 10,
  },

  tab: {
    backgroundColor: '#242424',
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 9,
  },

  activeTab: {
    backgroundColor: '#ff6600',
  },

  tabText: {
    color: '#b5b5b5',
    fontSize: 14,
  },

  activeTabText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  songList: {
    marginTop: 10,
    paddingBottom: 30,
  },

  song: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#292929',
  },

  songNumber: {
    width: 34,
    alignItems: 'center',
  },

  songNumberText: {
    color: '#777777',
    fontSize: 15,
  },

  songInfo: {
    flex: 1,
    marginLeft: 10,
  },

  songTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },

  songType: {
    color: '#8e8e8e',
    fontSize: 13,
    marginTop: 5,
  },

  more: {
    color: '#8e8e8e',
    fontSize: 16,
  },
});