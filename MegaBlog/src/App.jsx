import './App.css'
function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL)
  // istrh access lete hai jb create react ka use kr rhe hai toh but in vite;
  console.log(import.meta.env.VITE_APPWRITE_URL)
  return (
    <>
    <h1>heading</h1>
    </>
  )
}
//dekho sbse phla aur sbse inportant steps hai enviroment varibales
//humlog koi nah koi databse ya service use krenge jha pe apke aplication baat krna chiaye humlog ka jo bhi data base hai wha pe unique id,s honge password hone ya personal information hoga to humlog directly 
//react me use krenge toh dikkat hoga kyuki react frontend library hai agr koi chayega toh ye sb personal information nikal skta hai hence ushko personal rkhne ke liye humlog enviromental varibale ke bare me pdhte hai;
//envroment varibale project ke root me hone chaiye .env me dot mt chhorna
export default App
