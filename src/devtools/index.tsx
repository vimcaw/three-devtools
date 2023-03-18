import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { defaultTheme, Flex, ProgressCircle, Provider } from '@adobe/react-spectrum';
import 'modern-normalize';
import './index.css';
import { useThreeJsData } from './store/threeJsData';
import Header from './Header';
import NotDetectedMessage from './NotDetectedMessage';
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
      {threeJsData.revision ? <Header /> : <NotDetectedMessage />}
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
