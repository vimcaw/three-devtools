import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './index';

const ROOT_ID = '__THREE_JS_DEVTOOLS__';

export interface IInitProps {
  panelStyle: React.CSSProperties;
}

export default class ThreeJsDevTools {

  static initialize(props: IInitProps = {}) {
    const root = document.createElement('div');
    root.id = ROOT_ID;
    document.body.appendChild(root);
    ReactDOM.createRoot(root).render(
      <App
        panelStyle={props.panelStyle || {}}
      />
    );
  }

  static destroy() {
    const root = document.getElementById(ROOT_ID);
    if (root) {
      root.remove();
    }
  }
}
