import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { api } from '../services/api';
import { withCache } from '../services/cache';
import { colors } from '../theme/colors';

export default function CommunityRoute() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadUsers = useCallback(async (refresh = false) => {
    if (refresh) setRefreshing(true);
    else setLoading(true);
    setError('');
    try {
      const data = await withCache('app:v1:community-users', () => api.users(), refresh ? 0 : undefined);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar a comunidade.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => loadUsers(), 0);
    return () => clearTimeout(timer);
  }, [loadUsers]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadUsers(true)} tintColor={colors.primary} />}
        ListHeaderComponent={<View><Text style={styles.title}>Comunidade</Text><Text style={styles.subtitle}>Perfis carregados da API de demonstração</Text></View>}
        ListEmptyComponent={loading ? <ActivityIndicator style={styles.state} size="large" color={colors.primary} /> : error ? <View style={styles.state}><Text style={styles.stateText}>{error}</Text><Pressable onPress={() => loadUsers()} style={styles.button}><Text style={styles.buttonText}>Tentar novamente</Text></Pressable></View> : <Text style={styles.stateText}>Nenhum perfil encontrado. Puxe para atualizar.</Text>}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => router.push({ pathname: '/usuario/[id]', params: { id: String(item.id) } })}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{item.name?.charAt(0)}</Text></View>
            <View style={styles.info}><Text style={styles.name}>{item.name}</Text><Text style={styles.email}>{item.email}</Text></View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 20, flexGrow: 1 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 5, marginBottom: 22 },
  card: { minHeight: 74, flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 10, borderRadius: 15, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft, marginRight: 12 },
  avatarText: { color: colors.primary, fontSize: 18, fontWeight: '800' },
  info: { flex: 1 },
  name: { color: colors.text, fontSize: 15, fontWeight: '700' },
  email: { color: colors.textSecondary, marginTop: 4, fontSize: 12 },
  arrow: { color: colors.muted, fontSize: 26, paddingHorizontal: 5 },
  state: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, minHeight: 180 },
  stateText: { color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  button: { backgroundColor: colors.primary, paddingHorizontal: 18, paddingVertical: 11, borderRadius: 10, marginTop: 14 },
  buttonText: { color: colors.white, fontWeight: '700' },
});
