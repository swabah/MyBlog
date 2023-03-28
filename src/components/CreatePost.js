import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../Firebase/firbase-config'

function CreatePost({IsAuth}) {
  const [Heading , setHeading ] = useState('')
  const [PostText , setPostText ] = useState('')

  let navigate = useNavigate()

  const postCollectionRef = collection(db, 'posts')

  const createpost = async () =>{
    await addDoc(postCollectionRef,{
      Heading,
      PostText,
      author :{name: auth.currentUser.displayName , id : auth.currentUser.uid}
    })
    navigate('/')
  }

  useEffect(() => {
    if (!IsAuth) {
      navigate('/login')
    }
  }, []);

  return (
    <div className='w-full h-full flex items-center justify-center py-20'>
       <div className='p-5 lg:p-12 rounded border w-[600px] h-full'>
        <div className='w-full h-auto flex flex-col items-start'>
          <label htmlFor="name" className='drop-shadow-md text-lg font-semibold '>Heading</label>
          <input type="text" required onChange={(e)=>setHeading(e.target.value)} placeholder='Type Here' className=' ring-1 mt-1 focus:ring-gray-200 focus:ring-2 ring-gray-100 rounded border-none w-full outline-none'/>
        </div>
        <div className='w-full h-auto flex flex-col items-start'>
          <label htmlFor="name" className='drop-shadow-md text-lg font-semibold mt-3'>Post Content</label>
          <textarea type="text" required onChange={(e)=>setPostText(e.target.value)} placeholder='Type Here' className='ring-1 mt-1 focus:ring-gray-200 focus:ring-2 ring-gray-100 rounded w-full border-none outline-none'/>
        </div>
        <button 
        onClick={createpost}
        className=" w-full mt-5 text-black font-semibold items-center justify-center rounded bg-primary px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
        >Submit Button</button>
       </div>
    </div>
  )
}

export default CreatePost
