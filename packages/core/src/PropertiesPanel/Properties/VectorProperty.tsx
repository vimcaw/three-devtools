import type { Euler, Vector3 } from 'three';
import { Space, Typography } from 'antd';

export default function PropertyPanel({ value }: { value: Vector3 | Euler }) {
  return (
    <Space>
      <Typography.Text>X: {value.x.toFixed(3)}</Typography.Text>
      <Typography.Text>Y: {value.y.toFixed(3)}</Typography.Text>
      <Typography.Text>Z: {value.z.toFixed(3)}</Typography.Text>
    </Space>
  );
}
