import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import ThreeJsDevTools from 'embedding';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <ThreeJsDevTools />
  </React.StrictMode>
);
