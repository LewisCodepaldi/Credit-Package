import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  GetObjectCommand,
  GetObjectAclCommandInput,
  GetObjectAclCommandOutput,
} from '@aws-sdk/client-s3';
import { s3Config, S3Bucket, getS3ObjectPath } from './aws';

const getParam = (name: string) => ({
  Bucket: S3Bucket,
  Key: getS3ObjectPath(name),
});

const execute = async (
  cmd: typeof GetObjectCommand | typeof PutObjectCommand,
  params: GetObjectAclCommandInput | PutObjectCommandInput,
): Promise<any> => {
  const command = new cmd(params);
  const client = new S3Client(s3Config);
  const response = await client.send(command);
  return response;
};

export const uploadS3 = async (
  name: string,
  buffer: Buffer,
): Promise<PutObjectCommandOutput> => {
  const params = {
    ...getParam(name),
    Body: buffer,
  };
  const command = new PutObjectCommand(params);
  const client = new S3Client(s3Config);
  const response = await client.send(command);
  return response;
};

export const getObject = async (
  name: string,
): Promise<GetObjectAclCommandOutput> => {
  const params = getParam(name);
  const response = await execute(GetObjectCommand, params);
  return response;
};


