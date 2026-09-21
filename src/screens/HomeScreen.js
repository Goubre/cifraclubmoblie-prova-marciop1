import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { colors } from '../theme/colors';
import BottomNav from '../components/BottomNav';

export default function HomeScreen({ onNavigate }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>cifraclub</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>30 anos</Text>
          </View>
        </View>

        <Text style={styles.title}>Descubra músicas para tocar</Text>

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
            <Text style={styles.categoryText}>Sertanejo</Text>
          </View>

          <View style={styles.category}>
            <Text style={styles.categoryText}>Gospel/Religioso</Text>
          </View>

          <View style={styles.category}>
            <Text style={styles.categoryText}>MPB</Text>
          </View>
        </ScrollView>

        <View style={styles.highlight}>
          <Text style={styles.highlightSmall}>Aprenda a tocar</Text>
          <Text style={styles.highlightTitle}>Your Song</Text>
          <Text style={styles.highlightArtist}>Elton John</Text>

          <View style={styles.highlightButton}>
            <Text style={styles.highlightButtonText}>Aprender a tocar</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tocadas recentemente</Text>

        <View style={styles.song}>
          <View style={styles.songCover}>
            <Text style={styles.coverText}>♪</Text>
          </View>

          <View>
            <Text style={styles.songName}>I Remember You</Text>
            <Text style={styles.artist}>Adventure Time</Text>
          </View>

          <Text style={styles.more}>⋮</Text>
        </View>

        <Text style={styles.sectionTitle}>Músicas em alta</Text>
      </ScrollView>

      <BottomNav active="Início" onNavigate={onNavigate} />
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
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  logo: {
    color: colors.text,
    fontSize: 27,
    fontWeight: 'bold',
  },

  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 5,
  },

  badgeText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 12,
  },

  title: {
    color: colors.text,
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  categoryScroll: {
    marginBottom: 22,
  },

  category: {
    backgroundColor: colors.surface,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 8,
  },

  categoryActive: {
    backgroundColor: colors.text,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 8,
  },

  categoryText: {
    color: colors.text,
  },

  categoryActiveText: {
    color: colors.background,
    fontWeight: 'bold',
  },

  highlight: {
    height: 260,
    backgroundColor: '#28201a',
    borderRadius: 22,
    justifyContent: 'flex-end',
    padding: 22,
    marginBottom: 15,
  },

  highlightSmall: {
    color: '#bdbdbd',
    fontSize: 13,
    marginBottom: 4,
  },

  highlightTitle: {
    color: colors.text,
    fontSize: 35,
    fontWeight: 'bold',
  },

  highlightArtist: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: 'bold',
  },

  highlightButton: {
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginTop: 15,
  },

  highlightButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 18,
  },

  song: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  songCover: {
    width: 55,
    height: 55,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  coverText: {
    color: colors.text,
    fontSize: 25,
  },

  songName: {
    color: colors.text,
    fontSize: 17,
  },

  artist: {
    color: colors.muted,
    marginTop: 3,
  },

  more: {
    color: colors.text,
    fontSize: 25,
    marginLeft: 'auto',
  },
});