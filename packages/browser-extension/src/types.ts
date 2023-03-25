import { isThreeJsClientEvent, ThreeJSClientObserveDetail } from 'shared';

export enum PortName {
  ContentScript = 'ContentScript',
  Devtools = 'Devtools',
  Popup = 'Popup',
}

export const THREE_DEVTOOLS_READY_EVENT_TYPE = '__THREE_DEVTOOLS_READY__';
export const THREE_DEVTOOLS_FORWARD_EVENT_TYPE = '__THREE_DEVTOOLS_FORWARD__';
export const THREE_DEVTOOLS_RESUME_EVENT_TYPE = '__THREE_DEVTOOLS_RESUME__';

export interface ThreeJsClientInfo {
  revision: string;
}

export { isThreeJsClientEvent };
export type { ThreeJSClientObserveDetail };
