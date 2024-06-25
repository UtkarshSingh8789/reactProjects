//basically ye ek mechanishm hai route or pages ko protect krne ka;
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function AuthLayout({children,authentication=true}) {
    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authStatus = useSelector(state => state.auth.status)
    // useeffect ka use krnege kyuki use effect hi btayega ki aapko login pe bhjna hai ki home page pe ki khi aur ;
    useEffect(()=>{
        if(authentication && authStatus!==authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,authentication])
    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout
