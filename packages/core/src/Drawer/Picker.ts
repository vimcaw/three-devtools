import { Drawer } from './Drawer';
import { ThreeHelper } from './ThreeHelper';
import { ThreeJsClientAdapter } from '../ThreeJsClientAdapter';

export const DEBUG_GROUP_NAME = 'THREE_DEV_GROUP';

export class Picker {
  private debugGroup: THREE.Group;

  private scene: THREE.Scene;

  constructor() {}

  init(scene: THREE.Scene) {
    this.scene = scene;
    this.debugGroup = new ThreeJsClientAdapter.USER_THREE.Group();
    this.debugGroup.name = DEBUG_GROUP_NAME;
    this.scene.add(this.debugGroup);
  }

  highlight(object: THREE.Mesh) {
    this.removeDebugGroup();
    Drawer.drawWireframeBox(object, this.debugGroup);
  }

  unHighlight(object: THREE.Object3D) {
    const debugWireFrame = this.debugGroup.getObjectByName(`wireframe-${object.name}`);
    if (debugWireFrame) {
      this.debugGroup.remove(debugWireFrame);
    }
  }

  removeDebugGroup() {
    ThreeHelper.removeAllChildren(this.debugGroup);
  }
}
