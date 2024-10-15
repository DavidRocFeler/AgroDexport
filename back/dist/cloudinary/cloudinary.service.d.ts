export declare class CloudinaryService {
    constructor();
    uploadFile(id: string, file: Express.Multer.File, type: string): Promise<{
        secure_url: string;
    }>;
    private getFolderByType;
    private updateFileUrl;
}
