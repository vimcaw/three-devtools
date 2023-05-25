import { ref } from 'valtio';
import type { Object3D, Renderer, Scene, Mesh, WebGLRenderer } from 'three';
import { matchThreeJsObject } from 'shared';
import { ThreeJsClientAdapter } from '../ThreeJsClientAdapter';
import { Observer } from '../ObserverLayer/Observer';
import { Picker } from '../Drawer/Picker';
import { MaterialEditor } from '../Drawer/MaterialEditor';

export enum ConnectionStatus {
  Connected = 'Connected',
  NotConnected = 'NotConnected',
}

export const threeJsData = {
  status: ConnectionStatus.NotConnected,
  version: null as string | null,
  renderers: [] as Renderer[],
  scenes: [] as Scene[],
  activeRenderer: null as WebGLRenderer | null,
  activeScene: null as Scene | null,
  selectedObject: null as Object3D | null,
};

export const observerLayer = new Observer();
export const picker = new Picker();
export const materialEditor = new MaterialEditor();

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

      materialEditor.initCtx(renderer);
    },
    onMatchScene: scene => {
      threeJsData.scenes.push(ref(scene));
      threeJsData.activeScene = ref(scene);

      observerLayer.addScene(scene);
      picker.init(scene);
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

  if (object) picker.highlight(object as Mesh);
}

/**
 * switch active scene
 */
export function switchScene() {
  if (threeJsData.scenes.length > 1) {
    const index = threeJsData.scenes.findIndex(scene => scene === threeJsData.activeScene);
    // make index in the range of [0, threeJsData.scenes.length - 1]
    const nextIndex = (index + 1) % threeJsData.scenes.length;
    threeJsData.activeScene = threeJsData.scenes[nextIndex];
    observerLayer.refreshUI();
  }
}
