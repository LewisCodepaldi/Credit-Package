import {
  TextractClient,
  DetectDocumentTextCommand,
  StartDocumentTextDetectionCommand,
  StartDocumentTextDetectionCommandInput,
  GetDocumentTextDetectionCommand,
  GetDocumentTextDetectionCommandInput,
} from '@aws-sdk/client-textract';
import { clientConfig, S3Bucket, getS3ObjectPath } from './aws';

export const extractText = async (buffer: Buffer): Promise<string[]> => {
  const params = {
    Document: {
      Bytes: buffer,
    },
  };
  const command = new DetectDocumentTextCommand(params);
  const client = new TextractClient(clientConfig);
  const response = await client.send(command);

  const texts: string[] = [];
  response.Blocks.forEach((item) => {
    if (item.BlockType === 'LINE') {
      texts.push(item.Text);
    }
  });
  return texts;
};

export const extractTextAsync = async (name): Promise<string> => {
  const params = {
    DocumentLocation: {
      S3Object: {
        Bucket: S3Bucket,
        Name: getS3ObjectPath(name),
      },
    },
  } as StartDocumentTextDetectionCommandInput;
  const command = new StartDocumentTextDetectionCommand(params);
  const client = new TextractClient(clientConfig);
  const response = await client.send(command);
  const { JobId } = response;
  return JobId;
};

export const getDetectionResult = async (
  jobId: string,
): Promise<string[] | boolean> => {
  const params = {
    JobId: jobId,
  } as GetDocumentTextDetectionCommandInput;
  const command = new GetDocumentTextDetectionCommand(params);
  const client = new TextractClient(clientConfig);
  const response = await client.send(command);
  const { Blocks, JobStatus } = response;
  if (JobStatus !== 'SUCCEEDED') return false;

  const texts: string[] = [];
  Blocks.forEach((item) => {
    if (item.BlockType === 'LINE') {
      texts.push(item.Text);
    }
  });
  return texts;
};
