import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import DevtoolsPort from './DevtoolsPort';

function App() {
  const [devtoolsPort] = useState(() => new DevtoolsPort());
  const [connectedThreeJsReversion, setConnectedThreeJsReversion] = useState('');

  useEffect(() => {
    devtoolsPort.onConnected = ({ revision }) => {
      setConnectedThreeJsReversion(revision);
    };
    devtoolsPort.onDisconnect = () => {
      setConnectedThreeJsReversion('');
    };
  }, [devtoolsPort]);

  return connectedThreeJsReversion ? (
    <p>
      Connected ThreeJs <code>r{connectedThreeJsReversion}</code>
    </p>
  ) : (
    <p>Please open a page that use three.js</p>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
