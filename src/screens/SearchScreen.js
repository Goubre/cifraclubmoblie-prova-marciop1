import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import BottomNav from '../components/BottomNav';
import { colors } from '../theme/colors';

export default function SearchScreen({ onNavigate }) {
  const [search, setSearch] = useState('');

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
});