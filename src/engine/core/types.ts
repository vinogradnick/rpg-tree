import { Scene } from 'three';

export interface IGameObject {
  load: (scene: Scene) => void;
}
export interface IBehavor {
  update(scene: Scene): void;
  mount?(): void;
  dispose?(): void;
}

export interface IObjectComposer {
  type: string;
  mount(scene: Scene): void;
  dispose?(): void;

  update?(scene: Scene): void;
}
export interface Resource {
  texture: string;
  geometry: string;
}

export interface LoaderInfo {
  type?: string;
  name: string;
  scripts?: Array<string>;
  object?: Resource;
  objects?: Array<string | Resource>;
}

export const EntityType = {
  procedure: 'procedure',
  object: 'object',
  entity: 'entity',
};

export interface IEvent<T, TData = any> {
  type: keyof T;
  data: TData;
}

export interface IEventHandler<T, TData = any> {
  (type: T, data: TData): void;
}
