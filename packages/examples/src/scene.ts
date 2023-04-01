import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  HemisphereLight,
} from 'three';

export class DefaultScene {
  constructor() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 5;
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ color: 0xffffff });
    const light = new HemisphereLight(0xffffff, 0x000000, 1);
    light.position.set(5, 5, 5);
    this.cube = new Mesh(geometry, material)

    for (let i = 0; i < 5; i ++) {
      const m = new Mesh(geometry, material);
      m.position.set(i, i, i);
      this.scene.add(m)
    }

    this.scene.add(this.cube);
    this.scene.add(light);
    this.onResize = this.onResize.bind(this);
  }

  private readonly scene = new Scene();

  private readonly camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  private renderer = new WebGLRenderer();

  private readonly cube: Mesh;

  private container?: HTMLElement;

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  mount(container: HTMLElement) {
    this.container = container;
    container.appendChild(this.renderer.domElement);
    this.animate();
    window.addEventListener('resize', this.onResize, false);
  }

  unmount() {
    window.removeEventListener('resize', this.onResize, false);
    if (!this.container) return;
    this.container.removeChild(this.renderer.domElement);
  }
}
