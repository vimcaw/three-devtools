import { ref } from 'valtio';
import type { Object3D, Renderer, Scene, Mesh, WebGLRenderer } from 'three';
import { matchThreeJsObject } from 'shared';
import { ThreeJsClientAdapter } from '../ThreeJsClientAdapter';
import { Observer } from '../ObserverLayer/Observer';
import { Picker } from '../Drawer/Picker';
import { MaterialEditor } from '../Drawer/MaterialEditor';
import { TextureViewer } from '../Drawer/TextureViewer';

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
export const textureViewer = new TextureViewer();

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
      textureViewer.initCtx(renderer);
    },
    onMatchScene: scene => {
      threeJsData.scenes.push(ref(scene));

      // TODO room environment
      if (!threeJsData.activeScene) {
        threeJsData.activeScene = ref(scene);
      }

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
