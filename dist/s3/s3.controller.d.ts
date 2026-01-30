import { S3Service } from './s3.service';
export declare class S3Controller {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    getPresignedUrl(fileName: string, fileType: string, folder: string): Promise<{
        url: string;
        key: string;
    }>;
}
