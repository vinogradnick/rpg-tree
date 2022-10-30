import { Object3D } from 'three';
import { Behavor } from '../core/behavor';
import { ObjectComposer } from '../core/composer';
import { GameObject } from '../core/gameObject';
import { createGameObject } from '../core/generator';
import { Procedure } from '../core/procedure';
import {
  EntityType,
  IObjectComposer,
  LoaderInfo,
  Resource,
} from '../core/types';
import { loadResource } from './resource.loader';
import { loadScript } from './script.loader';

const OBJECT_PATH = ['..', '..', 'objects'];
const SCRIPT_PATH = ['..', '..', 'scripts'];
const PROCEDURE_PATH = ['..', '..', 'procedures'];

async function loadMesh(
  name: string,
  ...info: Resource[]
): Promise<GameObject[]> {
  const meshList = [];
  for (const meshResource of info) {
    if (typeof meshResource === 'string') {
      meshList.push(
        await loadScript<GameObject>([...OBJECT_PATH, meshResource].join('/'))
      );
    }
    if (typeof meshResource === 'object') {
      const mesh = await loadResource(meshResource);

      const ObjectModel = createGameObject(
        meshResource.geometry,
        mesh as Object3D
      );
      meshList.push(new ObjectModel(name));
    }
  }
  return meshList;
}

async function loadObject(info: LoaderInfo): Promise<IObjectComposer> {
  const composer = new ObjectComposer();

  const meshList = await loadMesh(info.name, info.object as Resource);
  composer.object = meshList[0];

  if (info.scripts && info.scripts.length > 0) {
    const _list = [];
    for (const bh of info.scripts) {
      _list.push(await loadScript<Behavor>([...SCRIPT_PATH, bh].join('/')));
    }
    composer.scripts = _list;
  }
  return composer;
}

async function loadProcedure(procedure: LoaderInfo) {
  if (!procedure.scripts) {
    return;
  }
  const _proc = await loadScript<Procedure>(
    [...PROCEDURE_PATH, procedure.scripts[0]].join('/')
  );

  _proc.options = await loadMesh(
    procedure.name,
    ...(procedure.objects as Resource[])
  );

  return _proc;
}

/**
 * используется для загрузки объектов и скриптов которые он использует
 *
 */
export async function loader(): Promise<Record<string, IObjectComposer>> {
  const { default: file } = await import('../../loader.json');

  const store: Record<string, IObjectComposer> = {};
  for (const entity of file as LoaderInfo[]) {
    if (entity.type === EntityType.procedure) {
      const proc = await loadProcedure(entity);
      if (proc) {
        store[entity.name] = proc;
      }
    } else {
      store[entity.name] = await loadObject(entity);
    }
  }
  return store;
}
