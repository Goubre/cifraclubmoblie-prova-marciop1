import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';

import BottomNav from '../components/BottomNav';
import { colors } from '../theme/colors';

export default function AcademyScreen({ onNavigate }) {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const lessons = [
    {
      icon: '♪',
      title: 'Violão',
      description: 'Aulas para começar a tocar',
    },
    {
      icon: '♫',
      title: 'Guitarra',
      description: 'Técnicas, acordes e exercícios',
    },
    {
      icon: '♬',
      title: 'Teoria musical',
      description: 'Entenda melhor a música',
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
          <Text style={styles.title}>Academy</Text>

          <Text style={styles.subtitle}>
            Aprenda a tocar suas músicas favoritas
          </Text>
        </View>

        <View style={styles.featuredCard}>
          <View style={styles.featuredTop}>
            <View style={styles.labelBox}>
              <Text style={styles.cardLabel}>DESTAQUE</Text>
            </View>

            <Text style={styles.featuredIcon}>♫</Text>
          </View>

          <Text style={styles.cardTitle}>
            Aprenda do seu jeito
          </Text>

          <Text style={styles.cardDescription}>
            Aulas e conteúdos para você evoluir no seu instrumento.
          </Text>

          <Pressable
            style={styles.button}
            onPress={() => setSelectedLesson('Primeiros passos')}
          >
            <Text style={styles.buttonText}>Começar agora</Text>
          </Pressable>
        </View>

        {selectedLesson && (
          <View style={styles.selectedMessage}>
            <Text style={styles.selectedMessageLabel}>
              Aula selecionada
            </Text>

            <Text style={styles.selectedMessageTitle}>
              {selectedLesson}
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>
          Explore as aulas
        </Text>

        {lessons.map((lesson) => (
          <Pressable
            key={lesson.title}
            style={[
              styles.lessonCard,
              selectedLesson === lesson.title &&
                styles.lessonCardSelected,
            ]}
            onPress={() => setSelectedLesson(lesson.title)}
          >
            <View style={styles.lessonIcon}>
              <Text style={styles.iconText}>
                {lesson.icon}
              </Text>
            </View>

            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>
                {lesson.title}
              </Text>

              <Text style={styles.lessonDescription}>
                {lesson.description}
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}

        <View style={styles.progressCard}>
          <View>
            <Text style={styles.progressTitle}>
              Continue evoluindo
            </Text>

            <Text style={styles.progressText}>
              Escolha uma aula para começar.
            </Text>
          </View>

          <Text style={styles.progressIcon}>♪</Text>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <BottomNav
        active="Academy"
        onNavigate={onNavigate}
      />
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
    marginBottom: 25,
  },

  title: {
    color: colors.text,
    fontSize: 29,
    fontWeight: '800',
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
  },

  featuredCard: {
    backgroundColor: '#201812',
    borderRadius: 22,
    padding: 21,
    borderWidth: 1,
    borderColor: '#34271e',
  },

  featuredTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },

  labelBox: {
    backgroundColor: colors.primarySoft,
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  cardLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  featuredIcon: {
    color: '#4b3729',
    fontSize: 42,
  },

  cardTitle: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '800',
  },

  cardDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 280,
  },

  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.text,
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 11,
    marginTop: 20,
  },

  buttonText: {
    color: colors.textDark,
    fontSize: 13,
    fontWeight: '700',
  },

  selectedMessage: {
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    padding: 14,
    marginTop: 15,
  },

  selectedMessageLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },

  selectedMessageTitle: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 3,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 14,
  },

  lessonCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  lessonCardSelected: {
    borderColor: colors.primary,
  },

  lessonIcon: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconText: {
    color: colors.primary,
    fontSize: 22,
  },

  lessonInfo: {
    marginLeft: 14,
    flex: 1,
  },

  lessonTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },

  lessonDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },

  arrow: {
    color: colors.muted,
    fontSize: 27,
  },

  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 17,
    marginTop: 13,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  progressTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },

  progressText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },

  progressIcon: {
    color: colors.primary,
    fontSize: 26,
  },

  bottomSpace: {
    height: 30,
  },
});