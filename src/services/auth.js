import { Account, Client, ID } from "appwrite";
import config from "../config/appwriteConfig";

class AuthService{

    client = new Client(); 
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client);
    }   

    async createAccount({email,password,name},callback,callbackArgs=[]){ 

        const result = await this.account.create(ID.unique(),email,password,name);

        if(result){
            return typeof callback == 'function' && callback(...callbackArgs,result);
        }

        return result;
    }

    async loginAccount({email,password},callback,callbackArgs=[]){
        const result = await this.account.createEmailPasswordSession(email,password);

        if(result && typeof callback=='function'){
            callback(...callbackArgs,result);
        }
        return result;
    }

    async logoutAccount({sessionId},callback,callbackArgs=[]){
        const result = await this.account.deleteSession(sessionId);

        if(result && typeof callback=='function'){
            callback(...callbackArgs,result);
        }

        return result;
    }

    async verifyAccount({redirectUrl},callback,callbackArgs=[]){
        const result = await this.account.createEmailVerification({
            url: String(redirectUrl)
        });

        if(result && typeof callback=='function'){
            callback(...callbackArgs,result);
        }

        return result;
    }

    async getCurrentUser(){
        const result = await this.account.get();
        return result;
    }
}

const authService = new AuthService();

export default authService;