import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { colors } from '../../theme/colors';

function TabIcon({ route, color, focused }) {
  return (
    <View style={[styles.iconPill, focused && styles.iconPillActive]}>
      {route === 'index' && <HomeIcon color={color} />}
      {route === 'listas' && <ListsIcon color={color} />}
      {route === 'busca' && <SearchIcon color={color} />}
      {route === 'academy' && <BookIcon color={color} />}
      {route === 'mais' && <MoreIcon color={color} />}
    </View>
  );
}

function HomeIcon({ color }) {
  return (
    <View style={styles.homeIcon}>
      <View style={[styles.roof, { borderBottomColor: color }]} />
      <View style={[styles.house, { backgroundColor: color }]}>
        <View style={styles.door} />
      </View>
    </View>
  );
}

function ListsIcon({ color }) {
  return (
    <View style={styles.listIcon}>
      {[0, 1, 2].map((item) => (
        <View key={item} style={styles.iconRow}>
          <View style={[styles.bullet, { backgroundColor: color }]} />
          <View style={[styles.listLine, { backgroundColor: color }]} />
        </View>
      ))}
    </View>
  );
}

function SearchIcon({ color }) {
  return (
    <View style={styles.searchIcon}>
      <View style={[styles.searchLens, { borderColor: color }]} />
      <View style={[styles.searchHandle, { backgroundColor: color }]} />
    </View>
  );
}

function BookIcon({ color }) {
  return (
    <View style={styles.bookIcon}>
      <View style={[styles.bookPage, styles.leftPage, { borderColor: color }]} />
      <View style={[styles.bookPage, styles.rightPage, { borderColor: color }]} />
    </View>
  );
}

function MoreIcon({ color }) {
  return (
    <View style={styles.moreIcon}>
      {[0, 1, 2].map((item) => (
        <View key={item} style={[styles.moreDot, { backgroundColor: color }]} />
      ))}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.muted,
      tabBarLabelStyle: styles.tabLabel,
      tabBarItemStyle: styles.tabItem,
      tabBarHideOnKeyboard: true,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: (props) => <TabIcon route="index" {...props} />, tabBarAccessibilityLabel: 'Início' }} />
      <Tabs.Screen name="listas" options={{ title: 'Listas', tabBarIcon: (props) => <TabIcon route="listas" {...props} />, tabBarAccessibilityLabel: 'Minhas listas' }} />
      <Tabs.Screen name="busca" options={{ title: 'Busca', tabBarIcon: (props) => <TabIcon route="busca" {...props} />, tabBarAccessibilityLabel: 'Buscar músicas' }} />
      <Tabs.Screen name="academy" options={{ title: 'Academy', tabBarIcon: (props) => <TabIcon route="academy" {...props} />, tabBarAccessibilityLabel: 'Cifra Club Academy' }} />
      <Tabs.Screen name="mais" options={{ title: 'Mais', tabBarIcon: (props) => <TabIcon route="mais" {...props} />, tabBarAccessibilityLabel: 'Mais opções' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.backgroundSoft,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    elevation: 14,
  },
  tabItem: { paddingHorizontal: 2 },
  tabLabel: { fontSize: 10, fontWeight: '700', marginTop: 1 },
  iconPill: {
    width: 48,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPillActive: { backgroundColor: colors.primarySoft },
  homeIcon: { width: 24, height: 23, alignItems: 'center' },
  roof: {
    width: 0,
    height: 0,
    borderLeftWidth: 11,
    borderRightWidth: 11,
    borderBottomWidth: 9,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  house: { width: 17, height: 12, alignItems: 'center', justifyContent: 'flex-end' },
  door: { width: 4, height: 7, borderTopLeftRadius: 2, borderTopRightRadius: 2, backgroundColor: colors.backgroundSoft },
  listIcon: { width: 21, gap: 3 },
  iconRow: { height: 5, flexDirection: 'row', alignItems: 'center', gap: 4 },
  bullet: { width: 3, height: 3, borderRadius: 2 },
  listLine: { width: 14, height: 2, borderRadius: 2 },
  searchIcon: { width: 23, height: 23 },
  searchLens: { position: 'absolute', top: 1, left: 1, width: 15, height: 15, borderWidth: 2.5, borderRadius: 9 },
  searchHandle: { position: 'absolute', width: 8, height: 2.5, right: 0, bottom: 3, borderRadius: 2, transform: [{ rotate: '45deg' }] },
  bookIcon: { width: 24, height: 18, flexDirection: 'row', justifyContent: 'center' },
  bookPage: { width: 10, height: 16, borderWidth: 2, backgroundColor: 'transparent' },
  leftPage: { borderTopLeftRadius: 5, borderBottomLeftRadius: 2, borderTopRightRadius: 2, transform: [{ skewY: '-7deg' }] },
  rightPage: { borderTopRightRadius: 5, borderBottomRightRadius: 2, borderTopLeftRadius: 2, transform: [{ skewY: '7deg' }] },
  moreIcon: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  moreDot: { width: 4, height: 4, borderRadius: 2 },
});
