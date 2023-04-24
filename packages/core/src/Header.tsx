import styled from 'styled-components';
import { Button, Layout, theme } from 'antd';
import { DragOutlined } from '@ant-design/icons';
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
      <div
        style={{
          marginRight: '5px',
        }}
      >
        <Button
          type="text"
          className="draggable"
          icon={<DragOutlined />}
          style={{
            cursor: 'pointer',
          }}
        />
        <PreferencesButton />
      </div>
    </Container>
  );
}
