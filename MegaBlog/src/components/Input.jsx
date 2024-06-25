import React,{useId} from 'react'

// function Input() {
//   return (
//     <div>
      
//     </div>
//   )
// } //for easier way write arrow function;
const Input=React.forwardRef(({
    label,
    type="text",
    className="",
    ...props
},ref)=>{
    const id=useId()
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 p1-1' htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full${className}`}
            ref={ref}
            {...props}
            id={id} //label pe aur input pe dono pe unique id lg gya hai ttaki koi click kre label pe toh use lebel pe input le ske
            />
        </div>
    )
})

export default Input
