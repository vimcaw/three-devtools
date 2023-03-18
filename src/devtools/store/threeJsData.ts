import { proxy, useSnapshot } from 'valtio';
import DevtoolsPort from '../DevtoolsPort';

export const threeJsData = proxy<{
  revision: string | null;
}>({
  revision: null,
});

const devtoolsPort = new DevtoolsPort();
devtoolsPort.onConnected = threeJsInfo => {
  threeJsData.revision = threeJsInfo.revision;
};
devtoolsPort.onDisconnect = () => {
  threeJsData.revision = null;
};

export function useThreeJsData() {
  return useSnapshot(threeJsData);
}
