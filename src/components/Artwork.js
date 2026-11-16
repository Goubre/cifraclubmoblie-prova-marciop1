import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const appearance = {
  track: { backgroundColor: '#292039', accent: '#d5a8ff', symbol: '♫', label: 'MÚSICA' },
  artist: { backgroundColor: '#1c2940', accent: '#83c5ff', symbol: '♪', label: 'ARTISTA' },
  playlist: { backgroundColor: '#30271b', accent: '#ffd27a', symbol: '▤', label: 'PLAYLIST' },
};

function initialsFor(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '♪';
  return (parts.length > 1
    ? `${parts[0][0]}${parts[1][0]}`
    : parts[0].slice(0, 2)).toUpperCase();
}

export default function Artwork({
  uri,
  name = '',
  type = 'track',
  style,
  imageStyle,
  accessibilityLabel,
}) {
  const [failedUri, setFailedUri] = useState(null);
  const theme = appearance[type] || appearance.track;
  const showImage = Boolean(uri) && failedUri !== uri;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel || `${theme.label}: ${name || 'sem título'}`}
      style={[styles.container, { backgroundColor: theme.backgroundColor }, style]}
    >
      {showImage ? (
        <Image
          source={{ uri }}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
          onError={() => setFailedUri(uri)}
        />
      ) : (
        <View style={styles.fallback}>
          <View style={[styles.disc, { borderColor: theme.accent }]}>
            <View style={[styles.discCenter, { backgroundColor: theme.accent }]}>
              <Text style={[styles.symbol, { color: theme.backgroundColor }]}>{theme.symbol}</Text>
            </View>
          </View>
          <Text style={[styles.initials, { color: theme.accent }]} numberOfLines={1}>
            {initialsFor(name)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  fallback: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 5 },
  disc: { width: '54%', aspectRatio: 1, borderRadius: 999, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  discCenter: { width: '36%', aspectRatio: 1, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  symbol: { fontSize: 11, fontWeight: '900' },
  initials: { fontSize: 12, fontWeight: '900', marginTop: 3, textAlign: 'center' },
});
