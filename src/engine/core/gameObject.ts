// Слушает события

import { Object3D } from 'three';
import { IEvent } from './types';

//
export class GameObject<T extends Object3D = any> {
  name: string;
  mesh!: T;

  constructor(name: string) {
    this.name = name;
  }

  onUpdate(eventData: IEvent<keyof GameObject<T>>) {
    console.log(eventData);
  }
  get events(): Array<keyof this> {
    const events = [];

    for (const fn in this) {
      if (fn.startsWith('on')) events.push(fn);
    }
    return events;
  }
}
