import { Card, Descriptions } from 'antd';
import type { Object3D } from 'three';
import VectorProperty from './Properties/VectorProperty';
import BooleanProperty from './Properties/BooleanProperty';

export default function GeneralPanel({ object }: { object: Object3D }) {
  return (
    <Card title="General Info" size="small" style={{ marginTop: 10 }}>
      <Descriptions size="small" column={1} labelStyle={{ width: 65 }}>
        <Descriptions.Item label="Type">{object.type}</Descriptions.Item>
        <Descriptions.Item label="ID">{object.id}</Descriptions.Item>
        <Descriptions.Item label="UUID">{object.uuid}</Descriptions.Item>
        <Descriptions.Item label="Name">{object.name || '-'}</Descriptions.Item>
        <Descriptions.Item label="Enabled">
          <BooleanProperty object={object} propName="visible" />
        </Descriptions.Item>
        <Descriptions.Item label="Position">
          <VectorProperty value={object.position} />
        </Descriptions.Item>
        <Descriptions.Item label="Rotation">
          <VectorProperty value={object.rotation} />
        </Descriptions.Item>
        <Descriptions.Item label="Scale">
          <VectorProperty value={object.scale} />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
