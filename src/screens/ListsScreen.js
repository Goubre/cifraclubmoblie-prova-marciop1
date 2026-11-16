import React, { useCallback, useState } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { usePersistedState } from '../hooks/usePersistedState';
import { initialLists } from '../data/initialLists';
import { Pressable, SafeAreaView, View, Text, TextInput, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { removePlaylistCover } from '../services/playlistImage';

import { colors } from '../theme/colors';
import Artwork from '../components/Artwork';

export default function ListsScreen({ onNavigate }) {
  const [listas, setListas, listasReady, reloadLists] = usePersistedState('app:v1:playlists', initialLists);
  const [favorites, , favoritesReady, reloadFavorites] = usePersistedState('app:v1:favorites', []);
  const [creating, setCreating] = useState(false);
  const [listName, setListName] = useState('');
  const [createError, setCreateError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useFocusEffect(useCallback(() => {
    if (listasReady) reloadLists();
    if (favoritesReady) reloadFavorites();
  }, [favoritesReady, listasReady, reloadFavorites, reloadLists]));

  function openCreateList() {
    setCreating(true);
  }

  function cancelCreateList() {
    setCreating(false);
    setListName('');
  }

  async function createList() {
    const name = listName.trim();

    if (!name) {
      return;
    }

    const newList = {
      id: String(Date.now()),
      icon: '♪',
      nome: name,
      detalhe: '0 músicas',
      custom: true,
      songs: [],
    };

    try {
      await setListas((current) => [...current, newList]);
      setCreateError('');
      setListName('');
      setCreating(false);
    } catch {
      await reloadLists();
      setCreateError('Não foi possível salvar a lista. Tente novamente.');
    }
  }

  async function deletePlaylist() {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    setDeleteError('');
    try {
      await setListas((current) => current.filter((item) => (
        item !== deleteTarget && (deleteTarget.id ? item.id !== deleteTarget.id : item.nome !== deleteTarget.nome)
      )));
      if (deleteTarget.coverUri) await removePlaylistCover(deleteTarget.coverUri);
      setDeleteTarget(null);
    } catch {
      await reloadLists();
      setDeleteError('Não foi possível excluir a playlist. Tente novamente.');
    } finally {
      setDeleting(false);
    }
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

            {!!createError && <Text style={styles.createError}>{createError}</Text>}

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

        {deleteTarget && (
          <View style={styles.deleteConfirm}>
            <Text style={styles.deleteTitle}>Excluir “{deleteTarget.nome}”?</Text>
            <Text style={styles.deleteDescription}>As músicas salvas nesta playlist também serão removidas.</Text>
            {!!deleteError && <Text style={styles.createError}>{deleteError}</Text>}
            <View style={styles.createActions}>
              <Pressable style={styles.cancelButton} onPress={() => setDeleteTarget(null)} disabled={deleting}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.deleteConfirmButton} onPress={deletePlaylist} disabled={deleting}>
                <Text style={styles.deleteConfirmText}>{deleting ? 'Excluindo…' : 'Excluir playlist'}</Text>
              </Pressable>
            </View>
          </View>
        )}

        {listas.map((item, index) => (
          <View
            key={`${item.nome}-${index}`}
            style={styles.card}
          >
            <Pressable
              style={styles.cardMain}
              onPress={() => item.nome === 'Favoritas'
                ? router.push('/favoritos')
                : router.push({ pathname: '/lista/[nome]', params: { nome: item.nome } })}
              accessibilityRole="button"
              accessibilityLabel={`Abrir playlist ${item.nome}`}
            >
              <Artwork uri={item.coverUri || (item.nome === 'Favoritas' ? favorites[0]?.artworkUrl : item.songs?.[0]?.artworkUrl)} name={item.nome} type="playlist" style={[styles.iconBox, item.custom && styles.customIcon]} />

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.nome}</Text>

                <Text style={styles.cardSubtitle}>
                  {item.nome === 'Favoritas'
                    ? `${favorites.length} ${favorites.length === 1 ? 'música favorita' : 'músicas favoritas'}`
                    : `${(item.songs || []).length} ${(item.songs || []).length === 1 ? 'música' : 'músicas'}`}
                </Text>

                {item.custom && <Text style={styles.customLabel}>Criada por você</Text>}
              </View>

              {item.pro && <View style={styles.proBadge}><Text style={styles.proText}>PRO</Text></View>}
              {!item.custom && !item.pro && <Text style={styles.more}>›</Text>}
            </Pressable>
            {item.custom && (
              <Pressable
                style={styles.deleteButton}
                onPress={() => { setDeleteTarget(item); setDeleteError(''); }}
                accessibilityRole="button"
                accessibilityLabel={`Excluir playlist ${item.nome}`}
                hitSlop={8}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </Pressable>
            )}
          </View>
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

  createError: { color: '#ff8a80', fontSize: 12, marginBottom: 10 },

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

  cardMain: { flex: 1, minWidth: 0, minHeight: 82, flexDirection: 'row', alignItems: 'center' },
  playlistCover: { width: 50, height: 50, borderRadius: 13 },

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

  deleteButton: { minHeight: 42, justifyContent: 'center', paddingHorizontal: 11, marginLeft: 7, borderRadius: 10, backgroundColor: '#3b2020' },
  deleteButtonText: { color: '#ff8a80', fontSize: 11, fontWeight: '800' },
  deleteConfirm: { padding: 16, marginBottom: 16, borderRadius: 16, borderWidth: 1, borderColor: '#b93838', backgroundColor: colors.surface },
  deleteTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  deleteDescription: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 6 },
  deleteConfirmButton: { justifyContent: 'center', paddingHorizontal: 14, paddingVertical: 11, borderRadius: 10, backgroundColor: '#b93838' },
  deleteConfirmText: { color: colors.white, fontSize: 12, fontWeight: '800' },

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
