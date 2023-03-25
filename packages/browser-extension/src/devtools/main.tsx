import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, ThreeJsClientAdapter, StorageAdapter } from 'core';
import { DevtoolsPort } from './DevtoolsPort';

DevtoolsPort.instance.connectToDevtoolsApp(StorageAdapter.instance, ThreeJsClientAdapter.instance);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
