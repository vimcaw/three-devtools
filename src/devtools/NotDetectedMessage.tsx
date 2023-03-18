import { Content, Flex, Heading, IllustratedMessage, View } from '@adobe/react-spectrum';
import NoSearchResults from '@spectrum-icons/illustrations/NoSearchResults';
import PreferencesButton from './components/PreferencesButton';

export default function NotDetectedMessage() {
  return (
    <View height="100vh" padding="size-200">
      <Flex height="100%" justifyContent="center" alignItems="center">
        <PreferencesButton position="fixed" top="size-200" right="size-200" />
        <IllustratedMessage>
          <NoSearchResults />
          <Heading>Three.js not detected</Heading>
          <Content>Please open a page that use three.js</Content>
        </IllustratedMessage>
      </Flex>
    </View>
  );
}
