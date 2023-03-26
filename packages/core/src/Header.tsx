import styled from 'styled-components';
import { Layout, theme } from 'antd';
import { useThreeJsData } from './store/threeJsData';
import PreferencesButton from './components/PreferencesButton';

const Container = styled(Layout.Header)`
  padding: 5px 2px 5px 10px;
  height: auto;
  margin-bottom: 10px;
  line-height: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Header() {
  const threeJsData = useThreeJsData();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Container style={{ backgroundColor: colorBgContainer }}>
      <div>
        <span>Three.js </span>
        <code>{threeJsData.version}</code>
      </div>
      <PreferencesButton />
    </Container>
  );
}
