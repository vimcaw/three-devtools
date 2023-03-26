import type { Object3D, Scene } from 'three';
import { Tree, TreeProps } from 'antd';
import { useMemo } from 'react';
import { setSelectedObject } from '../store/threeJsData';

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

export default function SceneTree({ scene }: { scene: Scene }) {
  const treeData = useMemo(() => getTreeData(scene), [scene]);

  return (
    <Tree<SceneTreeData>
      treeData={treeData}
      onSelect={(_, { selectedNodes }) => setSelectedObject(selectedNodes[0]?.object ?? null)}
    />
  );
}
