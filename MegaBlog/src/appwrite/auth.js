import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// }); 
//ye boile plate code humko docs se mille appwrite ke 
//aise bhi humlog account create kr skte hai but optimized code aur best practise ke liye dusra method apnayenge;
// *********************************************************************************************************************************************
// export class AuthService{}
// export default AuthService;
//phl class bnaye ushke baad class ko as it is pass krwa diye first step-
//maine class bnake sidha export krdiya toh jo bhi is claass ko use krega ushko object bnana hoga is class se
//toh kyu nah me object hi import kr duu isse kya hoga we directly object ko import krlega and object pe sare method lga hoga;


export class AuthService{
    client=new Client();//yhi pe setEndPoint and setProject nhi bna rhe hai kyuki we class ke andr by default bna hua hai mein chahta hum ki jb object bnega toh client bnana chaiye and account ka access mile ishke liye constructor ko all krenge; 
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account=new Account(this.client)
    }
    //now wewill create a account;
    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name)//sbse phle unique id generate krna hoga kyuki documenation me diya hai funcction me sbse phle unique id generate krenge
            if(userAccount){
                //agr userAccount exists krta hai toh directly login krwadenge
                //hence call another method login;
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
        //agr account nhi milla hoga toh ye null return krdega;
    }
    //agr mein directly home pe aagya toh humko pta krna hoga ki mein login hm ya nhi ho;
    async getCurrentUser(){
        try {
            await this.account.get() 
        } catch (error) {
            throw error
        }
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error  
        }
    }
}
const authService=new AuthService();
//ab kya krunga ye jo object ko sidha export krdunga isse kya hoga humko ko jo jo chij ka access chaiye hoga we object se lelenge;
// ek chaiye hoga client ek bnana hoga account ;sare method account pe hi lgte hai jaise .create .logout hai aur bhi bhut method hai;
export default authService
