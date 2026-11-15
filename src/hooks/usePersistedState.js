import { useCallback, useEffect, useRef, useState } from 'react';
import { storage } from '../services/storage';

export function usePersistedState(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [ready, setReady] = useState(false);
  const valueRef = useRef(initialValue);
  const initialRef = useRef(initialValue);

  useEffect(() => {
    let active = true;
    storage.get(key, initialRef.current).then((saved) => {
      if (active) {
        valueRef.current = saved;
        setValue(saved);
        setReady(true);
      }
    });
    return () => { active = false; };
  }, [key]);

  const update = useCallback((nextValue) => {
    const resolved = typeof nextValue === 'function' ? nextValue(valueRef.current) : nextValue;
    valueRef.current = resolved;
    setValue(resolved);
    storage.set(key, resolved).catch(() => {});
  }, [key]);

  return [value, update, ready];
}
