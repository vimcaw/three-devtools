import browser from 'webextension-polyfill';
import {
  ConnectDevtoolsMessage,
  InitThreeJsBridgeMessage,
  PageReloadMessage,
  ThreeJsRegisteredMessage,
  ThreeJsResumeMessage,
} from '../messages';
import { PortName } from '../types';
import { deserializeMessage } from '../utils';

export default class DevtoolsPort extends EventTarget {
  constructor() {
    super();
    // Because the connection event from devtool is not a tabId field,
    // so we need to send it to the background port manually.
    this.initializeConnection();
    this.port.onMessage.addListener(rawMessage => {
      const message = deserializeMessage(rawMessage);
      if (!message) return;
      if (message instanceof PageReloadMessage) {
        this.onDisconnect?.();
        this.initializeConnection();
      } else if (message instanceof ThreeJsResumeMessage) {
        this.onConnected?.(message.threeJsClientInfo);
      } else if (message instanceof ThreeJsRegisteredMessage) {
        this.onConnected?.(message);
      }
    });
  }

  port = browser.runtime.connect({ name: PortName.Devtools });

  onDisconnect?: () => void;

  onConnected?: (threeJsInfo: { revision: string }) => void;

  initializeConnection() {
    this.port.postMessage(new ConnectDevtoolsMessage(browser.devtools.inspectedWindow.tabId));
    this.port.postMessage(new InitThreeJsBridgeMessage());
  }
}
