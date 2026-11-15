import React from 'react';
import { router } from 'expo-router';
import SearchScreen from '../../screens/SearchScreen';
const paths = { Início: '/', Listas: '/listas', Busca: '/busca', Academy: '/academy', Mais: '/mais' };
export default function SearchRoute() { return <SearchScreen onNavigate={(name) => router.navigate(paths[name] || '/')} onOpenArtist={(artist) => router.push({ pathname: '/artista', params: { artist } })} onOpenSong={(song, artist, artworkUrl, storeUrl) => router.push({ pathname: '/musica', params: { song, artist, artworkUrl, storeUrl } })} />; }
