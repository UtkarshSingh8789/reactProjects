import { useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import { useEffect } from 'react'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos,setTodos]=useState([])
  const addTodo=(todo)=>{
    //todo humlog ko form ke andr se millega;
    setTodos((prev)=>[...prev,{id:Date.now(),...todo}])//isse kya hoga sara values jo todos ke andr hogi we delete hojayengi but humlog nhi chlate naya todo ya toh phle add ho ya toh aakhri me;
    //isme kya krenge prevarray me add kr rhe new todo nad new tod jo add krenge ushka id unique ho ushke liye Date.now() usse kiye
    //baaki jo todo denge we jew ke tew aajaye ushke liye spread operator kyuki todo apne me object hai;;  
  }
  const updatedTodo=(id,todo)=>{
    // ab kn sa id kn sa update ho;
    // todos humlog ka array hai to array pe ek loop lgana hoga phir find krna hoga kn se id wale todo ko update krna chahte ho;
    //hrek todo ek object hai and hr ek todos ke pass ek unique id hai;
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id
    ===id ? todo:prevTodo)))
  }
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
    //filter hr ek todovalue pe jaayega aur humko bolna hoga ki ab sarri value ko aane do sirdt ushko mt aane do jiski value id ke brbr hai;
    //filter always work on true statement;
    //purane array ke andr saari values hai ab humlog ko newarrays is trh bnana hai taki hai jishka id diye hai ushko chhorke 
    //sara value rhe ish array me;
  }
  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id
  ===id ? {...prevTodo,completed:!prevTodo.completed} :
  prevTodo))
  }//phle maine sare value leliya pgir complete ko overwrite krdiya;

  //from herenow we start the concept of local storage;
  useEffect(()=>{
   const todos= JSON.parse(localStorage.getItem("todos"))//key dete hai get me set me key + value;
    //ye aapko value return rdega but kr rha string but humko toh chaiye array me mtlb json me krdo convert
    if(todos && todos.length){
      setTodos(todos)
    }
  },[])// ye toh hogyi koi humlog page relod kr rhe toh humlog ka sara values todos me agyi;
  //ek aur kaam hai jaise hi humlog ka values todos me add ho rha waise hi humlog ushko local storage me store krwa de
  //localstorage me tb add krwana chahta hmm jb valus todos me jaaye to local storage me update ho hence ek aur use effect use krenge;
  //ek me nhi lekh rhe hai kyyuki jb bhi todos me change hoga we get bhi krega complexity high hojayega;
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))//ishke andr key and value dena hota hai
    //***note get and set me key same name ka hona chaiye */
    //localstorage string value leta hai isliye todos ko string me change kiye;
  },[todos])
  return (
    <TodoProvider value={{todos,addTodo,updatedTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {/* todos ke andr loop lgana hoga  and loop ke andr humlog todo item o prop bhi pass krenge aur ushko call krenge;*/}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'> 
                            {/* div loop ke andr repeat hoga isliye humko div ko id dena hoga nhi toh performance degrade hpjayegi*/}
                            <TodoItem todo={todo}/>
                            {/* prop pass kr rhe hai; */}
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
