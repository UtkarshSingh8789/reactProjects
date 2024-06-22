import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import { Footer, Header } from './components'
function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL)
  // istrh access lete hai jb create react ka use kr rhe hai toh but in vite;
  // console.log(import.meta.env.VITE_APPWRITE_URL)
  // ************************************************************************************************

  //phle ek state nmayemge loading kyuki jb humlog appwrite se data fectch krenge toh hoskta hai kbhu production time lg jaaye
  //hence jb bhi kbhi humlog database ya network se kuch puchhna ho toh ek loading state bnayenge taaki if else lga ske agr loading true hai toh loading dikhayenge agr loading true nhi hai toh data dikhayenge;
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()
  //jaise he ye aplication load ho to ek useEffect lo aur puchho usse ki app loging ho ya nhi ho;
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      //agr usedata hai toh agr nhi hai toh current user hai hi nhi
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())//isse kya hoga humhara sttete humesa update hogya ya to current access ka acess hoga ya phir store me likha hoga aap logout ho;
      }
    })
    .finally(()=>setLoading(false))//jb sara kaam hojaye tb ye hota hai
  },[])
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        {/* outlet denge */}
        <Footer/>
      </div>
    </div>
  ) : null
}
//dekho sbse phla aur sbse inportant steps hai enviroment varibales
//humlog koi nah koi databse ya service use krenge jha pe apke aplication baat krna chiaye humlog ka jo bhi data base hai wha pe unique id,s honge password hone ya personal information hoga to humlog directly 
//react me use krenge toh dikkat hoga kyuki react frontend library hai agr koi chayega toh ye sb personal information nikal skta hai hence ushko personal rkhne ke liye humlog enviromental varibale ke bare me pdhte hai;
//envroment varibale project ke root me hone chaiye .env me dot mt chhorna
export default App
