import { createContext,useContext } from "react";
export const TodoContext=createContext({
    // by default ek object hai ushme kuch nah kuch to do hai har ek todo ka unique id hai;
    //functionality kya kya hai--
    //add todo
    //toggle hai mtlb ye btaskte hai complete hai ya nhi
    //edit option hai mtlb jis todo pe edit krenge usi ko edit krna hai hence isliye todos ko unique ids denge;
    //delete option bhi hai;
    // sara todos ke listing bhi ho rhi hai;
    todos:[
        {
            id:1,
            todo:"todo msg",
            completed:
            false,
        }//isi trh humare todos hote rhenge add but abhi mein kya krta hmm ek todo hi add krta hmm;
        //taaki mujhe model yaad rhe by default to humko empty array chaiye baad me delete krdenge   
    ],
    addTodo:
    (todo)=>{},
    updatedTodo:(id,todo)=>{
        //agr koi todo ko update krn ahi mtlb phle humko ushko delte rn hoga mtlb deleted todo ka id jrurut;
        //and new todo jo lenge we message chaiye jo todo me rhega;
        //isliye do variable le rhe hai;
    },
    deleteTodo:(id)=>{},//isme koi chij ka nhi bs click krenge todo ko toh delete hona chaiye isliye sirf id le rhe hai;
    toggleComplete:(id)=>{}
})
export const useTodo=()=>{
    return useContext(TodoContext)
}
export const TodoProvider=TodoContext.Provider
// ek dusra approch lete hai sare ko index.jsx contexts ke andr import lelete hai aur jishko jo chaiye hoa ushko ushko index.jsx se export krdenge;