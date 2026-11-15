import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
export default function PlaylistRoute() { const { nome } = useLocalSearchParams(); return <SafeAreaView style={styles.container}><Text style={styles.title}>{nome}</Text><Text style={styles.body}>Abra uma música e use as opções de listas para organizar sua coleção.</Text></SafeAreaView>; }
const styles = StyleSheet.create({ container: { flex: 1, padding: 22, backgroundColor: colors.background }, title: { color: colors.text, fontSize: 25, fontWeight: '800', marginBottom: 10 }, body: { color: colors.textSecondary, fontSize: 14, lineHeight: 21 } });
