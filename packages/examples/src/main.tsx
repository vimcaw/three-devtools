import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import { ThreeJsDevTools } from 'embedding';
import * as THREE from 'three';
import { App } from './App';

ThreeJsDevTools.initialize({
  three: THREE,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
