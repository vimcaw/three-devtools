import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Content,
  defaultTheme,
  Flex,
  Heading,
  IllustratedMessage,
  Provider,
  View,
} from '@adobe/react-spectrum';
import NoSearchResults from '@spectrum-icons/illustrations/NoSearchResults';
import 'modern-normalize';
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

  return (
    <Provider theme={defaultTheme} height="100vh">
      {connectedThreeJsReversion ? (
        <View padding="size-200" height="100%">
          Connected ThreeJs <code>r{connectedThreeJsReversion}</code>
        </View>
      ) : (
        <Flex height="100vh" justifyContent="center" alignItems="center">
          <IllustratedMessage>
            <NoSearchResults />
            <Heading>Three.js not detected</Heading>
            <Content>Please open a page that use three.js</Content>
          </IllustratedMessage>
        </Flex>
      )}
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
