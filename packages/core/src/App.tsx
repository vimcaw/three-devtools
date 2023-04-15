import { ConfigProvider, Layout, theme } from 'antd';
import 'modern-normalize';
import './index.css';
import type { Scene } from 'three';
import { useMedia } from 'react-use';
import { Object3D } from 'three';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ConnectionStatus, observerLayer, useThreeJsData } from './store/threeJsData';
import Header from './Header';
import NotDetectedMessage from './NotDetectedMessage';
import { Theme, usePreferences } from './store/perference';
import SceneTree from './SceneTree/SceneTree';
import { PropertyPanel as PropertiesPanel } from './PropertiesPanel';
import { RenderInfo } from './PropertiesPanel/RenderInfo';

const PanelWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px !important;
  }
`;

function useForceUpdate() {
  const [value, setValue] = useState(0);
  const func = () => setValue(value => value + 1);

  useEffect(() => {
    observerLayer.refreshUI = func;
  }, []);
}

function App() {
  const preferences = usePreferences();
  const threeJsData = useThreeJsData();
  const isSystemDarkMode = useMedia('(prefers-color-scheme: dark)');
  const autoThemeAlgorithm = isSystemDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;
  const customThemeAlgorithm =
    preferences.appearance.theme === Theme.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm;

  useForceUpdate();

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
      <Layout>
        {threeJsData.status === ConnectionStatus.Connected ? <Header /> : <NotDetectedMessage />}
        <PanelWrapper>
          {threeJsData.activeScene && <SceneTree scene={threeJsData.activeScene as Scene} />}
          {threeJsData.selectedObject && (
            <PropertiesPanel object={threeJsData.selectedObject as Object3D} />
          )}
          {threeJsData.activeRenderer && <RenderInfo render={threeJsData.activeRenderer} />}
        </PanelWrapper>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
