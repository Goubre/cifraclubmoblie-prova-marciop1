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

export default function SongScreen({ onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.headerInfo}>
          <Text style={styles.title}>Come As You Are</Text>
          <Text style={styles.artist}>Nirvana</Text>
        </View>

        <Text style={styles.more}>•••</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tools}>
          <View style={styles.tool}>
            <Text style={styles.toolText}>Tom: Em</Text>
          </View>

          <View style={styles.tool}>
            <Text style={styles.toolText}>Simplificar</Text>
          </View>

          <View style={styles.tool}>
            <Text style={styles.toolText}>Rolagem</Text>
          </View>
        </View>

        <Text style={styles.section}>Intro</Text>

        <Text style={styles.chord}>Em    D    Em    D</Text>

        <Text style={styles.section}>Primeira parte</Text>

        <Text style={styles.chord}>Em</Text>
        <Text style={styles.lyric}>Come as you are, as you were</Text>

        <Text style={styles.chord}>D</Text>
        <Text style={styles.lyric}>As I want you to be</Text>

        <Text style={styles.chord}>Em</Text>
        <Text style={styles.lyric}>As a friend, as a friend</Text>

        <Text style={styles.chord}>D</Text>
        <Text style={styles.lyric}>As an old enemy</Text>

        <Text style={styles.section}>Refrão</Text>

        <Text style={styles.chord}>Em</Text>
        <Text style={styles.lyric}>Memoria, memoria</Text>

        <Text style={styles.chord}>D</Text>
        <Text style={styles.lyric}>Memoria</Text>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#292929',
  },

  backButton: {
    width: 42,
    height: 44,
    justifyContent: 'center',
  },

  backText: {
    color: '#ffffff',
    fontSize: 40,
    lineHeight: 40,
  },

  headerInfo: {
    flex: 1,
  },

  title: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: 'bold',
  },

  artist: {
    color: '#8e8e8e',
    fontSize: 14,
    marginTop: 3,
  },

  more: {
    color: '#ffffff',
    fontSize: 17,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  tools: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
  },

  tool: {
    backgroundColor: '#242424',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 8,
  },

  toolText: {
    color: '#ffffff',
    fontSize: 13,
  },

  section: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 14,
  },

  chord: {
    color: '#ff6600',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 9,
    fontFamily: 'monospace',
  },

  lyric: {
    color: '#eeeeee',
    fontSize: 16,
    lineHeight: 25,
    fontFamily: 'monospace',
  },

  bottomSpace: {
    height: 60,
  },
});