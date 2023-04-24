import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import { ThreeJsDevTools, App as EmbeddingApp } from 'embedding';
import * as THREE from 'three';
import { App } from './App';

ThreeJsDevTools.initialize({
  three: THREE,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <EmbeddingApp three={THREE} />
  </React.StrictMode>
);
