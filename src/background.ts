import browser from 'webextension-polyfill';
import type { Runtime } from 'webextension-polyfill';
import {
  ConnectDevtoolsMessage,
  Message,
  PageCompletelyLoadedMessage,
  PageNavigationStartMessage,
  PageLoadedMessage,
} from './messages';
import { PortName } from './types';
import { deserializeMessage } from './utils';

class PortManger {
  private static portsByTabId = new Map<number, Map<PortName, Runtime.Port>>();

  static connect(port: Runtime.Port, tabId = port.sender?.tab?.id) {
    if (!tabId) {
      throw new Error('TabId not found');
    }
    if (!this.portsByTabId.has(tabId)) {
      this.portsByTabId.set(tabId, new Map());
    }
    this.portsByTabId.get(tabId)!.set(port.name as PortName, port);
  }

  static disconnect(tabId: number, name: PortName) {
    this.portsByTabId.get(tabId)?.delete(name);
  }

  static postMessage(
    tabId: number,
    name: PortName,
    message: Message,
    { ignoreError = false }: { ignoreError?: boolean } = {}
  ) {
    const port = this.portsByTabId.get(tabId)?.get(name);
    if (port) {
      port.postMessage(message);
    } else if (!ignoreError) {
      throw new Error(`${name} Port not found at tab ${tabId}`);
    }
  }
}

/**
 * When opening the three-devtools panel, store
 * a connection to communicate later.
 */
browser.runtime.onConnect.addListener(port => {
  const portName: PortName = port.name as PortName;
  let tabId: number;

  if (port.sender?.tab?.id) {
    tabId = port.sender.tab.id;
    PortManger.connect(port);
  }

  const onMessage: Parameters<typeof port.onMessage.addListener>[0] = (rawMessage: unknown) => {
    const message = deserializeMessage(rawMessage);
    if (!message) return;
    if (message instanceof ConnectDevtoolsMessage) {
      tabId = message.tabId;
      PortManger.connect(port, message.tabId);
    }
    if (!tabId) return;

    // Forward message to the other side
    if (port.name === PortName.ContentScript) {
      PortManger.postMessage(tabId, PortName.Devtools, message);
    } else if (port.name === PortName.Devtools) {
      PortManger.postMessage(tabId, PortName.ContentScript, message);
    }
  };

  port.onMessage.addListener(onMessage);

  port.onDisconnect.addListener(targetPort => {
    targetPort.onMessage.removeListener(onMessage);
    PortManger.disconnect(tabId, portName);
  });
});

browser.webNavigation.onCommitted.addListener(({ tabId, frameId }) => {
  // Only support top-level frame for now
  if (frameId !== 0 || !tabId) {
    return;
  }
  PortManger.postMessage(tabId, PortName.Devtools, new PageNavigationStartMessage(), {
    ignoreError: true,
  });
});

/**
 * When a page has reloaded, if three-devtools are open, notify
 * the devtools panel, so it can inject the content-side of the tools.
 */
browser.webNavigation.onDOMContentLoaded.addListener(({ tabId, frameId }) => {
  // Only support top-level frame for now
  if (frameId !== 0 || !tabId) {
    return;
  }
  PortManger.postMessage(tabId, PortName.Devtools, new PageLoadedMessage(), {
    ignoreError: true,
  });
});

browser.webNavigation.onCompleted.addListener(({ tabId, frameId }) => {
  // Only support top-level frame for now
  if (frameId !== 0 || !tabId) {
    return;
  }
  PortManger.postMessage(tabId, PortName.Devtools, new PageCompletelyLoadedMessage(), {
    ignoreError: true,
  });
});
