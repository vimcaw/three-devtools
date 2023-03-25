import { Flex, Text, View } from '@adobe/react-spectrum';
import { useThreeJsData } from './store/threeJsData';
import PreferencesButton from './components/PreferencesButton';

export default function Header() {
  const threeJsData = useThreeJsData();

  return (
    <View paddingX="size-200" paddingY="size-100">
      <Flex justifyContent="space-between" alignItems="center">
        <View>
          <Text>Three.js </Text>
          <code>{threeJsData.version}</code>
        </View>
        <PreferencesButton />
      </Flex>
    </View>
  );
}
