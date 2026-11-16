import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import ArtistScreen from '../screens/ArtistScreen';
export default function ArtistRoute() {
  const { artist = 'Nirvana' } = useLocalSearchParams();
  return <ArtistScreen artistName={artist} onBack={() => router.back()} onOpenSong={(song, artistName, artworkUrl, storeUrl) => router.push({ pathname: '/musica', params: { song, artist: artistName, artworkUrl, storeUrl } })} />;
}
