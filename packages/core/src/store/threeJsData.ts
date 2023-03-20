import { proxy, useSnapshot } from 'valtio';
import { ThreeJsClientAdapter } from '../ThreeJsClientAdapter';

export enum ConnectionStatus {
  Connected = 'Connected',
  NotConnected = 'NotConnected',
}

export const threeJsData = proxy({
  status: ConnectionStatus.NotConnected,
  version: null as string | null,
});

ThreeJsClientAdapter.instance.on('connected', ({ version }) => {
  threeJsData.status = ConnectionStatus.Connected;
  threeJsData.version = version;
});

ThreeJsClientAdapter.instance.on('observer', ({ target }) => {
  threeJsData.status = ConnectionStatus.Connected;
  // TODO sort the target
  console.log(target);
});

ThreeJsClientAdapter.instance.on('disconnected', () => {
  threeJsData.status = ConnectionStatus.NotConnected;
  threeJsData.version = null;
});

ThreeJsClientAdapter.instance.on('error', () => {
  threeJsData.status = ConnectionStatus.NotConnected;
  threeJsData.version = null;
});

export function useThreeJsData() {
  return useSnapshot(threeJsData);
}
