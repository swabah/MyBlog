import { Auth } from "./components/Auth";
import {BrowserRouter as Router , Routes , Route, Link, useNavigate} from 'react-router-dom'
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import './App.css'
import { useState , useEffect } from "react";
import MyBlogs from "./components/MyBlogs";
import Navbar from "./components/Navbar";


function App() {
  const [IsAuth,setIsAuth] = useState(localStorage.getItem("IsAuth"))

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6689490026355095';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    return () => {
      // Cleanup function: Remove the script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
     <Router>
      <Navbar setIsAuth={setIsAuth} IsAuth ={IsAuth}/>
        <Routes>
          <Route index path="/" element={<Home IsAuth ={IsAuth}/>}/>
          <Route path="/CreatePost" element={<CreatePost IsAuth={IsAuth}/>}/>
          <Route path="/MyBlogs" element={<MyBlogs IsAuth={IsAuth}/>}/>
          <Route path="/Login" element={<Auth setIsAuth={setIsAuth}/>}/>
        </Routes>
     </Router>
    </>
  );
}

export default App;
