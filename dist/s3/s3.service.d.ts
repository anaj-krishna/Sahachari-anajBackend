export declare class S3Service {
    private s3;
    private bucketName;
    constructor();
    getPresignedUrl(fileName: string, fileType: string, folder: string): Promise<{
        url: string;
        key: string;
    }>;
}
