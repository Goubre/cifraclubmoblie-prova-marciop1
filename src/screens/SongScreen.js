import React, { useEffect, useRef, useState } from 'react';
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

export default function SongScreen({
  onBack,
  songName = 'Come As You Are',
  artistName = 'Nirvana',
}) {
  const [toneIndex, setToneIndex] = useState(0);
  const [simplified, setSimplified] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const scrollRef = useRef(null);
  const scrollPosition = useRef(0);

  const tones = [
    {
      name: 'Em',
      firstChord: 'Em',
      secondChord: 'D',
    },
    {
      name: 'F#m',
      firstChord: 'F#m',
      secondChord: 'E',
    },
    {
      name: 'Gm',
      firstChord: 'Gm',
      secondChord: 'F',
    },
  ];

  const currentTone = tones[toneIndex];

  function changeTone() {
    const nextTone = (toneIndex + 1) % tones.length;
    setToneIndex(nextTone);
  }

  function toggleSimplified() {
    setSimplified(!simplified);
  }

  function toggleAutoScroll() {
    setAutoScroll(!autoScroll);
  }

  function toggleFavorite() {
    setFavorite(!favorite);
  }

  useEffect(() => {
    if (!autoScroll) {
      return;
    }

    const interval = setInterval(() => {
      scrollPosition.current += 1;

      scrollRef.current?.scrollTo({
        y: scrollPosition.current,
        animated: false,
      });
    }, 45);

    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.headerInfo}>
          <Text style={styles.title}>{songName}</Text>
          <Text style={styles.artist}>{artistName}</Text>
        </View>

        <Pressable
          style={[
            styles.favoriteButton,
            favorite && styles.favoriteButtonActive,
          ]}
          onPress={toggleFavorite}
        >
          <Text
            style={[
              styles.favoriteIcon,
              favorite && styles.favoriteIconActive,
            ]}
          >
            {favorite ? '♥' : '♡'}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          scrollPosition.current =
            event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
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

          <Pressable
            style={[
              styles.tool,
              autoScroll && styles.activeTool,
            ]}
            onPress={toggleAutoScroll}
          >
            <Text
              style={
                autoScroll
                  ? styles.activeToolText
                  : styles.toolText
              }
            >
              {autoScroll ? 'Parar' : 'Rolagem'}
            </Text>
          </Pressable>
        </View>

        {favorite && (
          <View style={styles.message}>
            <Text style={styles.messageText}>
              ♥ Música adicionada aos favoritos
            </Text>
          </View>
        )}

        {autoScroll && (
          <View style={styles.message}>
            <Text style={styles.messageText}>
              Rolagem automática ativada
            </Text>
          </View>
        )}

        {simplified && (
          <View style={styles.message}>
            <Text style={styles.messageText}>
              Modo simplificado ativado
            </Text>
          </View>
        )}

        <Text style={styles.section}>Intro</Text>

        <Text style={styles.chord}>
          {currentTone.firstChord}    {currentTone.secondChord}    {currentTone.firstChord}    {currentTone.secondChord}
        </Text>

        <Text style={styles.section}>Primeira parte</Text>

        <Text style={styles.chord}>
          {currentTone.firstChord}
        </Text>

        <Text style={styles.lyric}>
          Come as you are, as you were
        </Text>

        <Text style={styles.chord}>
          {currentTone.secondChord}
        </Text>

        <Text style={styles.lyric}>
          As I want you to be
        </Text>

        <Text style={styles.chord}>
          {currentTone.firstChord}
        </Text>

        <Text style={styles.lyric}>
          As a friend, as a friend
        </Text>

        <Text style={styles.chord}>
          {currentTone.secondChord}
        </Text>

        <Text style={styles.lyric}>
          As an old enemy
        </Text>

        <Text style={styles.section}>Refrão</Text>

        <Text style={styles.chord}>
          {currentTone.firstChord}
        </Text>

        <Text style={styles.lyric}>
          Memoria, memoria
        </Text>

        <Text style={styles.chord}>
          {currentTone.secondChord}
        </Text>

        <Text style={styles.lyric}>
          Memoria
        </Text>

        <View style={styles.demoSpace}>
          <Text style={styles.demoText}>
            Continue acompanhando a cifra...
          </Text>
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  backButton: {
    width: 42,
    height: 44,
    justifyContent: 'center',
  },

  backText: {
    color: colors.text,
    fontSize: 40,
    lineHeight: 40,
  },

  headerInfo: {
    flex: 1,
  },

  title: {
    color: colors.text,
    fontSize: 19,
    fontWeight: 'bold',
  },

  artist: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 3,
  },

  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  favoriteButtonActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },

  favoriteIcon: {
    color: colors.text,
    fontSize: 25,
  },

  favoriteIconActive: {
    color: colors.primary,
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
    backgroundColor: colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },

  activeTool: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  toolText: {
    color: colors.text,
    fontSize: 13,
  },

  activeToolText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },

  message: {
    backgroundColor: colors.primarySoft,
    borderRadius: 10,
    padding: 11,
    marginBottom: 8,
  },

  messageText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },

  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 14,
  },

  chord: {
    color: colors.primary,
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

  demoSpace: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },

  demoText: {
    color: colors.muted,
    fontSize: 13,
  },

  bottomSpace: {
    height: 100,
  },
});