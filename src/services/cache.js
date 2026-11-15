import { storage } from './storage';

export async function withCache(key, fetchData, ttl = 5 * 60 * 1000) {
  const cached = await storage.get(key, null);
  if (cached && Date.now() - cached.savedAt < ttl) return cached.data;
  try {
    const data = await fetchData();
    await storage.set(key, { data, savedAt: Date.now() });
    return data;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}
