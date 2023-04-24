import { Card, Descriptions } from 'antd';
import type { WebGLRenderer } from 'three';

export function RenderInfo({ render }: { render: WebGLRenderer }) {
  return (
    <Card size="small" bodyStyle={{ padding: 12 }}>
      <Descriptions size="small" column={1} labelStyle={{ width: 85 }}>
        <Descriptions.Item label="lines">{render.info.render.lines}</Descriptions.Item>
        <Descriptions.Item label="drawCalls">{render.info.render.calls}</Descriptions.Item>
        <Descriptions.Item label="triangles">{render.info.render.triangles}</Descriptions.Item>
        <Descriptions.Item label="points">{render.info.render.points}</Descriptions.Item>
        <Descriptions.Item label="geometries">{render.info.memory.geometries}</Descriptions.Item>
        <Descriptions.Item label="textures">{render.info.memory.textures}</Descriptions.Item>
        <Descriptions.Item label="programs">{render.info.programs?.length ?? 0}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
