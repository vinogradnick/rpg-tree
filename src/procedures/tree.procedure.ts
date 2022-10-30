import { Group, Object3D, Scene } from 'three';
import { GameObject } from '../engine/core/gameObject';
import { Procedure } from '../engine/core/procedure';
import { getRandomArbitrary } from '../engine/utils/random';

export default class TreeProcedure extends Procedure<GameObject<Object3D>> {
  constructor() {
    super();
    this.name = TreeProcedure.name;
  }
  action(scene: Scene) {
    for (const { mesh } of this.options) {
      for (let i = 0; i < 25; i++) {
        const tree = mesh.clone();

        tree.position.x += getRandomArbitrary(-100, 100);
        tree.position.z += getRandomArbitrary(-100, 100);

        scene.add(tree);
      }
    }
  }
  mount(scene: Scene): void {
    this.action(scene);
    super.mount(scene);
  }
}
