import React from 'react';
import { router } from 'expo-router';
import AcademyScreen from '../../screens/AcademyScreen';
const paths = { Início: '/', Listas: '/listas', Busca: '/busca', Academy: '/academy', Mais: '/mais' };
export default function AcademyRoute() { return <AcademyScreen onNavigate={(name) => router.navigate(paths[name] || '/')} />; }
