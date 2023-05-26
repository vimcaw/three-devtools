import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  HemisphereLight,
} from 'three';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export class DefaultScene {
  constructor() {}

  init() {
    this.mixer = null;

    this.clock = new THREE.Clock();
    this.container = document.getElementById('container');

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbfe3dd);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
    this.camera.position.set(5, 2, 8);

    const controls = (this.controls = new OrbitControls(this.camera, this.renderer.domElement));
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://threejs.org/examples/jsm/libs/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      'https://threejs.org/examples/models/gltf/LittlestTokyo.glb',
      gltf => {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        this.scene.add(model);

        this.mixer = new THREE.AnimationMixer(model);
        this.mixer.clipAction(gltf.animations[0]).play();
        this.animate();
      },
      undefined,
      e => {
        console.error(e);
      }
    );
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();

    this.mixer.update(delta);
    this.controls.update();
    this.stats.update();

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  mount(container: HTMLElement) {
    this.container = container;
    this.stats = new Stats();
    container.appendChild(this.stats.dom);
    this.init();
    window.addEventListener('resize', this.onResize.bind(this), false);
    container.appendChild(this.renderer.domElement);
  }

  unmount() {
    window.removeEventListener('resize', this.onResize, false);
    if (!this.container) return;
    this.container.removeChild(this.renderer.domElement);
  }
}
