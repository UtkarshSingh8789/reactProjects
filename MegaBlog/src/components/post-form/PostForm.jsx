import React,{useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PostForm({post}) {
    const { register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
            //dekho humlog conditionally isliye check kr rhe hai kyuki hoske toh user post ko edit krna ho ya ho ya new post daalna aaya ho;
            title:post?.title || '',
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    //dekho agr user ne form submit krdiya hoga toh user ne data pass kiya hoga
    //do cases bnta hai agr post ki value hai alredy toh update kro warna new entry create kro;
    const submit=async (data)=>{
        if(post){
            //update;
            //react hook form ka ek yehi faid hai ki we data except krta hai agr by default form bnate toh ushko use krna bhut muskil hota;
            const file=data.image[0] ? appwriteService.uploadFile(data.image[0]) : null
            //purani post ko delete bhi toh krni hogi;
            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }
            //ab update krenge post
            const dbPost=await appwriteService.updatePost(post.$id,{...data,
                featuredImage: file ? file.$id:undefined
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else{
            //ab ost nhi hai toh ye krenge;
            //phla kaam file upload ka kiya kro achha rhta hai;
            const file=appwriteService.uploadFile(data.image[0])
            if(file){
                const fileId=file.$id
                data.featuredImage=fileId
                const dbPost=await appwriteService.createPost({...data,userId:userData.$id})
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
        //slug transform method bna rhe hai;
        //humlog ke pass do input field hai title and slug .. title ko observe krna hai and slug me value generate krna hai;
        const slugTransform=useCallback((value)=>{
            if(value && typeof value === 'string'){
                return value.trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")//razex se likhe hai
                .replace(/\s/g, "-");
            }
            return ''
        },[])
        useEffect(()=>{
            const subscription=watch((value,{name})=>{
                if(name==='title'){
                    setValue('slug',slugTransform(value.title,{shouldValidate: true }))
                }
            })
            //use effect ke andr return me ek humlog ko call back milta hai;
            return ()=>{
                subscription.unsubscribe()
            }//isse kya hota hai memory management hota hai ye aksr interview me pucha jaata hai --(apne ek method liya useeffect me use kiya toh usko optimize kaise kr skte ho?)
        },[watch,slugTransform,setValue])
    }
    return(
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>

    )
}

export default PostForm
