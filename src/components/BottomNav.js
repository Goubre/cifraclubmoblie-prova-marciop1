import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';

const items = [
  { icon: '⌂', label: 'Início' },
  { icon: '☷', label: 'Listas' },
  { icon: '⌕', label: 'Busca' },
  { icon: '◇', label: 'Academy' },
  { icon: '•••', label: 'Mais' },
];

export default function BottomNav({ active = 'Início', onNavigate }) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const selected = item.label === active;

        return (
          <Pressable
  key={item.label}
  style={styles.item}
  onPress={() => onNavigate?.(item.label)}
>
            <Text style={[styles.icon, selected && styles.selected]}>
              {item.icon}
            </Text>

            <Text style={[styles.label, selected && styles.selected]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 76,
    backgroundColor: '#191919',
    borderTopWidth: 1,
    borderTopColor: '#303030',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 8,
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: '#8e8e8e',
    fontSize: 25,
    height: 32,
  },

  label: {
    color: '#8e8e8e',
    fontSize: 12,
    marginTop: 2,
  },

  selected: {
    color: colors.text,
    fontWeight: 'bold',
  },
});