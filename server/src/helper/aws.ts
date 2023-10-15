import * as dotenv from 'dotenv';
dotenv.config();

export const clientConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2',
};

export const s3Config = {
  ...clientConfig,
  region: process.env.AWS_BUCKET_REGION || 'us-west-2',
};

export const S3Bucket = process.env.AWS_BUCKET || 'credit-package';
export const getS3ObjectPath = (name: string) =>
  `${process.env.AWS_OBJECT_PATH || 'credit-package'}/${name}`;
