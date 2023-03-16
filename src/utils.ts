import { plainToInstance } from 'class-transformer';
import * as MessageMaps from './messages';
import { Message } from './messages';

// eslint-disable-next-line import/prefer-default-export
export function deserializeMessage(message: unknown): MessageMaps.Message | undefined {
  try {
    if (
      typeof message === 'object' &&
      message !== null &&
      'type' in message &&
      typeof message.type === 'string'
    ) {
      return plainToInstance(
        (MessageMaps as unknown as Record<string, { new (): Message }>)[message.type],
        message
      );
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
}
