import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import SongScreen from '../screens/SongScreen';
export default function SongRoute() {
  const { song = 'Come As You Are', artist = 'Nirvana' } = useLocalSearchParams();
  return <SongScreen key={`${song}-${artist}`} songName={song} artistName={artist} onBack={() => router.back()} />;
}
