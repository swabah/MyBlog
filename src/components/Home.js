import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../Firebase/firbase-config';
import {FaBitbucket, FaPlus} from 'react-icons/fa'

function Home() {
  const [PostLists,setPostLists] = useState([])


  const postsCollectionRef = collection(db, 'posts')
  useEffect(() => {
   const getPosts = async ()=>{
    const data = await getDocs(postsCollectionRef)
    setPostLists(data.docs.map((doc)=>({...doc.data(), id : doc.id})))
   }
   getPosts()
  }, []);

  return (
    <div className='w-full h-full mx-auto space-y-5 lg:space-y-12 pt-6 md:pt-12 container flex flex-col items-center justify-center px-3'>
      {PostLists.map((data)=>(
        <div className='w-full md:w-[600px] h-auto border rounded-md drop-shadow-xl shadow-md'>
          <nav className='flex p-2 md:p-3 rounded-t-md bg-black text-white font-semibold items-center justify-between'>
            <Link to='/createpost'>
            <h2 className='cursor-pointer font-light'><FaPlus/></h2>
            </Link>
            <h2><FaBitbucket/></h2>
          </nav>
          <div className='w-full h-auto p-3'>
              <div className='w-full h-auto flex flex-col items-start'>
                <h2 className='font-bold capitalize opacity-90'>{data.Heading} </h2>
                <p className='font-medium mt-1 opacity-90'>{data.PostText}</p>
              </div>
          </div>
          <nav className='flex p-1.5 px-2 text-sm md:text-base md:p-3 rounded-b-md text-black font-semibold opacity-80 items-center justify-end'>
            <h2>@{data.author.name}</h2>
          </nav>
        </div>
      ))}
    </div>
  )
}

export default Home
