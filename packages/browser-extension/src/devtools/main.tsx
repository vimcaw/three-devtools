import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, ThreeJsClientAdapter } from 'core';
import { DevtoolsPort } from './DevtoolsPort';

DevtoolsPort.instance.connectToDevtoolsApp(ThreeJsClientAdapter.instance);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
