import React from 'react'
import{Container,Logo,LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
  const authStatus=useSelector((state)=>state.auth.status)
  const navigate=useNavigate()
  //jb bhi istrh ki navigation aar bnata hai nah to actually ek array bnta hai aur ushke upr loop lgaya jaata hai;
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <link to='/'>
            <Logo width='70px'/>
            </link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item)=>
              item.active ? (
                <li key={item.name}>
                  <button onClick={()=>navigate(/*ishke andr ek argument dena prta hai kha le kr jaaun*/item.slug)}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
                </li>//jo html element repeat hota hai wha pe humlog ko key lgana hota hai;
              ): null)}
              {/* agr banda login hai toh ushko logout ka option dikhayenge otherwise nhi */}
              {authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
//dekho humlog hr jgh button bna rhe hai hence baar baar bnane se achha hai ek baar hi bna lete hai aur ushko whi se use krte hai;
export default Header
