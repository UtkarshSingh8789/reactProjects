//jb humlog logid in honge toh humlog ko  cards  millega hence jaise hi us card pe click krte hai humlog ko sara article mil rha tha pdhne ke liye;
//hence we card bhi apne aap me ek component hai;
import React from 'react'
import appwriteService from "../appwrite/config"
//ishko yha se lena pra rha hai ki humlog store nhi bnaye hai agr state me available hota toh redux use krta aur redux se information leta yha pe project modify kr skte hai;
import { Link } from 'react-router-dom'
//ye jo props de rhe hai PostCard ko we humlog ko seedah seddha mil jayega jb bhi query lgayenge toh appwrite se miljayega;
function PostCard({
    //id yha $id krke likha jaata ye appwrite ka syntax hai;
    $id,title,featuredimage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredimage)} alt={title} 
                className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
