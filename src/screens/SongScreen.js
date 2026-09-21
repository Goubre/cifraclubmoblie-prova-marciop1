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

/*
  Os trechos "excerpt" são trechos curtos das músicas.
  As demais linhas são conteúdo adaptado/original criado
  somente para a demonstração acadêmica do aplicativo.
*/

const songData = {
  'Come As You Are': {
    tone: 'Em',
    chords: ['Em', 'D', 'A', 'C'],
    intro: 'Em   D   Em   D',
    verse: 'Em   D   Em   D',
    chorus: 'A   C   Em',
    bridge: 'Em   D   A   C',
    excerpt: 'Come as you are, as you were',
    adapted: [
      'Walking slowly through another day',
      'Memories remain along the way',
      'Every sound is calling me again',
      'Waiting for the night to reach the end',
    ],
  },

  'Smells Like Teen Spirit': {
    tone: 'Fm',
    chords: ['F5', 'Bb5', 'Ab5', 'Db5'],
    intro: 'F5   Bb5   Ab5   Db5',
    verse: 'F5   Bb5   Ab5   Db5',
    chorus: 'F5   Bb5   Ab5   Db5',
    bridge: 'Ab5   Db5   F5   Bb5',
    excerpt: "With the lights out, it's less dangerous",
    adapted: [
      'Noise is rising through the crowded room',
      'Every voice is breaking through the gloom',
      'Turn it louder, let the rhythm stay',
      'Nothing here will ever fade away',
    ],
  },

  'Heart-Shaped Box': {
    tone: 'C#',
    chords: ['C#5', 'A5', 'F#5'],
    intro: 'C#5   A5   F#5',
    verse: 'C#5   A5   F#5',
    chorus: 'C#5   A5   F#5',
    bridge: 'A5   F#5   C#5',
    excerpt: "Hey! Wait! I've got a new complaint",
    adapted: [
      'Something waits behind another door',
      'Falling back to where we were before',
      'Heavy thoughts are moving through my mind',
      'Leaving all the quiet days behind',
    ],
  },

  Polly: {
    tone: 'Em',
    chords: ['Em', 'G', 'D', 'C'],
    intro: 'Em   G   D   C',
    verse: 'Em   G   D   C',
    chorus: 'D   C   G   Bb',
    bridge: 'Em   D   C   G',
    excerpt: 'Polly wants a cracker',
    adapted: [
      'Quiet voices echo through the hall',
      'Another shadow moves across the wall',
      'Time is passing slowly through the day',
      'Nothing seems to make the silence fade',
    ],
  },

  'About a Girl': {
    tone: 'Em',
    chords: ['Em', 'G', 'C#', 'G#'],
    intro: 'Em   G',
    verse: 'Em   G',
    chorus: 'C#   G#   F#',
    bridge: 'Em   G   Em   G',
    excerpt: 'I need an easy friend',
    adapted: [
      'Maybe we can find another way',
      'Maybe things will change another day',
      'All the words are waiting to be said',
      'Every little moment stays instead',
    ],
  },

  'Enter Sandman': {
    tone: 'Em',
    chords: ['Em', 'E5', 'G5', 'F#5'],
    intro: 'Em   E5   G5   F#5',
    verse: 'E5   G5   F#5   E5',
    chorus: 'E5   G5   F#5',
    bridge: 'E5   F#5   G5   E5',
    excerpt: 'Exit light, enter night',
    adapted: [
      'Close the door and leave the light behind',
      'Heavy footsteps running through your mind',
      'Night is falling over everything',
      'Listen closely to the sound it brings',
    ],
  },

  'Nothing Else Matters': {
    tone: 'Em',
    chords: ['Em', 'D', 'C', 'G', 'B7'],
    intro: 'Em   D   C',
    verse: 'Em   D   C   G',
    chorus: 'C   A   D   B7',
    bridge: 'Em   G   C   D',
    excerpt: 'Nothing else matters',
    adapted: [
      'Miles away but still I hear the sound',
      'Every road eventually comes around',
      'Keep the moment somewhere in your mind',
      'Leave the empty distances behind',
    ],
  },

  'Master of Puppets': {
    tone: 'Em',
    chords: ['E5', 'D5', 'C5', 'F#5'],
    intro: 'E5   D5   C5',
    verse: 'E5   F#5   G5   F#5',
    chorus: 'E5   D5   C5',
    bridge: 'F#5   E5   D5   C5',
    excerpt: "Master of puppets, I'm pulling your strings",
    adapted: [
      'Running faster while the pressure grows',
      'Following a road that no one knows',
      'Every movement answers to the sound',
      'Heavy rhythm shaking up the ground',
    ],
  },

  'The Unforgiven': {
    tone: 'Am',
    chords: ['Am', 'C', 'G', 'Em'],
    intro: 'Am   C   G   Em',
    verse: 'Am   C   G   Em',
    chorus: 'C   G   Em   Am',
    bridge: 'Am   G   C   Em',
    excerpt: "What I've felt, what I've known",
    adapted: [
      'All the years are written on the wall',
      'Some will rise and some will always fall',
      'Looking back at everything we knew',
      'Trying now to find a different view',
    ],
  },

  One: {
    tone: 'Bm',
    chords: ['Bm', 'G', 'D', 'A'],
    intro: 'Bm   G   D   A',
    verse: 'Bm   G   D   A',
    chorus: 'G   D   A   Bm',
    bridge: 'B5   A5   G5   F#5',
    excerpt: 'Hold my breath as I wish for death',
    adapted: [
      'Silence fills the space around my head',
      'Every thought becomes another thread',
      'Searching for a light beyond the night',
      'Waiting for the morning to arrive',
    ],
  },

  "Sweet Child O' Mine": {
    tone: 'D',
    chords: ['D', 'C', 'G', 'A'],
    intro: 'D   C   G   D',
    verse: 'D   C   G   D',
    chorus: 'A   C   D',
    bridge: 'Em   C   B7   Am',
    excerpt: "She's got a smile that it seems to me",
    adapted: [
      'Summer days are coming back again',
      'Old familiar places never end',
      'Every memory shines across the sky',
      'Like a little moment passing by',
    ],
  },

  'November Rain': {
    tone: 'C',
    chords: ['C', 'F', 'G', 'Am'],
    intro: 'C   F   G',
    verse: 'C   F   G   Am',
    chorus: 'F   G   C',
    bridge: 'Am   G   F   C',
    excerpt: 'Nothing lasts forever',
    adapted: [
      'Clouds are moving slowly through the sky',
      'Another season quietly passes by',
      'Hold the moment while it still remains',
      'Listen to the sound of distant rain',
    ],
  },

  Patience: {
    tone: 'G',
    chords: ['G', 'C', 'D', 'Em'],
    intro: 'G   C   D',
    verse: 'G   C   D   Em',
    chorus: 'C   G   D',
    bridge: 'Em   C   G   D',
    excerpt: 'All we need is just a little patience',
    adapted: [
      'Take your time and let the moment stay',
      'There is no need to rush another day',
      'Every road can lead us somewhere new',
      'Maybe time will show us what to do',
    ],
  },

  "Knockin' on Heaven's Door": {
    tone: 'G',
    chords: ['G', 'D', 'Am', 'C'],
    intro: 'G   D   Am',
    verse: 'G   D   C',
    chorus: 'G   D   Am   C',
    bridge: 'G   D   C   Am',
    excerpt: "Knock, knock, knockin' on heaven's door",
    adapted: [
      'Evening falls across the open road',
      'Every mile becomes a lighter load',
      'Hear the distant rhythm moving slow',
      'Following the only way we know',
    ],
  },

  'Welcome to the Jungle': {
    tone: 'E',
    chords: ['E5', 'D5', 'B5', 'A5'],
    intro: 'E5   D5   B5',
    verse: 'E5   A5   D5',
    chorus: 'E5   D5   A5',
    bridge: 'B5   A5   E5   D5',
    excerpt: 'Welcome to the jungle',
    adapted: [
      'City lights are burning through the night',
      'Everybody running out of sight',
      'Hear the noise exploding down the street',
      'Feel the heavy rhythm underneath',
    ],
  },

  Californication: {
    tone: 'Am',
    chords: ['Am', 'F', 'C', 'G'],
    intro: 'Am   F',
    verse: 'Am   F   C   G',
    chorus: 'C   G   F   Am',
    bridge: 'F   Am   C   G',
    excerpt: 'Dream of Californication',
    adapted: [
      'Golden lights are shining on the road',
      'Stories everywhere are being told',
      'Every dream is waiting for a name',
      'Everybody searching for the same',
    ],
  },

  Otherside: {
    tone: 'Am',
    chords: ['Am', 'F', 'C', 'G'],
    intro: 'Am   F   C   G',
    verse: 'Am   F   C   G',
    chorus: 'F   C   G   Am',
    bridge: 'Am   G   F   C',
    excerpt: 'How long, how long will I slide?',
    adapted: [
      'Another road is calling out my name',
      'Every day begins and ends the same',
      'Looking for a place I used to know',
      'Wondering exactly where to go',
    ],
  },

  'Under the Bridge': {
    tone: 'E',
    chords: ['E', 'B', 'C#m', 'A'],
    intro: 'E   B   C#m   A',
    verse: 'E   B   C#m   A',
    chorus: 'A   E   B',
    bridge: 'C#m   A   E   B',
    excerpt: "Sometimes I feel like I don't have a partner",
    adapted: [
      'Walking through the city on my own',
      'Every street reminds me of a home',
      'Lights are fading underneath the sky',
      'Watching all the passing cars go by',
    ],
  },

  'Snow (Hey Oh)': {
    tone: 'G#m',
    chords: ['G#m', 'E', 'B', 'F#'],
    intro: 'G#m   E   B   F#',
    verse: 'G#m   E   B   F#',
    chorus: 'E   B   F#   G#m',
    bridge: 'G#m   F#   E   B',
    excerpt: 'Hey oh, listen what I say, oh',
    adapted: [
      'Cold air moving underneath the light',
      'Another road is disappearing from sight',
      'Keep on moving while the rhythm flows',
      'Follow every place the music goes',
    ],
  },

  "Can't Stop": {
    tone: 'Em',
    chords: ['Em', 'D', 'B', 'C'],
    intro: 'Em   D   B   C',
    verse: 'Em   D   B   C',
    chorus: 'G   D   Em   C',
    bridge: 'Em   C   G   D',
    excerpt: "Can't stop, addicted to the shindig",
    adapted: [
      'Keep it moving while the beat is fast',
      'Never looking backward at the past',
      'Every second brings another sound',
      'Let the rhythm move us all around',
    ],
  },

  Everlong: {
    tone: 'D',
    chords: ['D', 'Bm', 'G'],
    intro: 'D   Bm   G',
    verse: 'D   Bm   G',
    chorus: 'D   G   Bm',
    bridge: 'Bm   G   D',
    excerpt: 'If everything could ever feel this real forever',
    adapted: [
      'Stay here while the evening turns to night',
      'Everything around us feels alright',
      'Every second disappears too fast',
      'Maybe we can make the moment last',
    ],
  },

  'The Pretender': {
    tone: 'Am',
    chords: ['Am', 'F', 'C', 'G'],
    intro: 'Am   F   C   G',
    verse: 'Am   F   C   G',
    chorus: 'Am   C   G   F',
    bridge: 'F   C   Am   G',
    excerpt: "What if I say I'm not like the others?",
    adapted: [
      'Every voice is trying to be heard',
      'Every silence waiting for a word',
      'Stand your ground and let the moment show',
      'There are things that only you can know',
    ],
  },

  'Learn to Fly': {
    tone: 'B',
    chords: ['B', 'F#m', 'E'],
    intro: 'B   F#m   E',
    verse: 'B   F#m   E',
    chorus: 'B   E   F#m',
    bridge: 'E   B   F#m',
    excerpt: "I'm looking to the sky to save me",
    adapted: [
      'Looking for a road beyond the sky',
      'Waiting for another chance to try',
      'Every step can take me somewhere new',
      'Maybe there is something I can do',
    ],
  },

  'Best of You': {
    tone: 'C#m',
    chords: ['C#m', 'A', 'E', 'B'],
    intro: 'C#m   A   E   B',
    verse: 'C#m   A   E   B',
    chorus: 'A   E   B   C#m',
    bridge: 'C#m   B   A   E',
    excerpt: 'Is someone getting the best of you?',
    adapted: [
      'Every moment pushes through the noise',
      'Trying hard to recognize your voice',
      'Nothing here can stay the same forever',
      'Every broken piece can come together',
    ],
  },

  'My Hero': {
    tone: 'E',
    chords: ['E', 'C#m', 'A'],
    intro: 'E   C#m   A',
    verse: 'E   C#m   A',
    chorus: 'A   E   C#m',
    bridge: 'E   A   C#m',
    excerpt: 'There goes my hero',
    adapted: [
      'Another ordinary day begins',
      'Every little battle starts within',
      'Keep on moving even when it is slow',
      'There are many places left to go',
    ],
  },
};

