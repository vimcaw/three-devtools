import type { WebGLRenderer, WebGLProgram } from 'three';

export interface IProgramInfo extends WebGLProgram {
  vertexShader: string;
  fragmentShader: string;

  // rollback the original shader
  originalVertexShader: string;
  originalFragmentShader: string;
}

export class MaterialEditor {
  private render: WebGLRenderer;

  programInfoList: IProgramInfo[] = [];

  constructor() {
    //
  }

  initCtx(render: WebGLRenderer) {
    this.render = render;
  }

  setCurrentProgramsInfo() {
    const gl = this.render.getContext();
    const programs = this.render.info.programs || [];

    for (let i = 0; i < programs.length; i++) {
      const programThreeWrapped = programs[i];
      const vs = gl.getShaderSource(programThreeWrapped.vertexShader);
      const fs = gl.getShaderSource(programThreeWrapped.fragmentShader);

      this.programInfoList.push({
        ...programThreeWrapped,
        originalVertexShader: vs,
        originalFragmentShader: fs,
      });
    }
  }

  /**
   * @param id program id
   * @param vs edited vertex shader
   * @param fs edited fragment shader
   */
  updateProgramsInfo(id: number, vs: string, fs: string) {
    const program = this.programInfoList.find(programInfo => programInfo.id === id);
    const uniforms = program.getUniforms();
    this.reCompileShaderProgram(gl, program.program, uniforms, vs, fs);
  }

  reCompileShaderProgram(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    uniforms: { seq: any[] },
    vs: string,
    fs: string
  ) {
    const originalMapValue: Partial<string, any> = {};
    const uniformLen = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < uniformLen; ++i) {
      const info = gl.getActiveUniform(program, i);
      const newAddr = gl.getUniformLocation(program, info.name);
      const originV = gl.getUniform(program, newAddr);
      originalMapValue[info.name] = originV;
    }

    this.reLink(gl, program, vs, fs);

    const structUniforms = [uniforms];
    const flatUniforms = [];

    while (structUniforms.length) {
      const structUniform = structUniforms.shift();

      for (let i = 0; i < structUniform.seq.length; i++) {
        const uniform = structUniform.seq[i];

        if (uniform.seq) {
          structUniforms.push(uniform);
        } else {
          flatUniforms.push(uniform);
        }
      }
    }

    for (let i = 0; i < uniformLen; ++i) {
      const info = gl.getActiveUniform(program, i);
      const newAddr = gl.getUniformLocation(program, info.name);

      // reset the addr of GPU ref object
      flatUniforms.forEach(uniform => {
        if (info.name.includes(uniform.id)) {
          uniform.addr = newAddr;

          switch (info.type) {
            case gl.FLOAT_MAT4:
              gl.uniformMatrix4fv(newAddr, false, originalMapValue[info.name]);
              break;
            case gl.FLOAT_MAT3:
              gl.uniformMatrix3fv(newAddr, false, originalMapValue[info.name]);
              break;
            case gl.FLOAT_VEC3:
              gl.uniform3fv(newAddr, originalMapValue[info.name]);
              break;
            case gl.FLOAT_VEC2:
              gl.uniform2fv(newAddr, originalMapValue[info.name]);
              break;
            case gl.FLOAT:
              gl.uniform1f(newAddr, originalMapValue[info.name]);
              break;
            case gl.INT:
              gl.uniform1i(newAddr, originalMapValue[info.name]);
              break;
            case gl.SAMPLER_2D:
              gl.uniform1i(newAddr, originalMapValue[info.name]);
              break;
            case gl.BOOL:
              gl.uniform1i(newAddr, originalMapValue[info.name]);
              break;
            default:
              console.warn('unknown uniform type', info.type);
              break;
          }
        }
      });
    }
  }

  // relink the program with new shader source code
  reLink(gl: WebGLRenderingContext, program: WebGLProgram, vs: string, fs: string) {
    const shaders = gl.getAttachedShaders(program);

    gl.shaderSource(shaders[0], vs);
    gl.compileShader(shaders[0]);

    gl.shaderSource(shaders[1], fs);
    gl.compileShader(shaders[1]);

    // check the compiler status
    const vsSuccess = gl.getShaderParameter(shaders[1], gl.COMPILE_STATUS);
    if (!vsSuccess) {
      const errorLog = gl.getShaderInfoLog(shaders[1]);
      console.error(errorLog);
    }

    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      const errorLog = gl.getProgramInfoLog(program);
      console.error(errorLog);
    }
  }

  createShader(
    gl: WebGLRenderingContext,
    type: gl.VERTEX_SHADER | gl.FRAGMENT_SHADER,
    string: string
  ) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, string);
    gl.compileShader(shader);

    return shader;
  }

  /**
   * since we can't get the corresponding shader program by material
   * we need to find the program by name, which is the same as material name
   * @param materialName material name
   */
  showEditor(materialName: string) {
    this.setCurrentProgramsInfo();
    const shaderProgram = this.programInfoList.find(
      programInfo => programInfo.name === materialName
    );

    // TODO finish the editor
    // when code has changed, call ``updateProgramsInfo`` to update the shader
  }
}
