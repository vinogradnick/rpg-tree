import { GUI } from 'dat.gui';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { createContext, GameContext } from './context';
import { createHemisphereLight } from './effects/light.effect';
import { loader } from './loaders';
import Stats from 'three/examples/jsm/libs/stats.module';
import { IObjectComposer } from './core/types';

export class Renderer {
  _renderer: WebGLRenderer;
  scene: Scene;

  context: GameContext;
  store!: Record<string, IObjectComposer>;
  gui: GUI;
  controls: OrbitControls | undefined;
  stats: Stats;

  constructor() {
    this._renderer = new WebGLRenderer({
      alpha: true,
      powerPreference: 'high-performance',
    });
    this._renderer.shadowMap.enabled = true;
    this.gui = new GUI();
    this.stats = new Stats();

    this.scene = new Scene();

    this.context = createContext(this.scene);
  }

  //TODO: rewrtie
  initScene() {
    const hlight = createHemisphereLight();

    this.scene.add(hlight);
  }

  //TODO: rewrtie
  async init() {
    this.initScene();

    this.store = await loader();

    for (const compose of Object.values(this.store)) {
      compose.mount(this.scene);
    }

    if (this._renderer) {
      this._renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this._renderer.domElement);
    }
    this.render();
  }

  updateStore() {
    for (let compose of Object.values(this.store)) {
      compose.update?.(this.scene);
    }
  }
  //TODO: rewrtie

  render() {
    document.body.appendChild(this.stats.dom);

    const heroCamera = this.store['hero'].object.camera as PerspectiveCamera;
    const controls = new OrbitControls(heroCamera, this._renderer.domElement);

    const loop = () => {
      requestAnimationFrame(loop);

      this.controls?.update();
      this.stats.update();
      this.updateStore();
      heroCamera.updateProjectionMatrix();
      controls.update();

      this._renderer.render(this.scene, heroCamera);
    };
    loop();
  }
}
