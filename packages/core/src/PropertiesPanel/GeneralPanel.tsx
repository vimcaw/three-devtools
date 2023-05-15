import { Card, Descriptions } from 'antd';
import type { Object3D, Mesh } from 'three';
import { EditOutlined } from '@ant-design/icons';
import { VectorProperty } from './Properties/VectorProperty';
import BooleanProperty, { CustomBooleanProperty } from './Properties/BooleanProperty';
import { Object3DWithOnBeforeRenderFlag } from './types';
import { materialEditor } from '../store/threeJsData';

export default function GeneralPanel({ object }: { object: Mesh }) {
  return (
    <Card size="small" bodyStyle={{ padding: 12 }}>
      <Descriptions size="small" column={1} labelStyle={{ width: 65 }}>
        <Descriptions.Item label="Type">{object.type}</Descriptions.Item>
        <Descriptions.Item label="ID">{object.id}</Descriptions.Item>
        <Descriptions.Item label="UUID">{object.uuid}</Descriptions.Item>
        <Descriptions.Item label="Name">{object.name || '-'}</Descriptions.Item>

        {/* Material Editor */}
        <Descriptions.Item label="Material">
          <span>{object?.material?.type || '-'}</span>
          <EditOutlined
            title="Edit The Shader Code"
            style={{
              marginLeft: 3,
              cursor: 'pointer',
            }}
            onClick={() => {
              materialEditor.showEditor(object?.material?.type || '');
            }}
          />
        </Descriptions.Item>

        <Descriptions.Item label="Enabled">
          <BooleanProperty object={object} propName="visible" />
        </Descriptions.Item>

        <Descriptions.Item label="Enable Debugger Before Render">
          <CustomBooleanProperty<Object3DWithOnBeforeRenderFlag>
            object={object as Object3DWithOnBeforeRenderFlag}
            propName="onBeforeRenderFlag"
          />
        </Descriptions.Item>

        <Descriptions.Item label="Position">
          <VectorProperty object={object} fieldName="position" />
        </Descriptions.Item>
        <Descriptions.Item label="Rotation">
          <VectorProperty object={object} fieldName="rotation" />
        </Descriptions.Item>
        <Descriptions.Item label="Scale">
          <VectorProperty object={object} fieldName="scale" />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
