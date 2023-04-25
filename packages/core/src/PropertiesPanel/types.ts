import type { Object3D } from 'three';

export type Object3DWithOnBeforeRenderFlag = Object3D & {
  onBeforeRenderFlag?: boolean;
  onBeforeRenderCopy?: Object3D['onBeforeRender'];
};
