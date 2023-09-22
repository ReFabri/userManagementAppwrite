import conf from "@/conf/config";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
  name: string;
  email: string;
  password: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) {
        message = error.message;
        console.log(error.message);
      } else {
        message = String(error);
      }
      throw error;
    }
  }
  async login({ email, password }: LoginUserAccount) {
    try {
    } catch (error) {}
  }

  async isLoggedIn() {}
  async getCurrentUser() {}
  async logout() {}
}
