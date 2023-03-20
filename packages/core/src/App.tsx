import { defaultTheme, Provider } from '@adobe/react-spectrum';
import 'modern-normalize';
import './index.css';
import { ConnectionStatus, useThreeJsData } from './store/threeJsData';
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
      {threeJsData.status === ConnectionStatus.Connected ? <Header /> : <NotDetectedMessage />}
    </Provider>
  );
}

export default App;
