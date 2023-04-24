import React from 'react';
import ReactDOM from 'react-dom/client';
import { StorageAdapter, THREE, ThreeJsClientAdapter } from 'core';
import { initializeStorageAdapter } from './initializeStorageAdapter';
import { initializeThreeJsClientAdapter } from './initializeThreeJsClientAdapter';
import App from './App';
import { IInitProps } from './types';

initializeStorageAdapter(StorageAdapter.instance);
initializeThreeJsClientAdapter(ThreeJsClientAdapter.instance);

const ROOT_ID = '__THREE_JS_DEVTOOLS__';

export class ThreeJsDevTools {
  static USER_THREE: THREE;

  static initialize(props: IInitProps) {
    ThreeJsClientAdapter.USER_THREE = props.three;
    // @ts-ignore
    if (import.meta.env.DEV) {
      // In development mode, we inject the devtools into the `examples` app directly
      return;
    }

    const root = document.createElement('div');
    root.id = ROOT_ID;
    document.body.appendChild(root);
    ReactDOM.createRoot(root).render(<App {...props} />);
  }

  static destroy() {
    const root = document.getElementById(ROOT_ID);
    if (root) {
      root.remove();
    }
  }
}

export { App };
