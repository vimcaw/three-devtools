import { proxy, ref, useSnapshot } from 'valtio';
import type { Object3D, Renderer, Scene } from 'three';
import { matchThreeJsObject } from 'shared';
import { ThreeJsClientAdapter } from '../ThreeJsClientAdapter';
import {Observer} from "../ObserverLayer/Observer";
import {Picker} from "../Drawer/Picker";

export enum ConnectionStatus {
  Connected = 'Connected',
  NotConnected = 'NotConnected',
}

export const threeJsData = {
  status: ConnectionStatus.NotConnected,
  version: null as string | null,
  renderers: [] as Renderer[],
  scenes: [] as Scene[],
  activeRenderer: null as Renderer | null,
  activeScene: null as Scene | null,
  selectedObject: null as Object3D | null,
};

export const observerLayer = new Observer()
export const picker = new Picker()

ThreeJsClientAdapter.instance.on('connected', ({ version }) => {
  threeJsData.status = ConnectionStatus.Connected;
  threeJsData.version = version;
});

ThreeJsClientAdapter.instance.on('observer', ({ target }) => {
  threeJsData.status = ConnectionStatus.Connected;
  matchThreeJsObject(target, {
    onMatchRenderer: renderer => {
      threeJsData.renderers.push(ref(renderer));
      threeJsData.activeRenderer = ref(renderer);
    },
    onMatchScene: scene => {
      threeJsData.scenes.push(ref(scene));
      threeJsData.activeScene = ref(scene);
      observerLayer.addScene(scene)
      picker.init(scene)
    },
  });
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
  return threeJsData;
}

export function setSelectedObject(object: Object3D | null) {
  threeJsData.selectedObject = object;

  picker.highlight(object)
}
