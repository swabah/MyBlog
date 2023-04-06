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
    <div className='w-full h-auto mx-auto py-4 md:py-8 container bg-white grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start justify-center gap-5 px-1 md:px-3'>
      {PostLists.map((post)=>(
        <div key={post.id} className='w-full md:w-full h-auto  md:bg-gray-50 md:p-2 rounded-md'>
          <div className='w-full h-auto px-3'>
              <div className='w-full h-auto flex flex-col items-start py-2'>
                <div className='w-full h-auto flex flex-col items-start'>
                 <div className='flex flex-col md:flex-row items-start md:items-center justify-between w-full space-y-0.5 md:space-y-0'>
                  <div className='flex  items-center space-x-1'>
                    <img className='w-5 h-5' src={post.author.img} alt="Here Not defined image" />
                    <h2>{post.author.name}</h2>
                  </div>
                  <h2 className='text-xs font-medium items-center'>{post.created.date} | {post.created.time} </h2> 
                 </div>
                 <h2 className='text-base md:text-lg font-bold capitalize opacity-90 py-1 md:py-2'>{post.Heading} </h2>
                </div>
                <img src={post.image} className={`${post.image && 'h-auto w-full py-1.5 object-cover'}`} /> 
                <p id='scroll' className={`font-medium mt-1 opacity-90 overflow-x-hidden pr-1.5 ${post.PostText.length <= 200 ? 'h-auto' : 'h-52'} text-sm md:text-base`}>{post.PostText}</p>
              </div>
          </div>
          <nav className='flex p-2 md:p-3 rounded-b-md text-gray-700 font-semibold items-center justify-between'>
            <Link to='/createpost'>
            <div className='cursor-pointer font-normal'><FaPlus/></div>
            </Link>
            {/* <div className='text-red-700 active:text-red-400 hover:text-red-400'>
            {IsAuth && post.author.id === (auth.currentUser && auth.currentUser.uid) && (
              )}
              <button onClick={()=>{deletPost(post.id)}}>
              <FaBitbucket/></button>
            </div> */}
          </nav>
        </div>
        
      ))}
    </div>
    </div>
  )
}

export default Home
