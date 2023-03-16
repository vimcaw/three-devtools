import browser from 'webextension-polyfill';
import { PortName } from './types';
import { InitThreeJsBridgeMessage } from './messages';
import { deserializeMessage } from './utils';

function injectScript(url: string) {
  const script = document.createElement('script');
  script.src = browser.runtime.getURL(url);
  script.onload = () => {
    script.parentNode!.removeChild(script);
  };
  (document.head || document.documentElement).appendChild(script);
}

injectScript('src/injectedScript/prior.js');

const port = browser.runtime.connect({ name: PortName.ContentScript });

let hasInjectedClientBridge = false;

port.onMessage.addListener(rawMessage => {
  const message = deserializeMessage(rawMessage);
  if (!message) return;
  if (message instanceof InitThreeJsBridgeMessage) {
    if (!hasInjectedClientBridge) {
      injectScript('src/injectedScript/clientBridge.js');
      hasInjectedClientBridge = true;
    } else {
      injectScript('src/injectedScript/resumeDevtools.js');
    }
  }
});

window.addEventListener('message', event => {
  const message = deserializeMessage(event.data);
  if (!message) return;
  port.postMessage(message);
});

export {};
