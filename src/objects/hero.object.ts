import { Group, PerspectiveCamera, Vector3 } from 'three';
import { GameObject } from '../engine/core/gameObject';
import { loadFbxModel } from '../engine/loaders/resource.loader';

export default class Hero extends GameObject<Group> {
  camera: PerspectiveCamera;
  constructor() {
    super(Hero.name);
    loadFbxModel({ geometry: '/assets/Maid/Maid.fbx', texture: '' }).then(
      (model) => {
        this.mesh = model;
      }
    );
    this.camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.3,
      150
    );
    this.camera.position.set(0, 2, 3);
  }

  onMove = (data: Vector3) => {
    this.mesh.translateZ(0.05);
  };
}
