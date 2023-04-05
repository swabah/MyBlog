import { auth,googleProvider } from '../Firebase/firbase-config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import OtpPhone from './OtpPhone';

export const Auth = ({setIsAuth})=>{
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

    let navigate =useNavigate()

    const signInWithGoogle = async () =>{
      await signInWithPopup(auth,googleProvider).then((res)=>{
        localStorage.setItem('IsAuth',true)
        navigate('/')
        setIsAuth(true)
        toast.success("Signed With Google!");
      })
    }

    console.log(auth?.currentUser?.email);
    console.log(auth);

    const signIn = async () =>{
       await createUserWithEmailAndPassword(auth ,email ,password )
        localStorage.setItem("IsAuth",true)
        navigate('/')
        setIsAuth(true)
        // toast.success("Signed Completly!");
    }

    return(
        <section className="h-auto w-full bg-gray-200 md:bg-gray-100">
          <div className=" h-full md:px-2  md:py-12 w-auto ">
          <Toaster toastOptions={{ duration: 2000 }} />
            <div
              className=" flex h-full items-center justify-center">
              <div className="md:w-10/12 lg:ml-6 lg:w-7/12 xl:w-5/12 border-2 pt-5 md:pt-12  p-3 md:p-16 bg-gray-200 h-full md:h-auto w-full md:rounded-lg">
                  {/* <OtpPhone setIsAuth={setIsAuth}/> */}
                  {/* <div
                    className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-400 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-400">
                    <p
                      className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                      OR
                    </p>
                  </div> */}
                {/* <form >
                   <div className="relative mt-4 md:mt-10 mb-4" >
                    <label
                      className="font-semibold capitalize mb-0 max-w-[90%]  truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out "
                      >Email address
                    </label>
                     <input 
                     type='email'
                     required
                      className=" ring-1 mt-1 focus:ring-gray-200 focus:ring-2 ring-gray-100 bg-gray-100  rounded border-none w-full outline-none"
                      onChange={(e)=>setemail(e.target.value)} value={email} placeholder="Enter Your Email" />
                  </div>
                  <div className="relative mb-6" >
                    <label
                      className="font-semibold capitalize mb-0 max-w-[90%]  truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out "
                      >Password
                    </label>
                    <input 
                      type='password'
                      className=" ring-1 mt-1 focus:ring-gray-200 focus:ring-2 ring-gray-100 bg-gray-100 rounded border-none w-full outline-none"
                      onChange={(e)=>setpassword(e.target.value)} value={password} placeholder="enter password" />
                  </div>
                  <button
                    type="submit"
                    onSubmit={signIn}
                    className="inline-block w-full text-black font-semibold rounded bg-gray-300 px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                    >
                        Sign in
                  </button>
                </form> */}
                  <div
                    className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-400 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-400">
                    <p
                      className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                      OR
                    </p>
                  </div>
                  <button
                    className="mb-3 w-full text-black font-semibold flex space-x-3 items-center justify-center rounded bg-gray-300 px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                    onClick={signInWithGoogle}
                    >
                    <FaGoogle/>
                    <span>login with Google</span>
                  </button>
              </div>
            </div>
          </div>
        </section>
    )
}