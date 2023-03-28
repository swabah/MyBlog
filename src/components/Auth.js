import { auth,googleProvider } from '../Firebase/firbase-config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Auth = ({setIsAuth})=>{
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

    let navigate =useNavigate()

    const signInWithGoogle = () =>{
      signInWithPopup(auth,googleProvider).then((res)=>{
        localStorage.setItem('IsAuth',true)
        navigate('/')
        setIsAuth(true)
      })
    }

    console.log(auth?.currentUser?.email);

    const signIn = () =>{
        createUserWithEmailAndPassword(auth ,email ,password)
        localStorage.setItem('IsAuth',true)
        navigate('/')
        setIsAuth(true)
    }

    return(
        <section className="h-full w-full bg-gray-100">
          <div className=" h-full px-6 py-12 w-auto ">
            <div
              className=" flex h-full items-center justify-center">
              <div className="md:w-8/12 lg:ml-6 lg:w-5/12 border-2 p-16 bg-gray-200 h-full w-full rounded-lg">
                <form>
                   <div className="relative mb-6" data-te-input-wrapper-init>
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
            
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <label
                      className="font-semibold capitalize mb-0 max-w-[90%]  truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out "
                      >Password
                    </label>
                    <input 
                      type='password'
                      className=" ring-1 mt-1 focus:ring-gray-200 focus:ring-2 ring-gray-100 bg-gray-100 rounded border-none w-full outline-none"
                      onChange={(e)=>setpassword(e.target.value)} value={password} placeholder="enter password" />
                  </div>
            
                  <div className="mb-6 flex items-center justify-between">
                    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                      <input
                        required
                        className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary"
                        type="checkbox"
                        value=""
                        id="exampleCheck3"
                        checked />
                      <a
                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                         href='#'>
                        Remember me
                      </a>
                    </div>
                    <h2
                      className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                      >Forgot password?</h2>
                  </div>
            
                  <button
                    type="submit"
                    onClick={signIn}
                    className="inline-block w-full text-black font-semibold rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                    >
                        Sign in
                  </button>
                  <div
                    className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p
                      className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                      OR
                    </p>
                  </div>
                </form>
                  <button
                    className="mb-3 w-full text-black font-semibold items-center justify-center rounded bg-primary px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                    onClick={signInWithGoogle}
                    >
                    Continue with Google
                  </button>
              </div>
            </div>
          </div>
        </section>
    )
}