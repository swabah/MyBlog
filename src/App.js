import { Auth } from "./components/Auth";
import {BrowserRouter as Router , Routes , Route, Link, useNavigate} from 'react-router-dom'
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import './App.css'
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/firbase-config";


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
      <nav className="w-full h-24 bg-black  flex items-center justify-center text-xl font-semibold shadow-lg text-white drop-shadow-lg space-x-6">
        <Link to='/'>Home</Link>
        {!IsAuth ? ( <Link to='/Login'>Log in</Link> )
        : (
          <>
             <Link to='/createpost'>Create Post</Link>
             <button onClick={signUserOut}>Log Out</button>
          </> 
         )}
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
