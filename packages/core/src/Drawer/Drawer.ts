import * as THREE from 'three';

export class Drawer {

  public static drawWireframeBox(object: THREE.Mesh, parent: THREE.Group) {
    const line = new THREE.BoxHelper(object, "#f3ca67");

    line.name = `wireframe-${object.uuid}`;
    line.lineWidth = 2;

    parent.add(line);
  }

}
