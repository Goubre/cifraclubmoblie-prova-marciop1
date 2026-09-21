import React from 'react';
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

export default function HomeScreen({ onNavigate }) {
  const trendingSongs = [
    {
      title: 'Come As You Are',
      artist: 'Nirvana',
      number: '01',
    },
    {
      title: 'Nothing Else Matters',
      artist: 'Metallica',
      number: '02',
    },
    {
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      number: '03',
    },
    {
      title: 'Californication',
      artist: 'Red Hot Chili Peppers',
      number: '04',
    },
  ];

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
          <View style={styles.categoryActive}>
            <Text style={styles.categoryActiveText}>Todos</Text>
          </View>

          <View style={styles.category}>
            <Text style={styles.categoryText}>Rock</Text>
          </View>

          <View style={styles.category}>
            <Text style={styles.categoryText}>Pop</Text>
          </View>

          <View style={styles.category}>
            <Text style={styles.categoryText}>Sertanejo</Text>
          </View>

          <View style={styles.category}>
            <Text style={styles.categoryText}>MPB</Text>
          </View>
        </ScrollView>

        <View style={styles.highlight}>
          <View style={styles.highlightTop}>
            <View style={styles.featureBadge}>
              <Text style={styles.featureBadgeText}>
                AULA EM DESTAQUE
              </Text>
            </View>

            <Text style={styles.highlightMusic}>♪</Text>
          </View>

          <View style={styles.highlightContent}>
            <Text style={styles.highlightSmall}>
              Aprenda a tocar
            </Text>

            <Text style={styles.highlightTitle}>
              Your Song
            </Text>

            <Text style={styles.highlightArtist}>
              Elton John
            </Text>

            <Pressable style={styles.highlightButton}>
              <Text style={styles.playIcon}>▶</Text>
              <Text style={styles.highlightButtonText}>
                Aprender a tocar
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Tocadas recentemente
          </Text>

          <Text style={styles.seeAll}>Ver todas</Text>
        </View>

        <View style={styles.recentCard}>
          <View style={styles.songCover}>
            <Text style={styles.coverText}>♪</Text>
          </View>

          <View style={styles.songInfo}>
            <Text style={styles.songName}>I Remember You</Text>
            <Text style={styles.artist}>Adventure Time</Text>
          </View>

          <Text style={styles.more}>•••</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Músicas em alta</Text>
          <Text style={styles.seeAll}>Ver mais</Text>
        </View>

        <View style={styles.trendingContainer}>
          {trendingSongs.map((song) => (
            <View key={song.title} style={styles.trendingSong}>
              <Text style={styles.songNumber}>
                {song.number}
              </Text>

              <View style={styles.trendingCover}>
                <Text style={styles.trendingCoverText}>♪</Text>
              </View>

              <View style={styles.songInfo}>
                <Text
                  style={styles.trendingTitle}
                  numberOfLines={1}
                >
                  {song.title}
                </Text>

                <Text style={styles.artist}>
                  {song.artist}
                </Text>
              </View>

              <Text style={styles.more}>•••</Text>
            </View>
          ))}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <BottomNav active="Início" onNavigate={onNavigate} />
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
    paddingTop: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 34,
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
    fontSize: 26,
    lineHeight: 33,
    fontWeight: '800',
    maxWidth: 300,
    marginBottom: 20,
  },

  categoryScroll: {
    marginBottom: 24,
  },

  category: {
    backgroundColor: colors.surface,
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 9,
    borderWidth: 1,
    borderColor: colors.border,
  },

  categoryActive: {
    backgroundColor: colors.text,
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 9,
  },

  categoryText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },

  categoryActiveText: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '700',
  },

  highlight: {
    minHeight: 260,
    backgroundColor: '#201812',
    borderRadius: 24,
    padding: 22,
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
    fontSize: 54,
    fontWeight: 'bold',
  },

  highlightContent: {
    marginTop: 35,
  },

  highlightSmall: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 4,
  },

  highlightTitle: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
  },

  highlightArtist: {
    color: colors.primary,
    fontSize: 19,
    fontWeight: '700',
    marginTop: 2,
  },

  highlightButton: {
    backgroundColor: colors.text,
    borderRadius: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 11,
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  playIcon: {
    color: colors.textDark,
    fontSize: 11,
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
    marginTop: 32,
    marginBottom: 15,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '800',
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
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  coverText: {
    color: colors.primary,
    fontSize: 23,
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

  more: {
    color: colors.muted,
    fontSize: 17,
    paddingHorizontal: 7,
  },

  trendingContainer: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  trendingSong: {
    minHeight: 74,
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
    width: 44,
    height: 44,
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

  bottomSpace: {
    height: 30,
  },
});