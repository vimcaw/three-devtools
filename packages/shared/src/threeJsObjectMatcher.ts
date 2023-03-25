import { match, P } from 'ts-pattern';
import { Object3D, Renderer, Scene, WebGLRenderer } from 'three';

export function matchThreeJsObject<TOut = unknown>(
  object: unknown,
  {
    onMatchRenderer,
    onMatchScene,
    onMatchObject3D,
  }: {
    onMatchScene?: (scene: Scene) => TOut;
    onMatchRenderer?: (renderer: Renderer) => TOut;
    onMatchObject3D?: (object: Object3D) => TOut;
  }
): TOut {
  return match(object)
    .with({ render: P.when(render => typeof render === 'function') }, renderer =>
      onMatchRenderer?.(renderer as WebGLRenderer)
    )
    .with({ isScene: true }, scene => onMatchScene?.(scene as Scene))
    .with({ isObject3D: true }, object3D => onMatchObject3D?.(object3D as Object3D))
    .run() as TOut;
}
