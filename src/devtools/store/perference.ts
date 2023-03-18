import { proxy, subscribe, useSnapshot } from 'valtio';
import browser from 'webextension-polyfill';
import type { O } from 'ts-toolbelt';
import { merge } from 'lodash-es';

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

browser.storage.sync.get(PREFERENCES_STORAGE_KEY).then(data => {
  if (data[PREFERENCES_STORAGE_KEY]) {
    console.log('-> data', data[PREFERENCES_STORAGE_KEY]);
    Object.assign(preferences, data[PREFERENCES_STORAGE_KEY]);
  }
});

browser.storage.onChanged.addListener((changes, areaName) => {
  console.log('-> onChanged', changes, areaName);
  if (areaName === 'sync' && changes[PREFERENCES_STORAGE_KEY]) {
    Object.assign(preferences, changes[PREFERENCES_STORAGE_KEY].newValue);
  }
});

// Store preferences in sync storage
subscribe(preferences, () => {
  browser.storage.sync.set({ [PREFERENCES_STORAGE_KEY]: preferences });
});

export function usePreferences() {
  return useSnapshot(preferences);
}

export function setPreferences(payload: O.Partial<typeof preferences, 'deep'>) {
  merge(preferences, payload);
}
