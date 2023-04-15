import mitt from 'mitt';
import type * as THREE from 'three';

export class ThreeJsClientAdapter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static #instance?: ThreeJsClientAdapter;

  static get instance() {
    if (!ThreeJsClientAdapter.#instance) {
      ThreeJsClientAdapter.#instance = new ThreeJsClientAdapter();
    }
    return ThreeJsClientAdapter.#instance!;
  }

  static USER_THREE: THREE;

  emitter = mitt<{
    connected: { version: string };
    observer: { target: THREE.Object3D | THREE.Renderer };
    disconnected: void;
    error: void;
  }>();

  on = this.emitter.on.bind(this.emitter);

  emit = this.emitter.emit.bind(this.emitter);
}
