import React, { useState } from 'react';
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
  const [toneIndex, setToneIndex] = useState(0);
  const [simplified, setSimplified] = useState(false);

  const tones = [
    {
      name: 'Em',
      firstChord: 'Em',
      secondChord: 'D',
      simpleFirst: 'Em',
      simpleSecond: 'D',
    },
    {
      name: 'F#m',
      firstChord: 'F#m',
      secondChord: 'E',
      simpleFirst: 'F#m',
      simpleSecond: 'E',
    },
    {
      name: 'Gm',
      firstChord: 'Gm',
      secondChord: 'F',
      simpleFirst: 'Gm',
      simpleSecond: 'F',
    },
  ];

  const currentTone = tones[toneIndex];

  const firstChord = simplified
    ? currentTone.simpleFirst
    : currentTone.firstChord;

  const secondChord = simplified
    ? currentTone.simpleSecond
    : currentTone.secondChord;

  function changeTone() {
    const nextTone = (toneIndex + 1) % tones.length;
    setToneIndex(nextTone);
  }

  function toggleSimplified() {
    setSimplified(!simplified);
  }

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
          <Pressable
            style={[styles.tool, styles.activeTool]}
            onPress={changeTone}
          >
            <Text style={styles.activeToolText}>
              Tom: {currentTone.name}
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.tool,
              simplified && styles.activeTool,
            ]}
            onPress={toggleSimplified}
          >
            <Text
              style={
                simplified
                  ? styles.activeToolText
                  : styles.toolText
              }
            >
              Simplificar
            </Text>
          </Pressable>

          <View style={styles.tool}>
            <Text style={styles.toolText}>Rolagem</Text>
          </View>
        </View>

        {simplified && (
          <View style={styles.simplifiedMessage}>
            <Text style={styles.simplifiedMessageText}>
              Modo simplificado ativado
            </Text>
          </View>
        )}

        <Text style={styles.section}>Intro</Text>

        <Text style={styles.chord}>
          {firstChord}    {secondChord}    {firstChord}    {secondChord}
        </Text>

        <Text style={styles.section}>Primeira parte</Text>

        <Text style={styles.chord}>{firstChord}</Text>
        <Text style={styles.lyric}>
          Come as you are, as you were
        </Text>

        <Text style={styles.chord}>{secondChord}</Text>
        <Text style={styles.lyric}>
          As I want you to be
        </Text>

        <Text style={styles.chord}>{firstChord}</Text>
        <Text style={styles.lyric}>
          As a friend, as a friend
        </Text>

        <Text style={styles.chord}>{secondChord}</Text>
        <Text style={styles.lyric}>
          As an old enemy
        </Text>

        <Text style={styles.section}>Refrão</Text>

        <Text style={styles.chord}>{firstChord}</Text>
        <Text style={styles.lyric}>
          Memoria, memoria
        </Text>

        <Text style={styles.chord}>{secondChord}</Text>
        <Text style={styles.lyric}>
          Memoria
        </Text>

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
    marginBottom: 20,
  },

  tool: {
    backgroundColor: '#242424',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 8,
  },

  activeTool: {
    backgroundColor: '#ff6600',
  },

  toolText: {
    color: '#ffffff',
    fontSize: 13,
  },

  activeToolText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },

  simplifiedMessage: {
    backgroundColor: '#242424',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  simplifiedMessageText: {
    color: '#ff6600',
    fontSize: 13,
    fontWeight: '600',
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