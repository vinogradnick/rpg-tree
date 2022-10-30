import { Scene } from 'three';
import { EventEmitter } from '../utils/eventEmitter';
import { Behavor } from './behavor';
import { GameObject } from './gameObject';
import { EntityType, IObjectComposer } from './types';

export class ObjectComposer implements IObjectComposer {
  object!: GameObject;
  type!: string;
  scripts!: Behavor[];
  _eventEmitter: EventEmitter;
  constructor() {
    this._eventEmitter = new EventEmitter();
  }
  dispose(): void {}
  set setObject(obj: GameObject) {
    this.object = obj;
  }
  set setScripts(scripts: Behavor[]) {
    this.scripts = scripts;
  }
  mountObject() {
    if (this.object) {
      for (const onEvent of this.object.events) {
        this._eventEmitter.addListener(onEvent, this.object[onEvent]);
        console.log('bind_event:' + onEvent);
      }
    }
  }
  mountScripts() {
    if (!this.scripts) {
      return;
    }
    for (const script of this.scripts) {
      script.emitter = this._eventEmitter.emit;

      script.mount?.();
      console.log('mount_script:', script.name);
    }
  }

  mount(scene: Scene) {
    console.group(`mount:${this.object.name}`);
    this.mountObject();
    this.mountScripts();

    console.groupEnd();
    if (this.object.mesh) scene.add(this.object.mesh);
  }
}
