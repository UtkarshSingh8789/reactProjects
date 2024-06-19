const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.VITE_BUCKET_ID),
    //isse ye faida hoga ki humlog value humesa string me hi millegi;
}
export default conf
//ye humlog siye kr rhe hai ki hr baaar jaake import.meta.env.VITE..
//likhna dikkat hoga hoskta hai kai baar ki enviromental variable load hi nah ho hence site crash kr jaayega
//isse bachne ke liye humlog key value pair define krenge
