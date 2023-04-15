import type { Object3D, Scene } from 'three';
import { Card, Tree, TreeProps } from 'antd';
import { DeleteOutlined, RedoOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { observerLayer, picker, setSelectedObject } from '../store/threeJsData';
import { DEBUG_GROUP_NAME } from '../Drawer/Picker';

type SceneTreeData = Exclude<TreeProps['treeData'], undefined>[number] & {
  children?: SceneTreeData[];
  object: Object3D;
};

function getTreeData(scene: Object3D): SceneTreeData[] {
  return scene.children
    .filter(o => o.name !== DEBUG_GROUP_NAME)
    .map(child => ({
      title: (
        <div
          style={{
            width: '230px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{child.type + (child.name ? ` [${child.name}]` : '')}</span>
          <div>
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
      key: child.uuid,
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
      <DeleteOutlined
        onClick={() => picker.removeDebugGroup()}
        style={{
          cursor: 'pointer',
          marginRight: '5px',
        }}
      />
      <RedoOutlined onClick={() => observerLayer.refreshUI()} style={{ cursor: 'pointer' }} />
    </div>
  </HeaderWrapper>
);

export default function SceneTree({ scene }: { scene: Scene }) {
  return (
    <Card title={Header} size="small">
      <Tree<SceneTreeData>
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
