import { Event, Object3D, Scene } from 'three';
import { GameObject } from './gameObject';

export function createGameObject<TMesh extends Object3D<Event>>(
  name: string,
  mesh: TMesh
) {
  return class extends GameObject {
    static objectName = name;

    mesh = mesh;

    load(scene: Scene) {
      scene.add(this.mesh);
    }
  };
}
