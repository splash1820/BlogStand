import { Client, ID, Storage } from "appwrite";
import config from "../config/appwriteConfig";

class StorageService{
    client = new Client();
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.storage = new Storage(this.client);
    }

    async uploadImage(image){
        try {
            const result = await this.storage.createFile({
                bucketId:config.appwriteBucketId,
                fileId:ID.unique(),
                file:image
            })
            return result;
        } catch (error) {
            console.error("failed to upload image: ",error);
        }
    }

    async getImagePreview(imageId){
        try {
            const result = this.storage.getFilePreview({
                bucketId:config.appwriteBucketId,
                fileId:imageId
            });

            return result;
        } catch (error) {
            console.error("failed to get image preview: ",error);
        }
    }

    async removeImage(imageId){
        try {
            await this.storage.deleteFile({
                bucketId:config.appwriteBucketId,
                fileId:imageId
            });
        } catch (error) {
            console.error("failed to delete image: ",error);
        }
    }
}

const storageService = new StorageService();

export default storageService;