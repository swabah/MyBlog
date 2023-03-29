import { Auth } from "./components/Auth";
import {BrowserRouter as Router , Routes , Route, Link, useNavigate} from 'react-router-dom'
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import './App.css'
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/firbase-config";
import { FaSignInAlt } from "react-icons/fa";


function App() {
  const [IsAuth,setIsAuth] = useState(false)


  const signUserOut = () =>{
    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/login'
    })
  }
  return (
    <>
     <Router>
      <nav className="w-full h-16 lg:h-24 px-3 bg-black  flex justify-center  text-base md:text-lg font-semibold shadow-lg text-white drop-shadow-lg space-x-6">
        <div className="w-full md:w-[600px]  flex items-center justify-between h-full">
        <Link to='/'>Home</Link>
        {!IsAuth ? ( <Link className="flex items-center" to='/Login'> <span className="pr-2"> Log in </span><FaSignInAlt/></Link> )
        : (
          <>
             <Link to='/createpost'>Create Post</Link>
             <button onClick={signUserOut} className="flex items-center" > <span className="pr-2"> Log Out </span><FaSignInAlt/></button>
          </> 
         )}
         </div>
      </nav>
        <Routes>
          <Route index path="/" element={<Home/>}/>
          <Route path="/CreatePost" element={<CreatePost IsAuth={IsAuth}/>}/>
          <Route path="/Login" element={<Auth setIsAuth={setIsAuth}/>}/>
        </Routes>
     </Router>
    </>
  );
}

export default App;
