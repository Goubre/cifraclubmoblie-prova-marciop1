import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import { colors } from '../theme/colors';
import BottomNav from '../components/BottomNav';

const listas = [
  { icon: '▣', nome: 'Minhas versões', detalhe: '0 música', pro: true },
  { icon: '↶', nome: 'Recentes', detalhe: '1 música' },
  { icon: '♡', nome: 'Favoritas', detalhe: '0 música' },
  { icon: '♧', nome: 'Consigo tocar', detalhe: '0 música' },
  { icon: '◎', nome: 'Quero aprender', detalhe: '0 música' },
];

export default function ListsScreen({ onNavigate }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Listas</Text>
          <Text style={styles.plus}>＋</Text>
        </View>

        <View style={styles.filters}>
          <View style={styles.filterActive}>
            <Text style={styles.filterActiveText}>Tudo</Text>
          </View>

          <View style={styles.filter}>
            <Text style={styles.filterText}>Criados por você</Text>
          </View>

          <View style={styles.filter}>
            <Text style={styles.filterText}>Salvas</Text>
          </View>
        </View>

        {listas.map((item) => (
          <Pressable key={item.nome} style={styles.card}>
            <View style={styles.iconBox}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardSubtitle}>{item.detalhe}</Text>
            </View>

            {item.pro ? (
              <View style={styles.proBadge}>
                <Text style={styles.proText}>PRO</Text>
              </View>
            ) : (
              <Text style={styles.more}>⋮</Text>
            )}
          </Pressable>
        ))}

        <Pressable style={styles.card}>
          <View style={[styles.iconBox, styles.newIcon]}>
            <Text style={styles.newPlus}>＋</Text>
          </View>

          <Text style={styles.newListText}>Nova lista</Text>
        </Pressable>

        <View style={styles.offline}>
          <Text style={styles.offlineTitle}>1 música, 3 listas</Text>
          <Text style={styles.offlineText}>
            ● Disponível offline • Baixado hoje
          </Text>
        </View>
      </ScrollView>

      <BottomNav active="Listas" onNavigate={onNavigate} />
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
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  title: {
    color: colors.text,
    fontSize: 29,
    fontWeight: 'bold',
  },

  plus: {
    color: colors.text,
    fontSize: 38,
    fontWeight: '300',
  },

  filters: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  filter: {
    backgroundColor: '#222222',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 11,
    marginRight: 8,
  },

  filterActive: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 11,
    marginRight: 8,
  },

  filterText: {
    color: '#e5e5e5',
    fontWeight: '600',
  },

  filterActiveText: {
    color: '#171717',
    fontWeight: 'bold',
  },

  card: {
    minHeight: 92,
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 18,
    marginBottom: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 13,
    backgroundColor: '#30251e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  icon: {
    color: colors.primary,
    fontSize: 25,
  },

  cardInfo: {
    flex: 1,
  },

  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '500',
  },

  cardSubtitle: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 3,
  },

  more: {
    color: '#dddddd',
    fontSize: 28,
  },

  proBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
  },

  proText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  newIcon: {
    backgroundColor: '#242424',
  },

  newPlus: {
    color: '#eeeeee',
    fontSize: 31,
  },

  newListText: {
    color: colors.text,
    fontSize: 18,
  },

  offline: {
    backgroundColor: '#242424',
    borderRadius: 18,
    padding: 20,
    marginTop: 8,
  },

  offlineTitle: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },

  offlineText: {
    color: colors.muted,
    marginTop: 7,
  },
});