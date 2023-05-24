import type { WebGLRenderer } from 'three';
import { Modal } from 'antd';

interface IImg extends ImageBitmap {
  base64: string;
}

interface IProps {
  list: IImg[];
}

function TextureList(props: IProps) {
  console.log(props.list);

  return (
    <div>
      {props.list.map((item, index) => (
        <div key={index}>
          <img width={512} height={512} src={item.base64} />
        </div>
      ))}
    </div>
  );
}

export class TextureViewer {
  gl: WebGLRenderingContext;

  /**
   * k: glMethod
   * v: original method
   */
  omap = new Map<string, Function>();

  /**
   * key: texture
   */
  textureMap = new Map<WebGLTexture, IImg>();

  latestTexture: WebGLTexture;

  getActiveTexture(gl: WebGLRenderingContext) {
    const ts = gl.getParameter(gl.ACTIVE_TEXTURE);

    switch (ts) {
      case gl.TEXTURE0: {
        gl.getTexImage();
      }
    }
  }

  initCtx(render: WebGLRenderer) {
    this.gl = render.getContext();
    this.hiJackGl();
  }

  hiJackGl() {
    // createTexture
    this.omap.set('createTexture', this.gl.createTexture);
    const that = this;

    this.gl.createTexture = function () {
      try {
        const r = that.omap.get('createTexture').apply(that.gl, arguments) as WebGLTexture;
        return r;
      } catch (error) {
        console.error('THREE.WebGLState:', error);
      }
    };

    // texImage2D
    this.omap.set('texImage2D', this.gl.texImage2D);
    this.gl.texImage2D = function () {
      try {
        debugger;
        const r = that.omap.get('texImage2D').apply(that.gl, arguments) as WebGLTexture;
        return r;
      } catch (error) {
        console.error('THREE.WebGLState:', error);
      }
    };

    // bindTexture
    this.omap.set('bindTexture', this.gl.bindTexture);
    this.gl.bindTexture = function () {
      try {
        debugger;
        that.omap.get('bindTexture').apply(that.gl, arguments) as WebGLTexture;

        if (arguments[1]) {
          that.latestTexture = arguments[1];
        }
      } catch (error) {
        console.error('THREE.WebGLState:', error);
      }
    };

    // texSubImage2D
    this.omap.set('texSubImage2D', this.gl.texSubImage2D);
    this.gl.texSubImage2D = function () {
      try {
        const r = that.omap.get('texSubImage2D').apply(that.gl, arguments) as WebGLTexture;
        if (arguments[6] instanceof ImageBitmap) {
          debugger;
          const imageBitmap = arguments[6] as IImg;

          console.log(arguments[6]);
          imageBitmap.base64 = that.imageBitmapToBase64(imageBitmap);
          that.textureMap.set(that.latestTexture, imageBitmap);
        }
        return r;
      } catch (error) {
        console.error('THREE.WebGLState:', error);
      }
    };
  }

  /**
   * convert imagebitmap to base64
   */
  imageBitmapToBase64(imageBitmap: ImageBitmap) {
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);
    return canvas.toDataURL();
  }

  showModal() {
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
      content: <TextureList list={Array.from(this.textureMap.values())} />,
      footer: null,
      keyboard: false,
    });
  }
}
