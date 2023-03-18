import React from 'react';
import ReactDOM from 'react-dom/client';
import { defaultTheme, Provider, Text, View } from '@adobe/react-spectrum';
import 'modern-normalize';
import './index.css';

function App() {
  return (
    <Provider theme={defaultTheme}>
      <View width="size-3000" paddingX="size-300" paddingY="size-200">
        Please open <Text UNSAFE_className="code">Chrome DevTools</Text> and navigate to the{' '}
        <Text UNSAFE_className="code">three</Text> tab in order to access the Three.js Devtools.
      </View>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
