import type { ThreeJsClientAdapter } from 'core';
import { isThreeJsClientEvent } from 'shared';

class DevToolsEvent extends EventTarget {
  constructor(private threeJsClientAdapter: ThreeJsClientAdapter) {
    super();
  }

  // eslint-disable-next-line class-methods-use-this
  dispatchEvent(event: Event) {
    if (!isThreeJsClientEvent(event)) {
      super.dispatchEvent(event);
      return true;
    }
    if (event.type === 'register') {
      this.threeJsClientAdapter.emit('connected', { version: event.detail.revision });
    } else if (event.type === 'observe') {
      this.threeJsClientAdapter.emit('observer', { target: event.detail });
    }

    return true;
  }
}

declare global {
  interface Window {
    __THREE_DEVTOOLS__: DevToolsEvent;
  }
}

export function initializeThreeJsClientAdapter(threeJsClientAdapter: ThreeJsClientAdapter) {
  // The __THREE_DEVTOOLS__ is small and light-weight, and collects
  // events triggered until the devtools panel is ready, which is when
  // the events are flushed.

  // eslint-disable-next-line no-underscore-dangle
  window.__THREE_DEVTOOLS__ = new DevToolsEvent(threeJsClientAdapter);
}
