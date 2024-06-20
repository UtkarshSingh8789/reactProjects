import conf from '../conf.js'
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
}
const service=new Service()
export default service