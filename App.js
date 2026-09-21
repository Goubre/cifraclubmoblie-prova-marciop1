import React, { useState } from 'react';

import HomeScreen from './src/screens/HomeScreen';
import ListsScreen from './src/screens/ListsScreen';
import SearchScreen from './src/screens/SearchScreen';
import AcademyScreen from './src/screens/AcademyScreen';
import MoreScreen from './src/screens/MoreScreen';
import ArtistScreen from './src/screens/ArtistScreen';

export default function App() {
  const [screen, setScreen] = useState('Início');

  if (screen === 'Listas') {
    return <ListsScreen onNavigate={setScreen} />;
  }

  if (screen === 'Busca') {
    return <SearchScreen onNavigate={setScreen} />;
  }

  if (screen === 'Academy') {
    return <AcademyScreen onNavigate={setScreen} />;
  }

  if (screen === 'Mais') {
    return <MoreScreen onNavigate={setScreen} />;
  }

  if (screen === 'Artista') {
    return <ArtistScreen onBack={() => setScreen('Busca')} />;
  }

  return <HomeScreen onNavigate={setScreen} />;
}