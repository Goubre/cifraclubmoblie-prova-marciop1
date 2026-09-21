import React, { useState } from 'react';

import HomeScreen from './src/screens/HomeScreen';
import ListsScreen from './src/screens/ListsScreen';
import SearchScreen from './src/screens/SearchScreen';
import AcademyScreen from './src/screens/AcademyScreen';
import MoreScreen from './src/screens/MoreScreen';
import ArtistScreen from './src/screens/ArtistScreen';
import SongScreen from './src/screens/SongScreen';

export default function App() {
  const [screen, setScreen] = useState('Início');
  const [selectedArtist, setSelectedArtist] = useState('Nirvana');
  const [selectedSong, setSelectedSong] = useState('Come As You Are');

  function openArtist(artist) {
    setSelectedArtist(artist);
    setScreen('Artista');
  }

  function openSong(song, artist) {
    setSelectedSong(song);
    setSelectedArtist(artist);

    if (song === 'Come As You Are') {
      setScreen('Música');
    } else {
      setScreen('Artista');
    }
  }

  if (screen === 'Listas') {
    return <ListsScreen onNavigate={setScreen} />;
  }

  if (screen === 'Busca') {
    return (
      <SearchScreen
        onNavigate={setScreen}
        onOpenArtist={openArtist}
        onOpenSong={openSong}
      />
    );
  }

  if (screen === 'Academy') {
    return <AcademyScreen onNavigate={setScreen} />;
  }

  if (screen === 'Mais') {
    return <MoreScreen onNavigate={setScreen} />;
  }

  if (screen === 'Artista') {
    return (
      <ArtistScreen
        artistName={selectedArtist}
        onBack={() => setScreen('Busca')}
        onOpenSong={openSong}
      />
    );
  }

  if (screen === 'Música') {
    return (
      <SongScreen
        songName={selectedSong}
        artistName={selectedArtist}
        onBack={() => setScreen('Artista')}
      />
    );
  }

 return (
  <HomeScreen
    onNavigate={setScreen}
    onOpenArtist={openArtist}
    onOpenSong={openSong}
  />
);
}