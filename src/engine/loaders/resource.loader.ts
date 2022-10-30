import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Resource } from '../core/types';

THREE.Cache.enabled = true;

const typeLoader: Record<string, (resource: any) => Promise<THREE.Group>> = {
  fbx: loadFbxModel,
  obj: loadObjModel,
};

function getFileType(name: string) {
  return name.split('.').pop();
}

export async function loadFbxModel(resource: Resource) {
  const objLoader = new FBXLoader();

  const mesh = await objLoader.loadAsync(resource.geometry);

  mesh.scale.set(0.01, 0.01, 0.01);

  return mesh;
}

export async function loadObjModel(resource: Resource) {
  const mtlLoader = new MTLLoader();
  const objLoader = new OBJLoader();
  const texture = await mtlLoader.loadAsync(resource.texture);

  objLoader.setMaterials(texture);
  const mesh = objLoader.loadAsync(resource.geometry);
  return mesh;
}

export async function loadResource(resource: Resource) {
  const type = getFileType(resource.geometry);
  if (!type) {
    return;
  }
  const fn = typeLoader[type];
  return await fn(resource);
}
