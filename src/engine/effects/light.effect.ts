import { AmbientLight } from 'three';

// export function createDirectionLight() {
//   const color = 0xffffff;
//   const intensity = 0.8;
//   const light = new DirectionalLight(color, intensity);
//   light.position.set(0, 10, 0);
//   light.target.position.set(-5, 0, 0);
//   return light;
// }

export function createHemisphereLight() {
  const color = 0xffffff;
  const intensity = 2;
  const light = new AmbientLight(color, intensity);
  light.position.set(0, 50, 0);

  return light;
}
