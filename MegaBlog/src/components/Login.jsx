import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'//login ko authLogin ki trh use krenge apne code mein;
import {Button,Input,Logo} from "./index"
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import {useForm} from "react-hook-form"
function Login() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {register, handleSubmit} = useForm()
  const [error, setError] = useState("")
  const login =async(data)=>{
    //jitne bh aise login form aur register form bnayenge phla kaam ye hoga ki eror ko ampty krdenge;
    setError("")
    try {
      const session=await authService.login(data);
      //agr session hai toh kuch krenge agr nhi hai toh kuch krenge;
      if(session){
        const userData = await authService.getCurrentUser()
        if(userData){
          dispatch(authLogin(userData))
          //ab agr useryha aachuka hai mtlb login ho chuka hai toh ishko yha rkhna hi kyu hai ushko bhj do
          //link se bhjenge toh click krna parega jha jaana hai isliye navigate ka use krenge jaise hi use login hoga automaticall phuch jaayega;
          navigate("/")
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }
  return (
<div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          {/* form jb bhi submit hoga wha pe handlesubmit call hoga handle submit ek method hai jiske andr humlog apna method dete hai(basically handlesubmit ek evevent hai
          ye event isliye jruri hai ki jitne bhi humlog input field denge wha pe humlog register use krte hai hence automaticaaly jo value input me di hai we use hojayega ushka state manage krna ka jrurt nhi)*/}
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    //ye mn hai toh ikho warna nhi ishko chatgpt se likhe hai //regexr website hai wha se likho;
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
