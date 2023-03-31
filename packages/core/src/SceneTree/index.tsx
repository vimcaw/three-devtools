import type { Object3D, Scene } from 'three';
import {Card, Tree, TreeProps} from 'antd';
import {RedoOutlined} from "@ant-design/icons"
import { useMemo } from 'react';
import {observerLayer, setSelectedObject} from '../store/threeJsData';
import styled from "styled-components";

type SceneTreeData = Exclude<TreeProps['treeData'], undefined>[number] & {
  children?: SceneTreeData[];
  object: Object3D;
};

function getTreeData(scene: Object3D): SceneTreeData[] {
  return scene.children.map(child => ({
    title: child.type,
    key: child.uuid,
    children: child.children.length ? getTreeData(child) : undefined,
    object: child,
  }));
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Header = (
  <HeaderWrapper>
    <span>Scene Tree</span>
    <RedoOutlined
      onClick={() => observerLayer.refreshUI()}
      style={{cursor: "pointer"}}
    />
  </HeaderWrapper>
)

export default function SceneTree({ scene }: { scene: Scene }) {
  return (
    <Card title={Header} size="small" style={{ marginTop: 10 }}>
      <Tree<SceneTreeData>
        treeData={getTreeData(scene)}
        onSelect={(_, { selectedNodes }) => {
          setSelectedObject(selectedNodes[0]?.object ?? null)
          observerLayer.refreshUI()
        }}
      />
    </Card>
  );
}
