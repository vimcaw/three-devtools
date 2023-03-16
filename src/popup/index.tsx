import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <p>
      Please open `Chrome DevTools` and navigate to the `three` tab in order to access the Three.js
      Devtools.
    </p>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
