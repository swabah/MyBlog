import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db, storage } from '../Firebase/firbase-config';
import {FaBitbucket, FaPlus} from 'react-icons/fa'
import './Style.css'
import { CgSpinner } from 'react-icons/cg';

function Home({IsAuth}) {
  const [PostLists,setPostLists] = useState([])
  const [loading, setLoading] = useState(false);


  // useEffect(() => {
  //   setLoading(true)
  //   const postsCollectionRef = query(collection(db, 'posts'),orderBy('created','desc'))
  //   const getPosts = async ()=>{
  //     const post = await getDocs(postsCollectionRef)
  //     setPostLists(post.docs.map((doc)=>({...doc.data(), id : doc.id})))
  //     }
  //     getPosts()
  //    setLoading(false)
  // }, []);

  useEffect(() => {
    setLoading(true)
    try {      
      const postsCollectionRef = query(collection(db, 'posts'), orderBy('created', 'desc'))
      const getPosts = async () => {
        try {
          const post = await getDocs(postsCollectionRef)
          setPostLists(post.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        } catch (error) {
          // handle the error here (e.g. show an error message)
          console.log(error)
        }
        setLoading(false)
      }
      getPosts()
    } catch (error) {
      console.log(error);
    }
  }, []); 

  const deletPost = async (id) =>{
    const postDoc = doc(db,'posts',id)
    await deleteDoc(postDoc)
  }

  return (
    <div className='w-full h-full relative'>
       {loading && ( 
      <div className='absolute inset-0 flex items-center justify-center w-full h-screen'>
         <CgSpinner size={35} className="mt-1 animate-spin" /> 
      </div>
          )}
    <div className='w-full h-auto mx-auto py-6 md:py-12 container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-auto items-start justify-center gap-5 px-3'>
      {PostLists.map((post)=>(
        <div key={post.id} className='w-full md:w-full h-auto border rounded-md drop-shadow-xl shadow-md'>
          <nav className='flex p-2 md:p-3 rounded-t-md bg-black text-white font-semibold items-center justify-between'>
            <Link to='/createpost'>
            <div className='cursor-pointer font-light'><FaPlus/></div>
            </Link>
            <div className='text-red-700 active:text-red-400 hover:text-red-400'>
            {IsAuth && post.author.id === (auth.currentUser && auth.currentUser.uid) && (
              <button onClick={()=>{deletPost(post.id)}}>
              <FaBitbucket/></button>
              )}
            </div>
          </nav>
          <div className='w-full h-auto px-3'>
              <div className='w-full h-auto flex flex-col items-start py-2'>
                <h2 className='text-base md:text-lg font-bold capitalize opacity-90 py-3'>{post.Heading} </h2>
                <img src={post.image} className={`${post.image && 'h-full w-full py-3 object-cover'}`} /> 
                <p id='scroll' className='font-medium mt-1 opacity-90 h-52 overflow-x-hidden pr-1.5 text-sm md:text-base'>{post.PostText}</p>
              </div>
          </div>
          <nav className='flex p-1.5 px-2 text-sm md:text-base md:p-3 rounded-b-md text-black font-semibold opacity-80 items-center justify-between'>
            <h2 className='text-xs'>{post.created.date} at {post.created.time}</h2>
            <div className='flex  items-center space-x-1'>
              <h2>{post.author.name}</h2>
              <img className='w-5 h-5' src={post.author.img} alt="" />
            </div>
              
          </nav>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Home
