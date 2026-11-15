import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { api } from '../../services/api';
import { colors } from '../../theme/colors';

export default function UserDetailRoute() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    api.user(id, controller.signal).then(setUser).catch((err) => {
      if (err.name !== 'AbortError') setError(err.message || 'Falha ao buscar o perfil.');
    }).finally(() => setLoading(false));
    return () => controller.abort();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator size="large" color={colors.primary} /> : error ? <Text style={styles.body}>{error}</Text> : user ? (
        <View style={styles.card}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{user.name?.charAt(0)}</Text></View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.body}>{user.email}</Text>
          <Text style={styles.label}>Cidade</Text><Text style={styles.body}>{user.address?.city}</Text>
          <Text style={styles.label}>Empresa</Text><Text style={styles.body}>{user.company?.name}</Text>
          <Text style={styles.label}>Telefone</Text><Text style={styles.body}>{user.phone}</Text>
        </View>
      ) : <Text style={styles.body}>Perfil não encontrado.</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 22, justifyContent: 'center' },
  card: { backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 22 },
  avatar: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft, alignSelf: 'center', marginBottom: 14 },
  avatarText: { color: colors.primary, fontSize: 30, fontWeight: '800' },
  name: { color: colors.text, fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 16 },
  label: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 15, marginBottom: 4 },
  body: { color: colors.textSecondary, fontSize: 14, lineHeight: 21 },
});
