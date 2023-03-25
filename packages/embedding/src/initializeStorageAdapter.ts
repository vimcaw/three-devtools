import localforage from 'localforage';
import type { StorageAdapter } from 'core';

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'three-devtools',
});

export function initializeStorageAdapter(storageAdapter: StorageAdapter) {
  storageAdapter.initialize({
    getItem: key => localforage.getItem(key),
    setItem: (key, value) => localforage.setItem(key, value),
    removeItem: key => localforage.removeItem(key),
    clear: () => localforage.clear(),
  });
  window.addEventListener('storage', event => {
    if (event.storageArea === localStorage && event.key) {
      storageAdapter.emitter.emit('changed', {
        key: event.key,
        oldValue: event.oldValue,
        newValue: event.newValue,
      });
    }
  });
}
