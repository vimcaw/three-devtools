/* eslint-disable max-classes-per-file */
import { ThreeJsClientInfo, ThreeJSClientObserveDetail } from './types';

export abstract class Message {
  type = 'Message';

  timestamp = Date.now();
}

export class ConnectDevtoolsMessage extends Message {
  constructor(public tabId: number) {
    super();
  }

  type = 'ConnectDevtoolsMessage';
}

export class InitThreeJsBridgeMessage extends Message {
  type = 'InitThreeJsBridgeMessage';
}

export class PageNavigationStartMessage extends Message {
  type = 'PageNavigationStartMessage';
}

export class PageLoadedMessage extends Message {
  type = 'PageLoadedMessage';
}

export class PageCompletelyLoadedMessage extends Message {
  type = 'PageCompletelyLoadedMessage';
}

export class ThreeJsResumeMessage extends Message {
  constructor(public threeJsClientInfo: ThreeJsClientInfo) {
    super();
  }

  type = 'ThreeJsResumeMessage';
}

export class ThreeJsRegisteredMessage extends Message {
  constructor(public revision: string) {
    super();
  }

  type = 'ThreeJsRegisteredMessage';
}

export class ThreeJsObserveMessage extends Message {
  constructor(public object: ThreeJSClientObserveDetail) {
    super();
  }

  type = 'ThreeJsObserveMessage';
}
