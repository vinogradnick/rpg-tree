import { Scene, Vector3 } from 'three';
import { Behavor } from '../engine/core/behavor';
import Hero from '../objects/hero.object';

export default class PlayerMovement extends Behavor<Hero> {
  constructor() {
    super('PlayerMovement');
  }

  handleMove = (ev: KeyboardEvent) => {
    if (ev.key === 'w') {
      this.emitter('onMove', new Vector3(0, 0, -0.5));
    }
    if (ev.key === 's') this.emitter('onMove', new Vector3(0, 0, 0.5));
    if (ev.key === 'a') {
      this.emitter('onMove', new Vector3(0.5, 0, 0));
    }
    if (ev.key === 'd') {
      this.emitter('onMove', new Vector3(-0.5, 0, 0));
    }
  };
  mount(): void {
    window.addEventListener('keypress', this.handleMove);
  }
}
