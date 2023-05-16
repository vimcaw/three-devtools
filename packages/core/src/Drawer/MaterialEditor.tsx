import type { Material, ShaderMaterial, WebGLRenderer, WebGLProgram } from 'three';
import { Button, Modal, Tabs } from 'antd';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import TabPane from 'antd/es/tabs/TabPane';
import { ThreeJsClientAdapter } from '../ThreeJsClientAdapter';

export interface IProgramInfo extends WebGLProgram {
  // rollback the original shader
  originalVertexShader: string;
  originalFragmentShader: string;
}

interface ICodeProps {
  vs: string;
  fs: string;
  editor: MaterialEditor;
  program: IProgramInfo;
  mat: ShaderMaterial;
}

function Code(props: ICodeProps) {
  const { editor, vs, fs, program, mat } = props;
  const [vsCode, setVsCode] = useState(vs);
  const [fsCode, setFsCode] = useState(fs);
  const tabPaneStyle = {
    maxHeight: 550,
    overflowY: 'auto',
  };

  const onCancel = () => {
    editor.modal.destroy();
  };

  const onOk = () => {
    if (editor.isMaterialFromThreeJs) {
      editor.updateProgramsInfo(program.id, vsCode, fsCode);
    } else {
      editor.updateShaderMaterial(mat, vsCode, fsCode);
    }

    onCancel();
  };

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane style={tabPaneStyle} tab="Vertex Shader" key="1">
          <ReactCodeMirror
            value={vs}
            maxWidth={800}
            maxHeight={600}
            onChange={(value: string, viewUpdate: ViewUpdate) => {
              setVsCode(value);
            }}
          />
        </TabPane>
        <TabPane style={tabPaneStyle} tab="Fragment Shader" key="2">
          <ReactCodeMirror
            value={fs}
            maxWidth={800}
            maxHeight={600}
            onChange={(value: string, viewUpdate: ViewUpdate) => {
              setFsCode(value);
            }}
          />
        </TabPane>
      </Tabs>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          marginTop: 10,
        }}
      >
        <div>
          <Button
            onClick={onCancel}
            style={{
              marginRight: 10,
            }}
          >
            <span>Cancel</span>
          </Button>

          <Button type="primary" onClick={onOk}>
            <span>Ok</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export class MaterialEditor {
  private render: WebGLRenderer;

  public modal: Modal;

  programInfoList: IProgramInfo[] = [];

  isMaterialFromThreeJs: boolean;

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

      programThreeWrapped.originalVertexShader = vs;
      programThreeWrapped.originalFragmentShader = fs;

      this.programInfoList.push(programThreeWrapped);
    }
  }

  /**
   * @param id program id
   * @param vs edited vertex shader
   * @param fs edited fragment shader
   */
  updateProgramsInfo(id: number, vs: string, fs: string) {
    const gl = this.render.getContext();
    const program = this.programInfoList.find(programInfo => programInfo.id === id);
    const uniforms = program.getUniforms();
    this.reCompileShaderProgram(gl, program, uniforms, vs, fs);
  }

  updateShaderMaterial(material: ShaderMaterial, vs: string, fs: string) {
    material.vertexShader = vs;
    material.fragmentShader = fs;
    material.needsUpdate = true;
  }

  /**
   * threejs store the origin uniform addr, so we need to reset the addr after recompile the shader
   * @param gl
   * @param programInfo
   * @param uniforms
   * @param vs
   * @param fs
   */
  reCompileShaderProgram(
    gl: WebGLRenderingContext,
    programInfo: IProgramInfo,
    uniforms: { seq: any[] },
    vs: string,
    fs: string
  ) {
    const originalMapValue: Partial<string, any> = {};
    let uniformLen = gl.getProgramParameter(programInfo.program, gl.ACTIVE_UNIFORMS);
    const { program } = programInfo;

    for (let i = 0; i < uniformLen; ++i) {
      const info = gl.getActiveUniform(program, i);
      const newAddr = gl.getUniformLocation(program, info.name);
      const originV = gl.getUniform(program, newAddr);
      originalMapValue[info.name] = originV;
    }

    this.reLink(gl, programInfo, vs, fs);

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

    uniformLen = gl.getProgramParameter(programInfo.program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformLen; ++i) {
      const info = gl.getActiveUniform(programInfo.program, i);
      const newAddr = gl.getUniformLocation(programInfo.program, info.name);

      flatUniforms.forEach(uniform => {
        if (info.name.includes(uniform.id)) {
          // make sure we use the right program
          gl.useProgram(programInfo.program);

          // reset the addr that threejs store
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

  clearShaders(program: WebGLProgram) {
    const gl = this.render.getContext();
    const shaders = gl.getAttachedShaders(program);

    // delete the old shader
    shaders.forEach(shader => {
      gl.detachShader(program, shader);
      gl.deleteShader(shader);
    });
  }

  // relink the program with new shader source code
  reLink(gl: WebGLRenderingContext, programInfo: IProgramInfo, vs: string, fs: string) {
    const { program } = programInfo;
    this.clearShaders(program);

    let vsShader = this.createShader(gl, gl.VERTEX_SHADER, vs);
    let fsShader = this.createShader(gl, gl.FRAGMENT_SHADER, fs);

    gl.attachShader(program, vsShader);
    gl.attachShader(program, fsShader);

    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      const errorLog = gl.getProgramInfoLog(program);
      console.error('compile shader error', errorLog);

      // rollback
      this.clearShaders(program);
      vsShader = this.createShader(gl, gl.VERTEX_SHADER, programInfo.originalVertexShader);
      fsShader = this.createShader(gl, gl.FRAGMENT_SHADER, programInfo.originalFragmentShader);
      gl.attachShader(program, vsShader);
      gl.attachShader(program, fsShader);
      gl.linkProgram(program);
    }

    programInfo.vertexShader = vsShader;
    programInfo.fragmentShader = fsShader;
  }

  createShader(
    gl: WebGLRenderingContext,
    type: gl.VERTEX_SHADER | gl.FRAGMENT_SHADER,
    string: string
  ) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, string);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      const errorLog = gl.getShaderInfoLog(shader);
      console.error(errorLog);
    }

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

    if (shaderProgram) {
      this.modal = Modal.info();
      this.modal.update({
        width: 800,
        height: 600,
        title: 'Material Editor',
        icon: null,
        bodyStyle: {
          maxHeight: '700px',
          justifyContent: 'center',
          overflowY: 'auto',
        },
        content: (
          <Code
            vs={shaderProgram.originalVertexShader}
            fs={shaderProgram.originalFragmentShader}
            program={shaderProgram}
            editor={this}
          />
        ),
        footer: null,
      });
    } else {
      console.error(
        'can not find shader program by type, make sure you set material.type correctly',
        materialName
      );
    }
  }

  showEditorByMaterial(material: ShaderMaterial) {
    this.isMaterialFromThreeJs = Object.keys(MaterialEditor.shaderIDs).find(
      k => material.type === k
    );

    if (this.isMaterialFromThreeJs) {
      // threejs material
      this.showEditor(material.type);
    } else {
      // user defined material
      this.modal = Modal.info();
      this.modal.update({
        width: 800,
        height: 600,
        title: 'Material Editor',
        icon: null,
        bodyStyle: {
          maxHeight: '700px',
          justifyContent: 'center',
          overflowY: 'auto',
        },
        content: (
          <Code
            mat={material}
            vs={material.vertexShader}
            fs={material.fragmentShader}
            editor={this}
          />
        ),
        footer: null,
      });
    }
  }

  static shaderIDs = {
    MeshDepthMaterial: 'depth',
    MeshDistanceMaterial: 'distanceRGBA',
    MeshNormalMaterial: 'normal',
    MeshBasicMaterial: 'basic',
    MeshLambertMaterial: 'lambert',
    MeshPhongMaterial: 'phong',
    MeshToonMaterial: 'toon',
    MeshStandardMaterial: 'physical',
    MeshPhysicalMaterial: 'physical',
    MeshMatcapMaterial: 'matcap',
    LineBasicMaterial: 'basic',
    LineDashedMaterial: 'dashed',
    PointsMaterial: 'points',
    ShadowMaterial: 'shadow',
    SpriteMaterial: 'sprite',
  };
}
