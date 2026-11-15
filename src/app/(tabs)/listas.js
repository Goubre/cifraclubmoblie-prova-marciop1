import React from 'react';
import { router } from 'expo-router';
import ListsScreen from '../../screens/ListsScreen';
const paths = { Início: '/', Listas: '/listas', Busca: '/busca', Academy: '/academy', Mais: '/mais' };
export default function ListsRoute() { return <ListsScreen onNavigate={(name) => router.navigate(paths[name] || '/')} />; }
