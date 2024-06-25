import React, { useId } from 'react'

function Select({
    options,
    label,
    className="",
    ...props
},ref) {
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select {...props} id={id} ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
            {/* options ek aarray hoti hai loop lgane se phle check krlenge ki empty toh nhi agr empty me loop lga denge toh system crash kr jayega*/}
            {options?.map((option)=>(
                <option key={option} value={option}></option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)
//aise bhi forward ref me likhte hai another syntax hai agr starting forwardRef me wrap nhi kiye toh iss trh end me export krte smay bhi wrap kr skte hai;
