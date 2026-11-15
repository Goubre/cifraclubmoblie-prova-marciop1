import { useCallback, useEffect, useRef, useState } from 'react';
import { storage } from '../services/storage';

export function usePersistedState(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [ready, setReady] = useState(false);
  const valueRef = useRef(initialValue);
  const initialRef = useRef(initialValue);
  const readyRef = useRef(false);
  const pendingUpdatesRef = useRef([]);
  const pendingWritesRef = useRef([]);

  useEffect(() => {
    let active = true;
    readyRef.current = false;

    async function hydrate() {
      let resolved = await storage.get(key, initialRef.current);

      while (active && pendingUpdatesRef.current.length > 0) {
        const updates = pendingUpdatesRef.current.splice(0);
        for (const update of updates) {
          resolved = typeof update === 'function' ? update(resolved) : update;
        }
        valueRef.current = resolved;
        setValue(resolved);
        await storage.set(key, resolved);
      }

      if (active) {
        valueRef.current = resolved;
        readyRef.current = true;
        setValue(resolved);
        setReady(true);
        pendingWritesRef.current.splice(0).forEach(({ resolve }) => resolve());
      }
    }

    hydrate().catch((error) => {
      if (!active) return;
      readyRef.current = true;
      setReady(true);
      pendingWritesRef.current.splice(0).forEach(({ reject }) => reject(error));
    });

    return () => { active = false; };
  }, [key]);

  const update = useCallback((nextValue) => {
    if (!readyRef.current) {
      pendingUpdatesRef.current.push(nextValue);
      return new Promise((resolve, reject) => pendingWritesRef.current.push({ resolve, reject }));
    }
    const resolved = typeof nextValue === 'function' ? nextValue(valueRef.current) : nextValue;
    valueRef.current = resolved;
    setValue(resolved);
    return storage.set(key, resolved);
  }, [key]);

  const reload = useCallback(async () => {
    const saved = await storage.get(key, initialRef.current);
    valueRef.current = saved;
    readyRef.current = true;
    setValue(saved);
    setReady(true);
  }, [key]);

  return [value, update, ready, reload];
}
