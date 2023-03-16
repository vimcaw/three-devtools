/**
 * This script injected by the installed three.js developer tools extension.
 * https://github.com/vimcaw/three-devtools
 */
import {
  isThreeJsClientEvent,
  THREE_DEVTOOLS_FORWARD_EVENT_TYPE,
  THREE_DEVTOOLS_READY_EVENT_TYPE,
  ThreeJsClientInfo,
} from '../types';

class DevToolsEvent extends EventTarget {
  constructor() {
    super();
    this.addEventListener(
      THREE_DEVTOOLS_READY_EVENT_TYPE,
      () => {
        this.isDevToolsReady = true;
        this.backlog.forEach(event => this.dispatchEvent(event));
      },
      { once: true }
    );
  }

  isDevToolsReady = false;

  backlog: Event[] = [];

  threeJsClientInfo: ThreeJsClientInfo | null = null;

  // eslint-disable-next-line class-methods-use-this
  dispatchEvent(event: Event) {
    if (!isThreeJsClientEvent(event)) {
      super.dispatchEvent(event);
      return true;
    }
    if (this.isDevToolsReady) {
      super.dispatchEvent(event);
      if (isThreeJsClientEvent(event)) {
        super.dispatchEvent(new CustomEvent(THREE_DEVTOOLS_FORWARD_EVENT_TYPE, { detail: event }));
      }
    } else {
      this.backlog.push(event);
    }
    return true;
  }
}

declare global {
  interface Window {
    __THREE_DEVTOOLS__: DevToolsEvent;
  }
}

// The __THREE_DEVTOOLS__ is small and light-weight, and collects
// events triggered until the devtools panel is ready, which is when
// the events are flushed.

// eslint-disable-next-line no-underscore-dangle
window.__THREE_DEVTOOLS__ = new DevToolsEvent();

export {};
