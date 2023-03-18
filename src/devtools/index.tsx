import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { defaultTheme, Flex, ProgressCircle, Provider } from '@adobe/react-spectrum';
import 'modern-normalize';
import './index.css';
import { ConnectionStatus, useThreeJsData } from './store/threeJsData';
import Header from './Header';
import NotDetectedMessage from './NotDetectedMessage';
import Loading from './components/Loading';
import { Theme, usePreferences } from './store/perference';

function App() {
  const preferences = usePreferences();
  const threeJsData = useThreeJsData();

  return (
    <Provider
      theme={defaultTheme}
      colorScheme={
        preferences.appearance.theme === Theme.Auto ? undefined : preferences.appearance.theme
      }
      height="100vh"
    >
      {threeJsData.status === ConnectionStatus.Connecting ? (
        <Loading message="Connecting to Three.js instance in the page" />
      ) : null}
      {threeJsData.status === ConnectionStatus.Connected ? <Header /> : null}
      {threeJsData.status === ConnectionStatus.NotConnected ? <NotDetectedMessage /> : null}
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense
      fallback={
        <Flex height="100vh" justifyContent="center" alignItems="center">
          <ProgressCircle aria-label="Loading…" isIndeterminate />
        </Flex>
      }
    >
      <App />
    </Suspense>
  </StrictMode>
);
