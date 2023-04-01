import * as THREE from "three";
import {Drawer} from "./Drawer";
import {ThreeHelper} from "./ThreeHelper";

export const DEBUG_GROUP_NAME = "THREE_DEV_GROUP"

export class Picker {

  private debugGroup: THREE.Group

  private scene: THREE.Scene

  constructor() {
  }

  init(scene: THREE.Scene) {
    this.scene = scene
    this.debugGroup =  new THREE.Group()
    this.debugGroup.name = DEBUG_GROUP_NAME
    this.scene.add(this.debugGroup)
  }

  highlight(object: THREE.Mesh) {
    ThreeHelper.removeAllChildren(this.debugGroup)
    Drawer.drawWireframeBox(object, this.debugGroup)
  }

  unHighlight(object: THREE.Object3D) {
    const debugWireFrame = this.debugGroup.getObjectByName(`wireframe-${object.name}`)
    if (debugWireFrame) {
      this.debugGroup.remove(debugWireFrame)
    }
  }
}
