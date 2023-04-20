import React from 'react';
import ReactDOM from 'react-dom/client';
import type { THREE } from 'core';
import { ThreeJsClientAdapter } from 'core';
import App from './index';
import type { IInitProps } from './types';

const ROOT_ID = '__THREE_JS_DEVTOOLS__';

export class ThreeJsDevTools {
  static USER_THREE: THREE;

  static initialize(props: IInitProps) {
    ThreeJsClientAdapter.USER_THREE = props.three;

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
