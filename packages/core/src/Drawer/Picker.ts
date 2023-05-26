import type * as THREE from 'three';
import { Drawer } from './Drawer';
import { ThreeHelper } from './ThreeHelper';
import { ThreeJsClientAdapter } from '../ThreeJsClientAdapter';

export const DEBUG_GROUP_NAME = 'THREE_DEV_GROUP';

export class Picker {
  private debugGroup?: THREE.Group;

  private scene?: THREE.Scene;

  init(scene: THREE.Scene) {
    if (ThreeJsClientAdapter.USER_THREE) {
      this.scene = scene;
      this.debugGroup = new ThreeJsClientAdapter.USER_THREE.Group();
      this.debugGroup.name = DEBUG_GROUP_NAME;
      this.scene.add(this.debugGroup);
    }
  }

  highlight(object: THREE.Mesh) {
    if (!this.debugGroup) {
      return;
    }
    this.removeDebugGroup();
    Drawer.drawWireframeBox(object, this.debugGroup);
  }

  unHighlight(object: THREE.Object3D) {
    if (!this.debugGroup) {
      return;
    }
    const debugWireFrame = this.debugGroup.getObjectByName(`wireframe-${object.name}`);
    if (debugWireFrame) {
      this.debugGroup.remove(debugWireFrame);
    }
  }

  removeDebugGroup() {
    if (!this.debugGroup) {
      return;
    }
    ThreeHelper.removeAllChildren(this.debugGroup);
  }
}
