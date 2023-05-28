import { Properties as CSSProperties } from 'csstype';
import * as THREE from 'three';

export interface IInitProps {
  three?: THREE;
  panelStyle?: CSSProperties;
}

export declare class ThreeJsDevTools {
  static USER_THREE: THREE;
  static initialize(props?: IInitProps): void;
  static destroy(): void;
}

export {};
