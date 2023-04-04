import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import ThreeJsDevTools from 'embedding';
import App from './App';

ThreeJsDevTools.initialize()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
