import React from 'react';
import ReactDOM from 'react-dom/client';
import type * as THREE from 'three';
import { ThreeJsClientAdapter } from 'core';
import App from './index';

const ROOT_ID = '__THREE_JS_DEVTOOLS__';

export interface IInitProps {
  three: THREE;
  panelStyle?: React.CSSProperties;
}

export class ThreeJsDevTools {
  static USER_THREE: THREE;

  static initialize(props: IInitProps) {
    ThreeJsClientAdapter.USER_THREE = props.three;

    const root = document.createElement('div');
    root.id = ROOT_ID;
    document.body.appendChild(root);
    ReactDOM.createRoot(root).render(<App panelStyle={props.panelStyle || {}} />);
  }

  static destroy() {
    const root = document.getElementById(ROOT_ID);
    if (root) {
      root.remove();
    }
  }
}
