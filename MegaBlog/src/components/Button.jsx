import React from 'react'
function Button({
    children,//basically ye button ka naam hai
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props
}) {
  return (
    <div>
      <button className={`px-4 py-4 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}>{children}
      </button>
    </div>
  )
}

export default Button
//dekho humlog input fiel bnayenge jo login me signup me hr jgh use aayega
//similary humlog button bhi many time use krenge ishke liye humlog kya krte hai alg alg component bna lete hai jaise button ka bnaye;
//and ye button ka refrence use krenge jha button required hoga toh wha pe humlog ka kaam aata hai forward refrence hook;
// mujhe button ke state ka ccess yha nhi chaiye jha use krna wha chaiye us case me humlog forward refrencehook ka use krte hai;
