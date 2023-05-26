import type * as THREE from 'three';
import { ThreeJsClientAdapter } from '../ThreeJsClientAdapter';

export class Drawer {
  public static drawWireframeBox(object: THREE.Mesh, parent: THREE.Group) {
    if (ThreeJsClientAdapter.USER_THREE) {
      const line = new ThreeJsClientAdapter.USER_THREE.BoxHelper(object, '#f3ca67');

      line.name = `wireframe-${object.uuid}`;
      if (
        line.material &&
        line.material instanceof ThreeJsClientAdapter.USER_THREE.LineBasicMaterial
      ) {
        line.material.linewidth = 2;
      }

      parent.add(line);
    } else {
      console.log('USER_THREE not defined');
    }
  }
}
