import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>cifraclub</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>30 anos</Text>
        </View>
      </View>

      <Text style={styles.title}>Descubra músicas para tocar</Text>

      <View style={styles.categories}>
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
          <Text style={styles.categoryText}>MPB</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Tocadas recentemente</Text>

      <View style={styles.song}>
        <View style={styles.songCover} />

        <View>
          <Text style={styles.songName}>I Remember You</Text>
          <Text style={styles.artist}>Adventure Time</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Músicas em alta</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },

  logo: {
    color: colors.text,
    fontSize: 27,
    fontWeight: 'bold',
  },

  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 5,
  },

  badgeText: {
    color: colors.text,
    fontWeight: 'bold',
  },

  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  categories: {
    flexDirection: 'row',
    marginBottom: 35,
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

  sectionTitle: {
    color: colors.text,
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 20,
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
    marginRight: 12,
  },

  songName: {
    color: colors.text,
    fontSize: 17,
  },

  artist: {
    color: colors.muted,
    marginTop: 3,
  },
});