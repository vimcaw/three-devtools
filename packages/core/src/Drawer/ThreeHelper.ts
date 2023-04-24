import * as THREE from 'three';
import { ThreeJsClientAdapter } from '../ThreeJsClientAdapter';

export class ThreeHelper {
  static removeAllChildren(group: THREE.Group | THREE.Scene) {
    while (group.children.length) {
      this.deleteGroupOrMesh(group.children[0] as THREE.Group | THREE.Mesh);
    }
  }

  /**
   * Safe delete GroupOrMesh
   * @param group
   */
  static deleteGroupOrMesh(group: THREE.Group | THREE.Mesh) {
    if ((group as THREE.Group).isGroup) {
      this.removeAllChildren(group as THREE.Group);
      group?.parent?.remove(group);
    } else {
      this.disposeMesh(group as THREE.Mesh);
    }
  }

  static disposeMaterial(material: THREE.Material) {
    if (!material) return;

    if ('map' in material && material.map instanceof ThreeJsClientAdapter.USER_THREE.Texture) {
      material.map.dispose();
    }
    material.dispose();
  }

  /**
   * Safe Delete Mesh & Remove from parent
   * @param mesh
   */
  static disposeMesh(mesh: THREE.Mesh) {
    if (!mesh) return;

    mesh.geometry?.dispose();

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(item => this.disposeMaterial(item));
    } else {
      this.disposeMaterial(mesh.material);
    }

    mesh.parent?.remove(mesh);
  }
}
