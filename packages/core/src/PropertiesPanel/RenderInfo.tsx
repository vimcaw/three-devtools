import { Card, Descriptions } from 'antd';
import type { Object3D } from 'three';
import {useState} from "react";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {WebGLRenderer} from "three";
import {VectorProperty} from './Properties/VectorProperty';
import BooleanProperty from './Properties/BooleanProperty';

export function RenderInfo({ render }: { render: WebGLRenderer }) {

  // toggle the visibility of the div below
  const [show, setShow] = useState(true);

  const Header = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>Render Info</span>
      {show ? (
        <MinusOutlined onClick={() => setShow(!show)} />
      ) : (
        <PlusOutlined onClick={() => setShow(!show)} />
      )}
    </div>
  )

  return (
    <Card
      title={Header} size="small" style={{ marginTop: 10 }}
      bodyStyle={{
        padding: show ? 12 : 0,
      }}
    >
      {
        show && (
          <Descriptions size="small" column={1} labelStyle={{ width: 85 }}>
            <Descriptions.Item label="lines">{render.info.render.lines}</Descriptions.Item>
            <Descriptions.Item label="drawCalls">{render.info.render.calls}</Descriptions.Item>
            <Descriptions.Item label="triangles">{render.info.render.triangles}</Descriptions.Item>
            <Descriptions.Item label="points">{render.info.render.points}</Descriptions.Item>
            <Descriptions.Item label="geometries">{render.info.memory.geometries}</Descriptions.Item>
            <Descriptions.Item label="textures">{render.info.memory.textures}</Descriptions.Item>
            <Descriptions.Item label="programs">{render.info.programs.length}</Descriptions.Item>
          </Descriptions>
        )
      }
    </Card>
  );
}
