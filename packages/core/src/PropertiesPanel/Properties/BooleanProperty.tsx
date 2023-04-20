import { Object3D } from 'three';
import { Checkbox } from 'antd';
import { O } from 'ts-toolbelt';
import { observerLayer } from '../../store/threeJsData';

export default function BooleanProperty<T extends Object3D>({
  object,
  propName,
}: {
  object: T;
  propName: O.WritableKeys<O.Select<T, boolean>>;
}) {
  return (
    <Checkbox
      checked={object[propName]}
      onChange={e => {
        const node = observerLayer.findNode(object.uuid);

        if (node) {
          (node[propName] as boolean) = e.target.checked;
          observerLayer.refreshUI();
        }
      }}
    />
  );
}
