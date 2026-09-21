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
            style={styles.item}
            onPress={() => onNavigate?.(item.label)}
          >
            <View style={styles.iconArea}>
              <Text
                style={[
                  styles.icon,
                  selected && styles.selectedIcon,
                ]}
              >
                {item.icon}
              </Text>

              {selected && <View style={styles.activeIndicator} />}
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
    height: 78,
    backgroundColor: colors.backgroundSoft,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 7,
    paddingHorizontal: 4,
  },

  item: {
    flex: 1,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconArea: {
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: colors.muted,
    fontSize: 23,
  },

  selectedIcon: {
    color: colors.text,
  },

  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },

  label: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 5,
    fontWeight: '500',
  },

  selectedLabel: {
    color: colors.text,
    fontWeight: '700',
  },
});