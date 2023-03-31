import { ConfigProvider, Layout, theme } from 'antd';
import 'modern-normalize';
import './index.css';
import type { Scene } from 'three';
import { useMedia } from 'react-use';
import { Object3D } from 'three';
import {ConnectionStatus, observerLayer, useThreeJsData} from './store/threeJsData';
import Header from './Header';
import NotDetectedMessage from './NotDetectedMessage';
import { Theme, usePreferences } from './store/perference';
import SceneTree from './SceneTree';
import {PropertyPanel as PropertiesPanel} from './PropertiesPanel';
import {useState} from "react";

function useForceUpdate(){
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

function App() {
  const preferences = usePreferences();
  const threeJsData = useThreeJsData();
  const isSystemDarkMode = useMedia('(prefers-color-scheme: dark)');
  const autoThemeAlgorithm = isSystemDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;
  const customThemeAlgorithm =
    preferences.appearance.theme === Theme.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm;

  observerLayer.refreshUI = useForceUpdate()

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#049ef4',
        },
        algorithm:
          preferences.appearance.theme === Theme.Auto ? autoThemeAlgorithm : customThemeAlgorithm,
      }}
    >
      <Layout style={{ height: '100%' }}>
        {threeJsData.status === ConnectionStatus.Connected ? <Header /> : <NotDetectedMessage />}
        {threeJsData.activeScene && <SceneTree scene={threeJsData.activeScene as Scene} />}
        {threeJsData.selectedObject && (
          <PropertiesPanel object={threeJsData.selectedObject as Object3D} />
        )}
      </Layout>
    </ConfigProvider>
  );
}

export default App;
