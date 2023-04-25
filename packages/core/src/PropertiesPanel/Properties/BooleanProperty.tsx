import { Object3D } from 'three';
import { Checkbox } from 'antd';
import { O } from 'ts-toolbelt';
import { observerLayer } from '../../store/threeJsData';
import { Object3DWithOnBeforeRenderFlag } from '../types';

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

export function CustomBooleanProperty<T extends Object3D>({
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
        const node = observerLayer.findNode(object.uuid) as Object3DWithOnBeforeRenderFlag;

        if (node) {
          if (!node[propName]) {
            node.onBeforeRenderCopy = node.onBeforeRender;
            node.onBeforeRender = () => {
              // eslint-disable-next-line no-debugger
              debugger;
              // @ts-ignore
              node.onBeforeRenderCopy!();
            };
          } else {
            // restore original function
            node.onBeforeRender = node.onBeforeRenderCopy!;
          }

          (node[propName] as boolean) = e.target.checked;
          observerLayer.refreshUI();
        }
      }}
    />
  );
}
