import conf from '../conf/conf.js'
import {Client,ID,Databases,Storage,Query} from "appwrite"
export class Service{
    client=new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                //ab bola documentation me ki docume id dene ke liye toh humlog kya krte hai jo bhi slug value denge ushko document id ke jgh use krlenge;
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            
        } catch (error) {
            throw error;
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){//kn sa document id ko update krna hai ushko separate lelete hai
        //dekho humlog user id nhi denge chahte hai ki jo user bnaya hai whi update kr ske;
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
               }
            )
        } catch (error) {
            throw error
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            throw error;
            return false
        }
    }
    //hoskta hai humlog ko ek particular post chaiye ho aur hoskta hai sare post chaiye
    //phle ek post kaise lete hai ushka functionality dekhte hai;
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
            return false
        }
    }
    //ab humko sare document chaiye  listdocument ka use krenge to databases me jitne bhi post honge sare post miljayenge
    //sare post agr lunga to we bhi post aajayenge jishka status active nhi hai hence humlog ko ye nhi chaiye 
    //iske liye humlog query lgana sikhenge;
    async getPosts(/*mujhe we sare query do jishka staus active ho;*/queries=[Query.equal("status","active")]){
        //queries ek variable hai (Query me key value pair dete hai)
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            throw error
            return false
        }
    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            throw error
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}
const service=new Service()
export default service