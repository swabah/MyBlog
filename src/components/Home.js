import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../Firebase/firbase-config';

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
    <div className='w-full h-full mx-auto container flex flex-col items-center justify-center'>
      {PostLists.map((data)=>(
        <div>{data.Heading}</div>
      ))}
    </div>
  )
}

export default Home
