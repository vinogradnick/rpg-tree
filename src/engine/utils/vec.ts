interface Point {
  x: number;
  y: number;
  z: number;
  i: number;
}
interface Vec extends Point {}

/**
 * create vector or point
 *
 * @param x
 * @param y
 * @param z
 * @returns
 */
export function vec<T = Point | Vec>(x: number, y: number, z: number): T {
  return { x, y, z } as T;
}
