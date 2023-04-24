import { Properties as CSSProperties } from 'csstype';
import type { THREE } from 'core';

export interface IInitProps {
  three: THREE;
  panelStyle?: CSSProperties;
}
