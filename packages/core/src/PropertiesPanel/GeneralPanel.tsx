import { Card, Descriptions } from 'antd';
import type { Object3D } from 'three';
import { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { VectorProperty } from './Properties/VectorProperty';
import BooleanProperty, { CustomBooleanProperty } from './Properties/BooleanProperty';

export default function GeneralPanel({ object }: { object: Object3D }) {
  // toggle the visibility of the div below
  const [show, setShow] = useState(true);

  const Header = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>General Info</span>
      {show ? (
        <MinusOutlined onClick={() => setShow(!show)} />
      ) : (
        <PlusOutlined onClick={() => setShow(!show)} />
      )}
    </div>
  );

  return (
    <Card
      title={Header}
      size="small"
      style={{ marginTop: 10 }}
      bodyStyle={{
        padding: show ? 12 : 0,
      }}
    >
      {show && (
        <Descriptions size="small" column={1} labelStyle={{ width: 65 }}>
          <Descriptions.Item label="Type">{object.type}</Descriptions.Item>
          <Descriptions.Item label="ID">{object.id}</Descriptions.Item>
          <Descriptions.Item label="UUID">{object.uuid}</Descriptions.Item>
          <Descriptions.Item label="Name">{object.name || '-'}</Descriptions.Item>
          <Descriptions.Item label="Enabled">
            <BooleanProperty object={object} propName="visible" />
          </Descriptions.Item>

          <Descriptions.Item label="Enable Debugger Before Render">
            <CustomBooleanProperty object={object} propName="onBeforeRenderFlag" />
          </Descriptions.Item>

          <Descriptions.Item label="Position">
            <VectorProperty value={object.position} object={object} fieldName="position" />
          </Descriptions.Item>
          <Descriptions.Item label="Rotation">
            <VectorProperty value={object.rotation} object={object} fieldName="rotation" />
          </Descriptions.Item>
          <Descriptions.Item label="Scale">
            <VectorProperty value={object.scale} object={object} fieldName="scale" />
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
}
