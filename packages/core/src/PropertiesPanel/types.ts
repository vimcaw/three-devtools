import type { Object3D } from 'three';

export type Object3DWithOnBeforeRenderFlag = Object3D & {
  onBeforeRenderFlag: boolean;
  onBeforeRenderCopy?: Object3D['onBeforeRender'];
};

export function isObject3DWithOnBeforeRenderFlag(
  object: unknown
): object is Object3DWithOnBeforeRenderFlag {
  return (
    typeof object === 'object' &&
    object !== null &&
    (object as Object3DWithOnBeforeRenderFlag).onBeforeRenderFlag !== undefined
  );
}
