import { proxy, useSnapshot } from 'valtio';
import DevtoolsPort from '../DevtoolsPort';

const CONNECTING_TIMEOUT_BY_MS = 3 * 1000;

export enum ConnectionStatus {
  Connecting = 'Connecting',
  Connected = 'Connected',
  NotConnected = 'NotConnected',
}

export const threeJsData = proxy({
  status: ConnectionStatus.Connecting,
  revision: null as string | null,
});

// subscribe to the port
const devtoolsPort = new DevtoolsPort();
devtoolsPort.onConnectionStart = () => {
  threeJsData.status = ConnectionStatus.Connecting;
  threeJsData.revision = null;
};
devtoolsPort.onPageCompletelyLoaded = () => {
  if (threeJsData.status !== ConnectionStatus.Connecting) return;
  setTimeout(() => {
    // if the status is still connecting, then we should set it to not connected
    if (threeJsData.status === ConnectionStatus.Connecting) {
      threeJsData.status = ConnectionStatus.NotConnected;
      threeJsData.revision = null;
    }
  }, CONNECTING_TIMEOUT_BY_MS);
};
devtoolsPort.onConnected = threeJsInfo => {
  threeJsData.status = ConnectionStatus.Connected;
  threeJsData.revision = threeJsInfo.revision;
};
devtoolsPort.onDisconnect = () => {
  threeJsData.status = ConnectionStatus.Connecting;
  threeJsData.revision = null;
};

export function useThreeJsData() {
  return useSnapshot(threeJsData);
}
