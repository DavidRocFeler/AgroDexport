export declare class CloudinaryService {
    constructor();
    uploadFile(id: string, file: Express.Multer.File, type: string): Promise<{
        secure_url: string;
    }>;
    uploadMultipleFiles(id: string, files: Record<string, Express.Multer.File | undefined>): Promise<{
        [key: string]: string;
    }>;
    private getFolderByType;
    private updateFileUrl;
}
