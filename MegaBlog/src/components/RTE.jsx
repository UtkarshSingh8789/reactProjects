//editor humlog seperate jgh bna rhe lkin use khi aur krna hai;
//agr humlog chae jaise phle krrhe the forwardref hook ka use krke refrence le skte hai
//lkin yha kuch aur alg krte hai;
import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import{Controller} from 'react-hook-form'
function RTE({name,control,label,defaultValue=""}) {//control react-hook-form se aata hai,ye control hi responsible hai uski sare state ko usform me le jaane ke liye ;
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
        <Controller /** ishke andr kya kya pass krna hai sb documentation se dekho react-hook-form*/
        name={name || "content"}
        control={control}//ye parent element dega jo bhi parent element call krega ushko as it is control me pass krdenge taaki we pura control le paaye;
        render={({field: {onChange}}) => (
            <Editor // ye sb kuch humog RTE ke documenttion se likhe hai;
            initialValue={defaultValue}
            init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}

export default RTE
