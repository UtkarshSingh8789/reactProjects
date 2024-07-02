import React,{useEffect,useState} from 'react'
import { Container,PostForm } from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';
function EditPost() {
   const [post,setPosts] =useState([])
   //user click krega toh us page me jayega , jo url me availbale hoga and we know for fetching value from url we have to use useParams()
   const {slug} =useParams()
   const navigate=useNavigate();
   //slug me change hoga tohh valuee leke aana hoga;
   useEffect(()=>{
    if(slug){
        appwriteService.getPost(slug).then((post)=>{
            if(post){
                setPosts(post)
            }
        })
    }
    else{
        navigate('/')
    }
   },[slug,navigate])
  return post ? (
    <div className='py-8'>
        <PostForm post={post}/>
    </div>
  ) : null
}

export default EditPost
