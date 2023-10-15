import { AxiosResponse } from 'axios';
import { Logger } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { MessagePacket } from '@/types/request';
import { modifiedSchema } from './prompts';
import { ServerResponse } from 'http';
import * as dotenv from 'dotenv';
dotenv.config();

export const streamChatCompletion = async (
  messages: MessagePacket[],
  logger: Logger,
  stream: ServerResponse,
) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const res = await (openai.createChatCompletion(
      {
        model: 'gpt-4-0613',
        messages,
        functions: [{ "name": "get_response", "parameters": modifiedSchema }],//the "get_response" isn't actually a function, it's a placeholder for GPT's response.
        function_call: { "name": "get_response" },
        temperature: 0,
        stream: true,
      },
      { responseType: 'stream' },
    ) as Promise<AxiosResponse<any, any>>);
    res.data.on('data', (data: any) => {
      const lines = data
        .toString()
        .split('\n')
        .filter((line: string) => line.trim() !== '');
      for (const line of lines) {
        const message = line.replace(/^data: /, '');
        const parsedMsg = parseJSON(message);
        if (message === '[DONE]' || parsedMsg.choices[0].finish_reason == 'stop') {
          logger.log('Finish ChatGPT response with [DONE]');
          stream.end();
          return;
        }
        try {
          const parsed = JSON.parse(message);
          const text = parsed.choices[0].delta.function_call.arguments
          if (text) stream.write(text);
        } catch (error) {
          logger.error('Could not JSON parse stream message', message, error);
        }
      }
    });
  } catch (error) {
    if (error.response?.status) {
      logger.error(error.response.status, error.message);
      error.response.data.on('data', (data: Buffer) => {
        const message = data.toString();
        try {
          const parsed = JSON.parse(message);
          logger.error('An error occurred during OpenAI request: ', parsed);
        } catch (error) {
          logger.error('An error occurred during OpenAI request: ', message);
        }
      });
    } else {
      logger.error('An error occurred during OpenAI request', error);
    }
  }
  const parseJSON = json => {
    try {
        return JSON.parse(json)
    } catch (error) {
      logger.error('Could not JSON parse stream message', json, error);
      return null
    }
  }
};
