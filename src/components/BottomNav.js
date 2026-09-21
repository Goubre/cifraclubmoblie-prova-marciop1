import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import { colors } from '../theme/colors';

const items = [
  { icon: '⌂', label: 'Início' },
  { icon: '☷', label: 'Listas' },
  { icon: '⌕', label: 'Busca' },
  { icon: '◇', label: 'Academy' },
  { icon: '•••', label: 'Mais' },
];

export default function BottomNav({
  active = 'Início',
  onNavigate,
}) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const selected = item.label === active;

        return (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
              styles.item,
              pressed && styles.itemPressed,
            ]}
            onPress={() => onNavigate?.(item.label)}
          >
            <View
              style={[
                styles.iconArea,
                selected && styles.selectedIconArea,
              ]}
            >
              <Text
                style={[
                  styles.icon,
                  selected && styles.selectedIcon,
                ]}
              >
                {item.icon}
              </Text>
            </View>

            <Text
              style={[
                styles.label,
                selected && styles.selectedLabel,
              ]}
            >
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
    minHeight: 76,
    backgroundColor: colors.backgroundSoft,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 7,
  },

  item: {
    flex: 1,
    minHeight: 61,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
  },

  itemPressed: {
    opacity: 0.65,
  },

  iconArea: {
    width: 36,
    height: 29,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedIconArea: {
    backgroundColor: colors.primarySoft,
  },

  icon: {
    color: colors.muted,
    fontSize: 21,
  },

  selectedIcon: {
    color: colors.primary,
    fontWeight: '700',
  },

  label: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },

  selectedLabel: {
    color: colors.text,
    fontWeight: '700',
  },
});