const fallbackSong = {
  tone: 'C',
  chords: ['C', 'G', 'Am', 'F'],
  intro: 'C   G   Am   F',
  verse: 'C   G   Am   F',
  chorus: 'F   G   C',
  bridge: 'Am   F   C   G',
  excerpt: '',
  adapted: [
    'Another day begins beneath the sky',
    'Listen as the hours are passing by',
    'Every road can take us somewhere new',
    'Follow where the music leads to you',
  ],
};

const toneNames = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

function transposeChord(chord, steps) {
  const match = chord.match(/^([A-G](?:#)?)(.*)$/);

  if (!match) {
    return chord;
  }

  const root = match[1];
  const suffix = match[2];

  const index = toneNames.indexOf(root);

  if (index === -1) {
    return chord;
  }

  const newIndex =
    (index + steps + toneNames.length) %
    toneNames.length;

  return `${toneNames[newIndex]}${suffix}`;
}

function transposeProgression(progression, steps) {
  return progression
    .split(/\s+/)
    .map((item) => transposeChord(item, steps))
    .join('   ');
}

function createSections(song) {
  return [
    {
      title: 'Intro',
      progression: song.intro,
      lines: [],
    },

    {
      title: 'Verso 1',
      progression: song.verse,
      lines: [
        song.excerpt,
        song.adapted[0],
        song.adapted[1],
      ].filter(Boolean),
    },

    {
      title: 'Pré-Refrão',
      progression: song.bridge,
      lines: [
        song.adapted[2],
        song.adapted[3],
      ],
    },

    {
      title: 'Refrão',
      progression: song.chorus,
      lines: [
        song.adapted[0],
        song.adapted[2],
      ],
    },

    {
      title: 'Instrumental',
      progression: song.intro,
      lines: [],
    },

    {
      title: 'Verso 2',
      progression: song.verse,
      lines: [
        song.adapted[1],
        song.adapted[2],
        song.adapted[3],
      ],
    },

    {
      title: 'Ponte',
      progression: song.bridge,
      lines: [
        song.adapted[0],
        song.adapted[3],
      ],
    },

    {
      title: 'Solo / Instrumental',
      progression: `${song.verse}   ${song.chorus}`,
      lines: [],
    },

    {
      title: 'Refrão Final',
      progression: song.chorus,
      lines: [
        song.excerpt,
        song.adapted[2],
      ].filter(Boolean),
    },

    {
      title: 'Final',
      progression: song.intro,
      lines: [],
    },
  ];
}

export default function SongScreen({
  onBack,
  songName = 'Come As You Are',
  artistName = 'Nirvana',
}) {
  const song = songData[songName] || fallbackSong;

  const [transpose, setTranspose] = useState(0);
  const [simplified, setSimplified] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const scrollRef = useRef(null);
  const scrollPosition = useRef(0);

  const sections = createSections(song);

  useEffect(() => {
    setTranspose(0);
    setSimplified(false);
    setAutoScroll(false);
    setFavorite(false);

    scrollPosition.current = 0;

    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  }, [songName]);

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

  const currentTone = transposeChord(
    song.tone,
    transpose
  );

  function increaseTone() {
    setTranspose((current) => current + 1);
  }

  function decreaseTone() {
    setTranspose((current) => current - 1);
  }

  function getProgression(progression) {
    const transposed = transposeProgression(
      progression,
      transpose
    );

    if (!simplified) {
      return transposed;
    }

    const chords = transposed.split(/\s+/);

    return chords
      .filter((_, index) => index % 2 === 0)
      .join('   ');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={onBack}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.headerInfo}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {songName}
          </Text>

          <Text style={styles.artist}>
            {artistName}
          </Text>
        </View>

        <Pressable
          style={[
            styles.favoriteButton,
            favorite && styles.favoriteButtonActive,
          ]}
          onPress={() => setFavorite(!favorite)}
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
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          scrollPosition.current =
            event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        <View style={styles.songHeader}>
          <Text style={styles.songTitle}>
            {songName}
          </Text>

          <Text style={styles.songArtist}>
            {artistName}
          </Text>

          <View style={styles.songInfoRow}>
            <View style={styles.infoBadge}>
              <Text style={styles.infoBadgeText}>
                CIFRA
              </Text>
            </View>

            <Text style={styles.songInfoText}>
              Tom: {currentTone}
            </Text>
          </View>
        </View>

        <View style={styles.controls}>
          <View style={styles.toneControl}>
            <Text style={styles.controlLabel}>
              Tom
            </Text>

            <View style={styles.toneButtons}>
              <Pressable
                style={styles.toneButton}
                onPress={decreaseTone}
              >
                <Text style={styles.toneButtonText}>
                  −
                </Text>
              </Pressable>

              <View style={styles.toneValue}>
                <Text style={styles.toneValueText}>
                  {currentTone}
                </Text>
              </View>

              <Pressable
                style={styles.toneButton}
                onPress={increaseTone}
              >
                <Text style={styles.toneButtonText}>
                  +
                </Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            style={[
              styles.controlButton,
              simplified && styles.controlButtonActive,
            ]}
            onPress={() => setSimplified(!simplified)}
          >
            <Text
              style={[
                styles.controlButtonText,
                simplified &&
                  styles.controlButtonTextActive,
              ]}
            >
              Simplificar
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.controlButton,
              autoScroll && styles.controlButtonActive,
            ]}
            onPress={() => setAutoScroll(!autoScroll)}
          >
            <Text
              style={[
                styles.controlButtonText,
                autoScroll &&
                  styles.controlButtonTextActive,
              ]}
            >
              {autoScroll ? 'Parar rolagem' : 'Rolagem automática'}
            </Text>
          </Pressable>
        </View>

        {favorite && (
          <View style={styles.message}>
            <Text style={styles.messageText}>
              ♥ Adicionada aos favoritos
            </Text>
          </View>
        )}

        <View style={styles.chordsCard}>
          <Text style={styles.chordsTitle}>
            Acordes usados
          </Text>

          <View style={styles.chordBadges}>
            {song.chords.map((chord) => (
              <View
                key={chord}
                style={styles.chordBadge}
              >
                <Text style={styles.chordBadgeText}>
                  {transposeChord(chord, transpose)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.cifra}>
          {sections.map((section, index) => (
            <View
              key={`${section.title}-${index}`}
              style={styles.cifraSection}
            >
              <Text style={styles.section}>
                {section.title}
              </Text>

              <Text style={styles.chord}>
                {getProgression(section.progression)}
              </Text>

              {section.lines.length > 0 && (
                <View style={styles.lyrics}>
                  {section.lines.map((line, lineIndex) => (
                    <View
                      key={`${line}-${lineIndex}`}
                      style={styles.lyricBlock}
                    >
                      <Text style={styles.smallChord}>
                        {getProgression(section.progression)}
                      </Text>

                      <Text style={styles.lyricLine}>
                        {line}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {section.lines.length === 0 && (
                <View style={styles.instrumental}>
                  <Text style={styles.instrumentalText}>
                    ♪ Instrumental ♪
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.academicNote}>
          <Text style={styles.academicNoteTitle}>
            Conteúdo adaptado
          </Text>

          <Text style={styles.academicNoteText}>
            Versão criada para demonstração acadêmica das
            funcionalidades de cifras, mudança de tom e
            rolagem do aplicativo.
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
    minHeight: 67,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
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
    fontSize: 38,
    lineHeight: 38,
  },

  headerInfo: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },

  artist: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },

  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 23,
  },

  favoriteIconActive: {
    color: colors.primary,
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 23,
  },

  songHeader: {
    marginBottom: 22,
  },

  songTitle: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '800',
  },

  songArtist: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 5,
  },

  songInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
  },

  infoBadge: {
    backgroundColor: colors.primarySoft,
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  infoBadgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
  },

  songInfoText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 10,
  },

  controls: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 16,
  },

  toneControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },

  controlLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },

  toneButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  toneButton: {
    width: 38,
    height: 35,
    backgroundColor: colors.surfaceLight,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  toneButtonText: {
    color: colors.text,
    fontSize: 21,
  },

  toneValue: {
    minWidth: 55,
    alignItems: 'center',
  },

  toneValueText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },

  controlButton: {
    minHeight: 42,
    borderRadius: 10,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },

  controlButtonActive: {
    backgroundColor: colors.primary,
  },

  controlButtonText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },

  controlButtonTextActive: {
    color: colors.white,
  },

  message: {
    backgroundColor: colors.primarySoft,
    borderRadius: 11,
    padding: 11,
    marginBottom: 15,
  },

  messageText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },

  chordsCard: {
    marginTop: 5,
    marginBottom: 10,
  },

  chordsTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 11,
  },

  chordBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chordBadge: {
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: '#4b2c18',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 9,
    marginRight: 8,
    marginBottom: 8,
  },

  chordBadgeText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'monospace',
  },

  cifra: {
    marginTop: 10,
  },

  cifraSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },

  chord: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'monospace',
    lineHeight: 26,
    marginBottom: 12,
  },

  lyrics: {
    marginTop: 3,
  },

  lyricBlock: {
    marginBottom: 16,
  },

  smallChord: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'monospace',
    marginBottom: 4,
  },

  lyricLine: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 25,
  },

  instrumental: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginTop: 3,
  },

  instrumentalText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontStyle: 'italic',
  },

  academicNote: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
    marginTop: 25,
  },

  academicNoteTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },

  academicNoteText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },

  bottomSpace: {
    height: 60,
  },
});