import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
function LogoutBtn() {
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
        //humlog ko promise millega toh ushko .then se handle krna hoga
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
  //logout dikhana ya nhi dikhan ye humlog conditionally render se check krna hoga agr login user toh hi dikhayenge logout button;
}

export default LogoutBtn
