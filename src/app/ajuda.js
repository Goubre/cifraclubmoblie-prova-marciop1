import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
const questions = [['Como salvar uma música?', 'Abra a cifra e toque no coração para guardar entre as favoritas.'], ['Como mudar o tom?', 'Use os botões + e − na tela da cifra para transpor os acordes.'], ['Como usar a busca?', 'Digite o nome de uma música ou artista no campo de busca.']];
export default function HelpRoute() { return <SafeAreaView style={styles.container}><Text style={styles.title}>Ajuda e suporte</Text>{questions.map(([question, answer]) => <View key={question} style={styles.card}><Text style={styles.question}>{question}</Text><Text style={styles.answer}>{answer}</Text></View>)}</SafeAreaView>; }
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, backgroundColor: colors.background }, title: { color: colors.text, fontSize: 27, fontWeight: '800', marginBottom: 20 }, card: { padding: 16, marginBottom: 12, borderRadius: 14, backgroundColor: colors.surface }, question: { color: colors.text, fontWeight: '700', fontSize: 15 }, answer: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 8 } });
