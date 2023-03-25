import { proxy, subscribe, useSnapshot } from 'valtio';
import type { O } from 'ts-toolbelt';
import { merge } from 'lodash-es';
import { StorageAdapter } from '../StorageAdapter';

export enum Theme {
  Auto = 'auto',
  Light = 'light',
  Dark = 'dark',
}

export const themeOptions = [
  { value: Theme.Auto, name: 'Auto (Follow system preference)' },
  { value: Theme.Light, name: 'Light' },
  { value: Theme.Dark, name: 'Dark' },
];

const defaultPreferences = {
  appearance: {
    theme: Theme.Auto,
  },
};

const PREFERENCES_STORAGE_KEY = 'preferences';

export const preferences = proxy(defaultPreferences);

StorageAdapter.instance.on('initialized', async () => {
  const data = await StorageAdapter.instance.getItem?.(PREFERENCES_STORAGE_KEY);
  if (data) {
    Object.assign(preferences, data);
  }
});

StorageAdapter.instance.on('changed', ({ key, newValue }) => {
  if (key === PREFERENCES_STORAGE_KEY) {
    Object.assign(preferences, newValue);
  }
});

// Store preferences in sync storage
subscribe(preferences, () => {
  StorageAdapter.instance.setItem(PREFERENCES_STORAGE_KEY, preferences);
});

export function usePreferences() {
  return useSnapshot(preferences);
}

export function setPreferences(payload: O.Partial<typeof preferences, 'deep'>) {
  merge(preferences, payload);
}
