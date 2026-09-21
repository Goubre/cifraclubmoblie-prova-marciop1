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

export default function MoreScreen({ onNavigate }) {
  const options = [
    { icon: '👤', title: 'Entrar na sua conta' },
    { icon: '⚙', title: 'Configurações' },
    { icon: '🎵', title: 'Afinador' },
    { icon: '↓', title: 'Conteúdo offline' },
    { icon: '?', title: 'Ajuda e suporte' },
    { icon: 'ⓘ', title: 'Sobre o Cifra Club' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Mais</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>♪</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileTitle}>Cifra Club</Text>
            <Text style={styles.profileSubtitle}>
              Entre para salvar suas músicas e listas
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recursos</Text>

        <View style={styles.optionsContainer}>
          {options.map((item, index) => (
            <Pressable
              key={item.title}
              style={[
                styles.option,
                index !== options.length - 1 && styles.optionBorder,
              ]}
            >
              <View style={styles.optionIcon}>
                <Text style={styles.iconText}>{item.icon}</Text>
              </View>

              <Text style={styles.optionText}>{item.title}</Text>

              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.version}>Cifra Club • Versão demonstrativa</Text>
      </ScrollView>

      <BottomNav active="Mais" onNavigate={onNavigate} />
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
    marginBottom: 24,
  },

  profileCard: {
    backgroundColor: '#242424',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3a281f',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#ff6600',
    fontSize: 26,
    fontWeight: 'bold',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },

  profileTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  profileSubtitle: {
    color: '#8e8e8e',
    fontSize: 14,
    marginTop: 5,
    lineHeight: 19,
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 14,
  },

  optionsContainer: {
    backgroundColor: '#202020',
    borderRadius: 16,
    overflow: 'hidden',
  },

  option: {
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#303030',
  },

  optionIcon: {
    width: 34,
    alignItems: 'center',
  },

  iconText: {
    color: '#ff6600',
    fontSize: 19,
  },

  optionText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 12,
  },

  arrow: {
    color: '#8e8e8e',
    fontSize: 28,
  },

  version: {
    color: '#666666',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 28,
    marginBottom: 30,
  },
});