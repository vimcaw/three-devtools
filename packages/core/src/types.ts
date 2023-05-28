import type { WebGLUniforms } from 'three/src/renderers/webgl/WebGLUniforms';

export interface ThreeUniforms extends WebGLUniforms {
  id: string;

  seq: ThreeUniforms[];

  addr: WebGLUniformLocation;
}
