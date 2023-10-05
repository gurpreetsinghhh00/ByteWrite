import {
  APPWRITE_URL,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_ID,
  APPWRITE_BUCKET_ID,
} from "../constants";
import { Client, Storage, ID } from "appwrite";

class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT_ID);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: updateFile :: error", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(APPWRITE_BUCKET_ID, fileId);
    } catch (error) {
      console.log("Appwrite :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(APPWRITE_BUCKET_ID, fileId);
  }
}

const storageService = new StorageService();

export default storageService;
