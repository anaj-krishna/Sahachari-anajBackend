/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3: S3;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.AWS_BUCKET_NAME || '';
    
    this.s3 = new S3({
      region: process.env.AWS_REGION || 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async getPresignedUrl(
    fileName: string,
    fileType: string,
    folder: string,
  ): Promise<{ url: string; key: string }> {
    const key = `${folder}/${uuidv4()}-${fileName}`;

    const params: S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: key,
      ContentType: fileType,
    };

    const url = await this.s3.getSignedUrlPromise('putObject', params);

    return { url, key };
  }
}