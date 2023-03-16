import type { Object3D, Renderer } from 'three';

export enum PortName {
  ContentScript = 'ContentScript',
  Devtools = 'Devtools',
  Popup = 'Popup',
}

export interface ThreeJsClientRegisterEvent extends Event {
  type: 'register';
  detail: { revision: string };
}

export type ThreeJSClientObserveDetail = Object3D | Renderer;

export interface ThreeJsClientObserveEvent extends Event {
  type: 'observe';
  detail: ThreeJSClientObserveDetail;
}

export const THREE_DEVTOOLS_READY_EVENT_TYPE = '__THREE_DEVTOOLS_READY__';
export const THREE_DEVTOOLS_FORWARD_EVENT_TYPE = '__THREE_DEVTOOLS_FORWARD__';
export const THREE_DEVTOOLS_RESUME_EVENT_TYPE = '__THREE_DEVTOOLS_RESUME__';

export interface ThreeJsDevtoolsReadyEvent extends Event {
  type: typeof THREE_DEVTOOLS_READY_EVENT_TYPE;
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

export interface ThreeJsClientInfo {
  revision: string;
}
