import { Logger } from '@nestjs/common';
import { instructions, genPrompt } from '@/helper/prompts';
import { MessagePacket } from '@/types/request';
import { streamChatCompletion } from './chat';
import { ServerResponse } from 'http';

const messages: MessagePacket[] = [];

const genSystemMessagePacket = (): MessagePacket => ({
  role: 'system',
  content: instructions,
});

const genUserMsgPacket = (msg: string | string[]): MessagePacket => ({
  role: 'user',
  content: genPrompt(msg),
});

const prepareMessages = (rawText: string | string[]): MessagePacket[] =>
  messages.concat([genSystemMessagePacket(), genUserMsgPacket(rawText)]);

export const analyzeFinancialStatements = async (
  rawText: string | string[],
  logger: Logger,
  stream: ServerResponse,
): Promise<void> => {
  const messages = prepareMessages(rawText);

  await streamChatCompletion(messages, logger, stream);
};
