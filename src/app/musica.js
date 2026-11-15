import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import SongScreen from '../screens/SongScreen';
export default function SongRoute() {
  const { song = 'Come As You Are', artist = 'Nirvana', artworkUrl = '', storeUrl = '' } = useLocalSearchParams();
  const songName = Array.isArray(song) ? song[0] : song;
  const artistName = Array.isArray(artist) ? artist[0] : artist;
  const coverUrl = Array.isArray(artworkUrl) ? artworkUrl[0] : artworkUrl;
  const musicStoreUrl = Array.isArray(storeUrl) ? storeUrl[0] : storeUrl;
  return <SongScreen key={`${songName}-${artistName}`} songName={songName} artistName={artistName} artworkUrl={coverUrl} storeUrl={musicStoreUrl} onBack={() => router.back()} />;
}
