import type { Object3D, WebGLRenderer } from 'three';
import { Collapse } from 'antd';
import styled from 'styled-components';
import GeneralPanel from './GeneralPanel';
import { RenderInfo } from './RenderInfo';
import { useThreeJsData } from '../store/threeJsData';

const CollapsePanel = styled(Collapse.Panel)`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

export function PropertiesPanel() {
  const threeJsData = useThreeJsData();

  return (
    <Collapse size="small" ghost>
      {threeJsData.selectedObject && (
        <CollapsePanel key="GeneralPanel" header="General Info">
          <GeneralPanel object={threeJsData.selectedObject as Object3D} />
        </CollapsePanel>
      )}
      {threeJsData.activeRenderer && (
        <CollapsePanel key="RenderInfo" header="Render Info">
          <RenderInfo render={threeJsData.activeRenderer as WebGLRenderer} />
        </CollapsePanel>
      )}
    </Collapse>
  );
}
