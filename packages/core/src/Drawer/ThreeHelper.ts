export class ThreeHelper {

  static removeAllChildren (group: THREE.Group | THREE.Scene) {
    while (group.children.length) {
      this.deleteGroupOrMesh(group.children[0])
    }
  }

  /**
   * Safe delete GroupOrMesh
   * @param group
   */
  static deleteGroupOrMesh (group) {
    if ((group as THREE.Group).isGroup) {
      this.removeAllChildren(group as THREE.Group)
      group?.parent?.remove(group)
    } else {
      this.disposeMesh(group as THREE.Mesh)
    }
  }

  static disposeMaterial (material) {
    if (!material) return

    material.map && material.map.dispose()
    material.dispose()
  }

  /**
   * Safe Delete Mesh & Remove from parent
   * @param mesh
   */
  static disposeMesh (mesh: THREE.Mesh | any) {
    if (!mesh) return

    mesh.geometry && mesh.geometry.dispose()

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(item => this.disposeMaterial(item))
    } else {
      this.disposeMaterial(mesh.material)
    }

    mesh.parent && mesh.parent.remove(mesh)
  }
}
