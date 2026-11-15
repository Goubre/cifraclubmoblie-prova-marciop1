import React from 'react';
import { router } from 'expo-router';
import MoreScreen from '../../screens/MoreScreen';
const paths = { Início: '/', Listas: '/listas', Busca: '/busca', Academy: '/academy', Mais: '/mais' };
export default function MoreRoute() { return <MoreScreen onNavigate={(name) => router.navigate(paths[name] || '/')} />; }
