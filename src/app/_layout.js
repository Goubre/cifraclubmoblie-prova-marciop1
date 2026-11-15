import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '../theme/colors';

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: colors.background },
      headerTintColor: colors.text,
      headerTitleStyle: { fontWeight: '700' },
      contentStyle: { backgroundColor: colors.background },
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="artista" options={{ title: 'Artista' }} />
      <Stack.Screen name="musica" options={{ title: 'Cifra' }} />
      <Stack.Screen name="adicionar-lista" options={{ title: 'Minhas listas' }} />
      <Stack.Screen name="comunidade" options={{ title: 'Comunidade' }} />
      <Stack.Screen name="usuario/[id]" options={{ title: 'Perfil' }} />
      <Stack.Screen name="configuracoes" options={{ title: 'Configurações' }} />
      <Stack.Screen name="ajuda" options={{ title: 'Ajuda' }} />
      <Stack.Screen name="favoritos" options={{ title: 'Favoritas' }} />
      <Stack.Screen name="offline" options={{ title: 'Conteúdo offline' }} />
      <Stack.Screen name="lista/[nome]" options={{ title: 'Minha lista' }} />
    </Stack>
  );
}
