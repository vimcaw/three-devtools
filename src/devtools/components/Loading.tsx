import { Flex, Heading, ProgressCircle, View } from '@adobe/react-spectrum';

export default function Loading({ message }: { message?: string }) {
  return (
    <View height="100vh" padding="size-200">
      <Flex height="100%" direction="column" justifyContent="center" alignItems="center">
        <ProgressCircle aria-label="Loading…" isIndeterminate size="L" />
        <Heading marginTop="size-500">{message}</Heading>
      </Flex>
    </View>
  );
}
