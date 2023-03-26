import { Object3D } from 'three';
import { Checkbox } from 'antd';
import { O } from 'ts-toolbelt';

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
        (object[propName] as boolean) = e.target.checked;
      }}
    />
  );
}
