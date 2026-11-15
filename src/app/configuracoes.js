import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { usePersistedState } from '../hooks/usePersistedState';

export default function SettingsRoute() {
  const [dark, setDark, ready] = usePersistedState('app:v1:dark-mode', true);
  const [notifications, setNotifications] = useState(true);
  return <SafeAreaView style={styles.container}><Text style={styles.title}>Configurações</Text><View style={styles.row}><Text style={styles.label}>Modo escuro</Text><Switch value={ready ? dark : true} onValueChange={setDark} trackColor={{ true: colors.primary }} /></View><View style={styles.row}><Text style={styles.label}>Notificações</Text><Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: colors.primary }} /></View><Text style={styles.note}>Sua preferência de aparência fica salva neste aparelho.</Text></SafeAreaView>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 22, backgroundColor: colors.background }, title: { color: colors.text, fontSize: 28, fontWeight: '800', marginBottom: 22 }, row: { minHeight: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: colors.border }, label: { color: colors.text, fontSize: 15 }, note: { color: colors.textSecondary, fontSize: 12, marginTop: 18 } });
