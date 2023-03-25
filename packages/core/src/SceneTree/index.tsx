import { Text, View } from '@adobe/react-spectrum';
import type { Object3D, Scene } from 'three';

function SubTree({ object }: { object: Object3D }) {
  return (
    <View>
      <View paddingX="size-200" paddingY="size-50">
        <Text>{object.type}</Text>
      </View>
      <View paddingStart="size-200">
        {object.children.map(child => (
          <SubTree key={child.id} object={child} />
        ))}
      </View>
    </View>
  );
}

export default function SceneTree({ scene }: { scene: Scene }) {
  return <SubTree object={scene} />;
}
