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

const errorHandler = (error: unknown) => {
  let message = "Unknown Error";
  if (error instanceof Error) {
    message = error.message;
  } else {
    message = String(error);
  }
  console.log(message);
  throw error;
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
      errorHandler(error);
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      errorHandler(error);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error) {
      errorHandler(error);
    }
    return false;
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      errorHandler(error);
    }
    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      errorHandler(error);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
