import { Scene } from 'three';

export interface GameContext {
  scene: Scene;
}

export function createContext(scene: any): GameContext {
  const _ctx = { scene };

  return _ctx;
}
