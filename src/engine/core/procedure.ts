import { Scene } from 'three';
import { IObjectComposer } from './types';

export class Procedure<T = any> implements IObjectComposer {
  type!: string;

  name!: string;
  options!: T[];

  mount(scene: Scene) {
    console.log('executed :', this.name);
  }
}
