import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async get(key, fallback) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  async set(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    return AsyncStorage.removeItem(key);
  },
};
