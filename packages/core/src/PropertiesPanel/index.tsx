import type { Object3D } from 'three';
import GeneralPanel from './GeneralPanel';

export default function PropertyPanel({ object }: { object: Object3D }) {
  return <GeneralPanel object={object} />;
}