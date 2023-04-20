import type * as THREE from 'three';

export class Observer {
  private scene?: THREE.Scene;

  findNode(uuid: string) {
    let find: THREE.Object3D;

    this.scene!.traverse(node => {
      if (node.uuid === uuid) {
        find = node;
      }
    });

    return find!;
  }

  addScene(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * since the scene is updated, we need to force refresh the UI panel
   */
  refreshUI?: () => void;
}
