import browser from 'webextension-polyfill';
import type { StorageAdapter, ThreeJsClientAdapter } from 'core';
import {
  ConnectDevtoolsMessage,
  InitThreeJsBridgeMessage,
  PageNavigationStartMessage,
  PageLoadedMessage,
  ThreeJsRegisteredMessage,
  ThreeJsResumeMessage,
} from '../messages';
import { PortName } from '../types';
import { deserializeMessage } from '../utils';

export class DevtoolsPort extends EventTarget {
  private constructor() {
    super();
  }

  static #instance?: DevtoolsPort;

  static get instance() {
    if (!DevtoolsPort.#instance) {
      DevtoolsPort.#instance = new DevtoolsPort();
    }
    return DevtoolsPort.#instance!;
  }

  connectToDevtoolsApp(storageAdapter: StorageAdapter, threeJsClientAdapter: ThreeJsClientAdapter) {
    storageAdapter.initialize({
      getItem: key => browser.storage.sync.get(key).then(data => data[key]),
      setItem: (key, value) => browser.storage.sync.set({ [key]: value }),
      removeItem: key => browser.storage.sync.remove(key),
      clear: () => browser.storage.sync.clear(),
    });
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync') {
        Object.entries(changes).forEach(([key, { oldValue, newValue }]) => {
          storageAdapter.emitter.emit('changed', { key, oldValue, newValue });
        });
      }
    });

    // Because the connection event from devtool is not a tabId field,
    // so we need to send it to the background port manually.
    this.initializeConnection();
    this.port.onMessage.addListener(rawMessage => {
      const message = deserializeMessage(rawMessage);
      if (!message) return;
      if (message instanceof PageNavigationStartMessage) {
        threeJsClientAdapter.emit('disconnected');
      } else if (message instanceof PageLoadedMessage) {
        this.initializeConnection();
      } else if (message instanceof ThreeJsResumeMessage) {
        threeJsClientAdapter.emit('connected', {
          version: `r${message.threeJsClientInfo.revision}`,
        });
      } else if (message instanceof ThreeJsRegisteredMessage) {
        threeJsClientAdapter.emit('connected', { version: `r${message.revision}` });
      }
    });
  }

  port = browser.runtime.connect({ name: PortName.Devtools });

  initializeConnection() {
    this.port.postMessage(new ConnectDevtoolsMessage(browser.devtools.inspectedWindow.tabId));
    this.port.postMessage(new InitThreeJsBridgeMessage());
  }
}
