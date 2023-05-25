import type { Object3D, Scene } from 'three';
import { Card, Tree, TreeProps } from 'antd';
import {
  DeleteOutlined,
  RedoOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  SwapOutlined,
  BugOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import * as SPECTOR from 'spectorjs';
import {
  observerLayer,
  picker,
  setSelectedObject,
  switchScene,
  threeJsData,
} from '../store/threeJsData';
import { DEBUG_GROUP_NAME } from '../Drawer/Picker';

type SceneTreeData = Exclude<TreeProps['treeData'], undefined>[number] & {
  children?: SceneTreeData[];
  object: Object3D;
};

const spector = new SPECTOR.Spector();
let isShowSpector = false;

function getTreeData(scene: Object3D): SceneTreeData[] {
  return scene.children
    .filter(o => o.name !== DEBUG_GROUP_NAME)
    .map(child => ({
      title: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '220px',
          }}
        >
          <span
            title={child.type + (child.name ? ` [${child.name}]` : '')}
            style={{
              width: '120px',
              overflowX: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {child.type + (child.name ? ` [${child.name}]` : '')}
          </span>
          <div
            style={{
              marginLeft: '5px',
            }}
          >
            {child.visible ? (
              <EyeOutlined
                onClick={() => {
                  child.visible = !child.visible;
                  observerLayer.refreshUI();
                }}
                style={{
                  cursor: 'pointer',
                  marginRight: '5px',
                }}
              />
            ) : (
              <EyeInvisibleOutlined
                onClick={() => {
                  child.visible = !child.visible;
                  observerLayer.refreshUI();
                }}
                style={{
                  cursor: 'pointer',
                  marginRight: '5px',
                }}
              />
            )}
          </div>
        </div>
      ),
      key: child.id,
      children: child.children.length ? getTreeData(child) : undefined,
      object: child,
    }));
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = (
  <HeaderWrapper>
    <span>Scene Tree</span>
    <div>
      <BugOutlined
        title="debug your frame with spector.js library"
        style={{
          cursor: 'pointer',
          marginRight: '5px',
        }}
        onClick={() => {
          if (isShowSpector) {
            // spector has no api to hide ui, so we just hide it by css
            // find classname include captureMenuComponent
            const captureMenuComponent = document.getElementsByClassName('captureMenuComponent')[0];
            (captureMenuComponent.parentNode as HTMLElement).style.display = 'none';
            isShowSpector = false;
          } else {
            const captureMenuComponent = document.getElementsByClassName('captureMenuComponent')[0];
            if (captureMenuComponent) {
              (captureMenuComponent.parentNode as HTMLElement).style.display = 'block';
            } else {
              spector.displayUI();
            }
            isShowSpector = true;
          }
        }}
      />
      <SwapOutlined
        title="in case you have multiple scenes"
        style={{
          cursor: 'pointer',
          marginRight: '5px',
        }}
        onClick={() => {
          switchScene();
        }}
      />
      <DeleteOutlined
        title="remove debug group"
        onClick={() => picker.removeDebugGroup()}
        style={{
          cursor: 'pointer',
          marginRight: '5px',
        }}
      />
      <RedoOutlined
        title="refresh group"
        onClick={() => observerLayer.refreshUI()}
        style={{ cursor: 'pointer' }}
      />
    </div>
  </HeaderWrapper>
);

export default function SceneTree({ scene }: { scene: Scene }) {
  return (
    <Card title={Header} size="small">
      <Tree<SceneTreeData>
        style={{
          overflowX: 'auto',
        }}
        treeData={getTreeData(scene)}
        onSelect={(_, { selectedNodes }) => {
          if (selectedNodes[0]?.object) {
            setSelectedObject(selectedNodes[0]?.object ?? null);
            observerLayer.refreshUI();
          }
        }}
      />
    </Card>
  );
}
