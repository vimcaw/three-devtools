import type { Object3D, Renderer } from 'three';

export interface ThreeJsClientRegisterEvent extends Event {
  type: 'register';
  detail: { revision: string };
}

export type ThreeJSClientObserveDetail = Object3D | Renderer;

export interface ThreeJsClientObserveEvent extends Event {
  type: 'observe';
  detail: ThreeJSClientObserveDetail;
}

export type ThreeJsClientEvent = ThreeJsClientRegisterEvent | ThreeJsClientObserveEvent;

export const threeJsClientEventTypes = ['register', 'observe'];

export function isThreeJsClientEvent(event: unknown): event is ThreeJsClientEvent {
  return (
    typeof event === 'object' &&
    event !== null &&
    'detail' in event &&
    'type' in event &&
    typeof event.type === 'string' &&
    threeJsClientEventTypes.includes(event.type)
  );
}
