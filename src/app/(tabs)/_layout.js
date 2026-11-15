import React from 'react';
import { Tabs } from 'expo-router';
import { colors } from '../../theme/colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: colors.backgroundSoft, borderTopColor: colors.border },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.muted,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="listas" options={{ title: 'Listas' }} />
      <Tabs.Screen name="busca" options={{ title: 'Busca' }} />
      <Tabs.Screen name="academy" options={{ title: 'Academy' }} />
      <Tabs.Screen name="mais" options={{ title: 'Mais' }} />
    </Tabs>
  );
}
