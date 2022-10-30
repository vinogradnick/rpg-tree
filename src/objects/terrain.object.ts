import {
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  NearestFilter,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  sRGBEncoding,
  Texture,
  TextureLoader,
} from 'three';
import { GameObject } from '../engine/core/gameObject';

export default class Terrain extends GameObject {
  geometry: PlaneGeometry;
  material: MeshPhongMaterial;
  texture: Texture;
  mesh: Mesh<PlaneGeometry, MeshPhongMaterial>;
  constructor() {
    super('terrain');
    const size = 200;
    const loader = new TextureLoader();
    this.texture = loader.load('/grass.png');
    this.texture.encoding = sRGBEncoding;
    this.texture.wrapS = RepeatWrapping;
    this.texture.wrapT = RepeatWrapping;
    this.texture.magFilter = NearestFilter;
    const repeats = size / 2;
    this.texture.repeat.set(repeats, repeats);

    this.geometry = new PlaneGeometry(size, size);
    this.material = new MeshPhongMaterial({
      map: this.texture,
      side: DoubleSide,
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.rotation.x = Math.PI * -0.5;
  }
}
