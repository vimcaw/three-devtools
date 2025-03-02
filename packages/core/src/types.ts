import type { WebGLUniforms } from 'three';

export interface ThreeUniforms extends WebGLUniforms {
  id: string;

  seq: ThreeUniforms[];

  addr: WebGLUniformLocation;
}
