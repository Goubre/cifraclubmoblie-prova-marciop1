import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';

import BottomNav from '../components/BottomNav';
import { colors } from '../theme/colors';

export default function AcademyScreen({ onNavigate }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Academy</Text>

        <Text style={styles.subtitle}>
          Aprenda a tocar suas músicas favoritas
        </Text>

        <View style={styles.featuredCard}>
          <Text style={styles.cardLabel}>DESTAQUE</Text>

          <Text style={styles.cardTitle}>
            Aprenda do seu jeito
          </Text>

          <Text style={styles.cardDescription}>
            Aulas e conteúdos para você evoluir no seu instrumento.
          </Text>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Começar agora</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Explore as aulas</Text>

        <View style={styles.lessonCard}>
          <View style={styles.lessonIcon}>
            <Text style={styles.iconText}>♪</Text>
          </View>

          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Violão</Text>
            <Text style={styles.lessonDescription}>
              Aulas para começar a tocar
            </Text>
          </View>
        </View>

        <View style={styles.lessonCard}>
          <View style={styles.lessonIcon}>
            <Text style={styles.iconText}>♫</Text>
          </View>

          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Guitarra</Text>
            <Text style={styles.lessonDescription}>
              Técnicas, acordes e exercícios
            </Text>
          </View>
        </View>

        <View style={styles.lessonCard}>
          <View style={styles.lessonIcon}>
            <Text style={styles.iconText}>♬</Text>
          </View>

          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Teoria musical</Text>
            <Text style={styles.lessonDescription}>
              Entenda melhor a música
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomNav active="Academy" onNavigate={onNavigate} />
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
  },

  subtitle: {
    color: '#8e8e8e',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 28,
  },

  featuredCard: {
    backgroundColor: '#2b211b',
    borderRadius: 20,
    padding: 24,
  },

  cardLabel: {
    color: '#ff6600',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  cardTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
  },

  cardDescription: {
    color: '#b5b5b5',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },

  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff6600',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 22,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 16,
  },

  lessonCard: {
    backgroundColor: '#202020',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  lessonIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#30231c',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconText: {
    color: '#ff6600',
    fontSize: 24,
  },

  lessonInfo: {
    marginLeft: 16,
    flex: 1,
  },

  lessonTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  lessonDescription: {
    color: '#8e8e8e',
    fontSize: 14,
    marginTop: 4,
  },
});