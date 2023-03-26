import { Layout, Result, theme } from 'antd';
import styled from 'styled-components';
import { MehOutlined } from '@ant-design/icons';
import PreferencesButton from './components/PreferencesButton';

const Container = styled(Layout.Content)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledResult = styled(Result)`
  width: 100%;
  padding: 10px;
`;

export default function NotDetectedMessage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Container style={{ background: colorBgContainer }}>
      <StyledResult
        status="warning"
        icon={<MehOutlined />}
        title="Three.js not detected"
        subTitle="Please open a page that use three.js"
      />
      <PreferencesButton buttonProps={{ style: { position: 'fixed', top: 10, right: 10 } }} />
    </Container>
  );
}
