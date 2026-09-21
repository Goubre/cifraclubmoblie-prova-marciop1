import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';

import BottomNav from '../components/BottomNav';
import { colors } from '../theme/colors';

export default function SearchScreen({ onNavigate }) {
  const [search, setSearch] = useState('');

  const results = [
    { id: 1, title: 'Nirvana', subtitle: 'Artista', type: 'artist' },
    { id: 2, title: 'Come As You Are', subtitle: 'Nirvana', type: 'song' },
    { id: 3, title: 'Smells Like Teen Spirit', subtitle: 'Nirvana', type: 'song' },
    { id: 4, title: 'Heart-Shaped Box', subtitle: 'Nirvana', type: 'song' },
    { id: 5, title: 'Polly', subtitle: 'Nirvana', type: 'song' },
  ];

  const filteredResults = search.trim()
    ? results.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  function handleResultPress(item) {
    if (item.type === 'artist') {
      onNavigate('Artista');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Busca</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="O que você quer tocar?"
          placeholderTextColor="#8e8e8e"
          value={search}
          onChangeText={setSearch}
        />

        {search.trim() === '' ? (
          <>
            <Text style={styles.sectionTitle}>Explore</Text>

            <View style={styles.categories}>
              <View style={styles.category}>
                <Text style={styles.categoryText}>Músicas</Text>
              </View>

              <View style={styles.category}>
                <Text style={styles.categoryText}>Artistas</Text>
              </View>

              <View style={styles.category}>
                <Text style={styles.categoryText}>Álbuns</Text>
              </View>
            </View>

            <Text style={styles.hint}>
              Pesquise por músicas, artistas ou bandas.
            </Text>
          </>
        ) : (
          <View style={styles.results}>
            <Text style={styles.sectionTitle}>Resultados</Text>

            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.resultItem}
                  onPress={() => handleResultPress(item)}
                >
                  <View style={styles.resultIcon}>
                    <Text style={styles.resultIconText}>
                      {item.type === 'artist' ? '♫' : '♪'}
                    </Text>
                  </View>

                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle}>
                      {item.title}
                    </Text>

                    <Text style={styles.resultSubtitle}>
                      {item.subtitle}
                    </Text>
                  </View>

                  <Text style={styles.more}>⋮</Text>
                </Pressable>
              ))
            ) : (
              <Text style={styles.noResults}>
                Nenhum resultado encontrado.
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      <BottomNav active="Busca" onNavigate={onNavigate} />
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
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  searchInput: {
    backgroundColor: '#242424',
    color: '#ffffff',
    fontSize: 17,
    paddingHorizontal: 18,
    height: 54,
    borderRadius: 14,
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 16,
  },

  categories: {
    flexDirection: 'row',
    gap: 10,
  },

  category: {
    backgroundColor: '#242424',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },

  categoryText: {
    color: '#ffffff',
    fontSize: 15,
  },

  hint: {
    color: '#8e8e8e',
    fontSize: 15,
    marginTop: 28,
  },

  results: {
    marginTop: 4,
  },

  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  resultIcon: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#2a211b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  resultIconText: {
    color: '#ff6b00',
    fontSize: 23,
    fontWeight: 'bold',
  },

  resultInfo: {
    flex: 1,
  },

  resultTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },

  resultSubtitle: {
    color: '#8e8e8e',
    fontSize: 14,
    marginTop: 3,
  },

  more: {
    color: '#ffffff',
    fontSize: 26,
    paddingHorizontal: 8,
  },

  noResults: {
    color: '#8e8e8e',
    fontSize: 15,
    marginTop: 5,
  },
});