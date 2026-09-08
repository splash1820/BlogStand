import { Client, ID, TablesDB, Query} from "appwrite";
import config from "../config/appwriteConfig";

class DBService{
    client = new Client();
    tableDB;

    DB_ID = config.appwriteDBId;
    TABLE_ID = config.appwriteTableId;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
            
        this.tableDB = new TablesDB(this.client);
    }


    async addBlog(slug,{title,featuredImage,content}){
        try {
            const result = await this.tableDB.createRow({
                databaseId:config.appwriteDBId,
                tableId:config.appwriteTableId,
                rowId:slug,
                data:{
                    "title":title,
                    "slug":slug,
                    "featuredImage":featuredImage, //to be fetched from storage
                    "status":true,
                    "content":content
                }
            });
            return result;
        } catch (error) {
            console.error("failed to add a Blog ",error);
        }
    }

    async updateBlog(slug,{title,featuredImage,content}){
        let updateData;
        if(title){
            updateData.title = title;
        }
        if(featuredImage){
            updateData.featuredImage = featuredImage;
        }
        if(content){
            updateData.content = content;
        }

        try {
            const result = await this.tableDB.updateRow({
                databaseId:config.appwriteDBId,
                tableId:config.appwriteTableId,
                rowId:slug,
                data:updateData                
            });
            return result;
        } catch (error) {
            console.error("failed to update blog: ",error);
        }
    }

    async removeBlog(slug){
        try {
            const result = await this.tableDB.deleteRow({
                databaseId:config.appwriteDBId,
                tableId:config.appwriteTableId,
                rowId:slug,                
            });

            return true;
        } catch (error) {   
            console.error("failed to remove blog: ",error);
            return false;          
        }
    }

    async getBlog(slug){
        try {
            const result = await this.tableDB.getRow({
                databaseId:config.appwriteDBId,
                tableId:config.appwriteTableId,
                rowId:slug
            });
            return result;
        } catch (error) {
            console.error("failed to get blog: ",error);
        }
    }

    async getAllBlogs(){
        try {
            const result = await this.tableDB.listRows({
                databaseId:config.appwriteDBId,
                tableId:config.appwriteTableId,
                queries:[
                    Query.select(["title","featuredImage","slug"]),
                    Query.equal("status",["false"])
                ]
            });

            return result;
        } catch (error) {
            console.error("failed to get All blogs: ",error);
        }
    }
}

const dbService =  new DBService();

export default dbService;