import {
  isThreeJsClientEvent,
  THREE_DEVTOOLS_FORWARD_EVENT_TYPE,
  THREE_DEVTOOLS_READY_EVENT_TYPE,
  THREE_DEVTOOLS_RESUME_EVENT_TYPE,
} from '../types';
import { ThreeJsRegisteredMessage, ThreeJsResumeMessage } from '../messages';

/* eslint-disable no-underscore-dangle */

window.__THREE_DEVTOOLS__.addEventListener(THREE_DEVTOOLS_RESUME_EVENT_TYPE, event => {
  if (!(event instanceof CustomEvent && window.__THREE_DEVTOOLS__.threeJsClientInfo)) return;
  // Resume the devtools panel data
  window.postMessage(new ThreeJsResumeMessage(window.__THREE_DEVTOOLS__.threeJsClientInfo), '*');
});

window.__THREE_DEVTOOLS__.addEventListener(THREE_DEVTOOLS_FORWARD_EVENT_TYPE, event => {
  if (!(event instanceof CustomEvent && isThreeJsClientEvent(event.detail))) return;
  const threeJsClientEvent = event.detail;
  if (threeJsClientEvent.type === 'register') {
    window.__THREE_DEVTOOLS__.threeJsClientInfo = threeJsClientEvent.detail;
    window.postMessage(new ThreeJsRegisteredMessage(threeJsClientEvent.detail.revision), '*');
  }
});

window.__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(THREE_DEVTOOLS_READY_EVENT_TYPE));

export {};
