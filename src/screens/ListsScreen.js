import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';

import { colors } from '../theme/colors';
import BottomNav from '../components/BottomNav';

const listasIniciais = [
  { icon: '▣', nome: 'Minhas versões', detalhe: '0 música', pro: true },
  { icon: '↶', nome: 'Recentes', detalhe: '1 música' },
  { icon: '♡', nome: 'Favoritas', detalhe: '0 música' },
  { icon: '♧', nome: 'Consigo tocar', detalhe: '0 música' },
  { icon: '◎', nome: 'Quero aprender', detalhe: '0 música' },
];

export default function ListsScreen({ onNavigate }) {
  const [listas, setListas] = useState(listasIniciais);
  const [creating, setCreating] = useState(false);
  const [listName, setListName] = useState('');

  function openCreateList() {
    setCreating(true);
  }

  function cancelCreateList() {
    setCreating(false);
    setListName('');
  }

  function createList() {
    const name = listName.trim();

    if (!name) {
      return;
    }

    const newList = {
      icon: '♪',
      nome: name,
      detalhe: '0 músicas',
      custom: true,
    };

    setListas([...listas, newList]);
    setListName('');
    setCreating(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Listas</Text>
            <Text style={styles.subtitle}>
              Organize suas músicas
            </Text>
          </View>

          <Pressable
            style={styles.headerPlus}
            onPress={openCreateList}
          >
            <Text style={styles.plus}>＋</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filters}
        >
          <View style={styles.filterActive}>
            <Text style={styles.filterActiveText}>Tudo</Text>
          </View>

          <View style={styles.filter}>
            <Text style={styles.filterText}>
              Criados por você
            </Text>
          </View>

          <View style={styles.filter}>
            <Text style={styles.filterText}>Salvas</Text>
          </View>
        </ScrollView>

        {creating && (
          <View style={styles.createCard}>
            <Text style={styles.createTitle}>
              Criar nova lista
            </Text>

            <Text style={styles.createDescription}>
              Dê um nome para organizar suas músicas.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome da lista"
              placeholderTextColor={colors.muted}
              value={listName}
              onChangeText={setListName}
              autoFocus
              maxLength={30}
            />

            <View style={styles.createActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={cancelCreateList}
              >
                <Text style={styles.cancelText}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.createButton,
                  !listName.trim() &&
                    styles.createButtonDisabled,
                ]}
                onPress={createList}
              >
                <Text style={styles.createButtonText}>
                  Criar lista
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>
          Suas listas
        </Text>

        {listas.map((item, index) => (
          <Pressable
            key={`${item.nome}-${index}`}
            style={styles.card}
          >
            <View
              style={[
                styles.iconBox,
                item.custom && styles.customIcon,
              ]}
            >
              <Text style={styles.icon}>{item.icon}</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>
                {item.nome}
              </Text>

              <Text style={styles.cardSubtitle}>
                {item.detalhe}
              </Text>

              {item.custom && (
                <Text style={styles.customLabel}>
                  Criada por você
                </Text>
              )}
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

        <Pressable
          style={styles.newListCard}
          onPress={openCreateList}
        >
          <View style={[styles.iconBox, styles.newIcon]}>
            <Text style={styles.newPlus}>＋</Text>
          </View>

          <View>
            <Text style={styles.newListText}>
              Nova lista
            </Text>

            <Text style={styles.newListSubtitle}>
              Crie sua própria coleção
            </Text>
          </View>
        </Pressable>

        <View style={styles.offline}>
          <View style={styles.offlineIcon}>
            <Text style={styles.offlineIconText}>↓</Text>
          </View>

          <View style={styles.offlineInfo}>
            <Text style={styles.offlineTitle}>
              Conteúdo offline
            </Text>

            <Text style={styles.offlineText}>
              1 música disponível sem internet
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomNav
        active="Listas"
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
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    color: colors.text,
    fontSize: 29,
    fontWeight: '800',
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },

  headerPlus: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  plus: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '300',
    marginTop: -2,
  },

  filters: {
    marginBottom: 26,
  },

  filter: {
    backgroundColor: colors.surface,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },

  filterActive: {
    backgroundColor: colors.text,
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },

  filterText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 13,
  },

  filterActiveText: {
    color: colors.textDark,
    fontWeight: '700',
    fontSize: 13,
  },

  createCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 18,
    marginBottom: 25,
  },

  createTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
  },

  createDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 17,
  },

  input: {
    height: 50,
    backgroundColor: colors.backgroundSoft,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: 15,
    color: colors.text,
    fontSize: 15,
  },

  createActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },

  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    marginRight: 8,
  },

  cancelText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },

  createButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 17,
    paddingVertical: 11,
  },

  createButtonDisabled: {
    opacity: 0.4,
  },

  createButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 14,
  },

  card: {
    minHeight: 84,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    marginBottom: 11,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  customIcon: {
    borderWidth: 1,
    borderColor: '#4b2c18',
  },

  icon: {
    color: colors.primary,
    fontSize: 22,
  },

  cardInfo: {
    flex: 1,
  },

  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },

  cardSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 3,
  },

  customLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 3,
  },

  more: {
    color: colors.muted,
    fontSize: 25,
  },

  proBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
  },

  proText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 11,
  },

  newListCard: {
    minHeight: 82,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderLight,
    borderRadius: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  newIcon: {
    backgroundColor: colors.surfaceLight,
  },

  newPlus: {
    color: colors.text,
    fontSize: 27,
  },

  newListText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },

  newListSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },

  offline: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  offlineIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  offlineIconText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },

  offlineInfo: {
    flex: 1,
  },

  offlineTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },

  offlineText: {
    color: colors.textSecondary,
    marginTop: 4,
    fontSize: 12,
  },
});