import React, { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import ListsScreen from './src/screens/ListsScreen';

export default function App() {
  const [screen, setScreen] = useState('Início');

  if (screen === 'Listas') {
    return <ListsScreen onNavigate={setScreen} />;
  }

  return <HomeScreen onNavigate={setScreen} />;
}