import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './index';

const ROOT_ID = '__THREE_JS_DEVTOOLS__';

export default class ThreeJsDevTools {
  static initialize() {
    const root = document.createElement('div');
    root.id = ROOT_ID;
    document.body.appendChild(root);
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  static destroy() {
    const root = document.getElementById(ROOT_ID);
    if (root) {
      root.remove();
    }
  }
}
