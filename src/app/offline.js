import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import Artwork from '../components/Artwork';
import { trackKey, useTrackArtwork } from '../hooks/useTrackArtwork';
const offlineTracks = [{ title: 'Come As You Are', artist: 'Nirvana' }];
export default function OfflineRoute() {
  const artwork = useTrackArtwork(offlineTracks);
  return <SafeAreaView style={styles.container}><Text style={styles.title}>Conteúdo offline</Text><View style={styles.card}><Artwork uri={artwork[trackKey('Come As You Are', 'Nirvana')]?.artworkUrl} name="Come As You Are" type="track" style={styles.artwork} /><Text style={styles.name}>Come As You Are</Text><Text style={styles.artist}>Nirvana · disponível no app</Text><Text style={styles.note}>As músicas favoritas e as listas criadas ficam guardadas neste aparelho.</Text></View></SafeAreaView>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, backgroundColor: colors.background }, title: { color: colors.text, fontSize: 27, fontWeight: '800', marginBottom: 18 }, card: { padding: 17, borderRadius: 15, backgroundColor: colors.surface }, artwork: { width: 100, height: 100, borderRadius: 14, marginBottom: 14 }, name: { color: colors.text, fontSize: 16, fontWeight: '700' }, artist: { color: colors.primary, marginTop: 5 }, note: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 14 } });
