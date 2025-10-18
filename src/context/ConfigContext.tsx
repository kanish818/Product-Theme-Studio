import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { EditorConfig } from '../types';
import { defaultConfig } from '../config/defaultConfig';

type Action =
  | { type: 'set'; payload: Partial<EditorConfig> }
  | { type: 'reset' }
  | { type: 'replace'; payload: EditorConfig };

// localStorage key for persisting theme config
const STORAGE_KEY = 'product-theme-studio-config';

function reducer(state: EditorConfig, action: Action): EditorConfig {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload } as EditorConfig;
    case 'replace':
      return action.payload;
    case 'reset':
      return defaultConfig;
    default:
      return state;
  }
}

const Ctx = createContext<{
  config: EditorConfig;
  set: (patch: Partial<EditorConfig>) => void;
  replace: (next: EditorConfig) => void;
  reset: () => void;
}>({ config: defaultConfig, set: () => {}, replace: () => {}, reset: () => {} });

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load saved config from localStorage, fallback to defaults
  const initial = useMemo<EditorConfig>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed;
      }
    } catch (err) {
      console.warn('Failed to load saved config:', err);
    }
    return defaultConfig;
  }, []);

  const [state, dispatch] = useReducer(reducer, initial);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Failed to save config:', err);
    }
    
    // Update CSS variable for font family so it applies globally
    document.documentElement.style.setProperty('--font', state.typography.family);
  }, [state]);

  const value = useMemo(
    () => ({
      config: state,
      set: (patch: Partial<EditorConfig>) => dispatch({ type: 'set', payload: patch }),
      replace: (next: EditorConfig) => dispatch({ type: 'replace', payload: next }),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [state]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export function useConfig() {
  return useContext(Ctx);
}
