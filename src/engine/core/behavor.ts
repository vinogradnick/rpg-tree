import { Scene } from 'three';
import { IBehavor, IEvent, IEventHandler } from './types';

/**
 * Behavor class
 * используется для определений поведения
 * генерирует события
 */
export class Behavor<T = any> implements IBehavor {
  name: string;
  emitter!: IEventHandler<keyof T>;
  constructor(name: string) {
    this.name = name;
  }
  update(scene: Scene): void {
    throw new Error('Method not implemented.');
  }
  mount?(): void {
    throw new Error('Method not implemented.');
  }
  dispose?(): void {
    throw new Error('Method not implemented.');
  }
}
