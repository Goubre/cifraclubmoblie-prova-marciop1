import React, { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import ListsScreen from './src/screens/ListsScreen';
import SearchScreen from './src/screens/SearchScreen';

export default function App() {
  const [screen, setScreen] = useState('Início');

  if (screen === 'Listas') {
    return <ListsScreen onNavigate={setScreen} />;
  }

  if (screen === 'Busca') {
    return <SearchScreen onNavigate={setScreen} />;
  }

  return <HomeScreen onNavigate={setScreen} />;
}