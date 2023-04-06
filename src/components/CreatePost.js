import { addDoc, collection ,serverTimestamp,Timestamp} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db, storage } from '../Firebase/firbase-config'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { v4 } from "uuid";
import { CgSpinner } from 'react-icons/cg'

function CreatePost({IsAuth}) {
  const [Heading , setHeading ] = useState('')
  const [PostText , setPostText ] = useState('')
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate()

  
  const createpost = async () =>{
    setLoading(true);

    try {
       if (imageUpload == null) return;
       const postCollectionRef = collection(db, 'posts')
       const imageRef = ref(storage, `blog-img/${imageUpload.name + v4()}`);
       await uploadBytes(imageRef, imageUpload).then((snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        const date = new Date()
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
         getDownloadURL(snapshot.ref).then((url) => {
           addDoc(postCollectionRef,{
            Heading,
            PostText,
            author :{name: auth.currentUser.displayName , id : auth.currentUser.uid , img : auth.currentUser.photoURL},
            image : url,
            created : {date :formattedDate , time : formattedTime}
          })
           setImageUrls(url);
         });
       });
      navigate('/')
     setLoading(false);

    } catch (error) {
      console.log(error);
    }
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
          <label htmlFor="name" className='drop-shadow-md text-lg font-semibold '>Image Uplaod</label>
          <input type="file" required onChange={(event) => {setImageUpload(event.target.files[0]);}} placeholder='Type Here' className=' ring-1 mt-2 focus:ring-gray-200 focus:ring-2 ring-gray-100 rounded border-none w-full outline-none'/>
        </div>
        <div className='w-full h-auto flex flex-col items-start'>
          <label htmlFor="name" className='drop-shadow-md text-lg font-semibold mt-3'>Heading</label>
          <input type="text" required onChange={(e)=>setHeading(e.target.value)} placeholder='Type Here' className=' ring-1 mt-1 focus:ring-gray-200 focus:ring-2 ring-gray-100 rounded border-none w-full outline-none'/>
        </div>
        <div className='w-full h-auto flex flex-col items-start'>
          <label htmlFor="name" className='drop-shadow-md text-lg font-semibold mt-3'>Post Content</label>
          <textarea type="text" required onChange={(e)=>setPostText(e.target.value)} placeholder='Type Here' className='ring-1 mt-1 focus:ring-gray-200 focus:ring-2 ring-gray-100 rounded w-full border-none outline-none'/>
        </div>
        <button 
        onClick={createpost}
        className={` w-full mt-5 text-black font-semibold flex items-center space-x-2 justify-center ${loading && 'bg-opacity-60 mt-3'} rounded bg-primary px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]`}
        >
          {loading ? (  <CgSpinner size={25} className="mt-1 animate-spin" />  ) : (<span> Submit Button</span>)}
        </button>
       </div>
    </div>
  )
}

export default CreatePost
