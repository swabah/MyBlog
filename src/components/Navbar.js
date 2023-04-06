import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { FaAlignRight, FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { auth } from '../Firebase/firbase-config'
import { Dialog, Disclosure} from '@headlessui/react'


function Navbar({IsAuth,setIsAuth}) {

    const [DropdownOpen, setDropdownOpen] = useState(false)

    const signUserOut = () =>{
        signOut(auth).then(()=>{
          localStorage.clear()
          setIsAuth(false)
          window.location.pathname = '/login'
        })
      }

      const navbarItems = [
        {
          name: 'Create Post',
          url: '/createpost'
        },
        {
          name: 'My Blogs',
          url: '/MyBlogs'
        },
      ];

  return (
    <nav className="w-full h-16 px-5 bg-black  flex justify-between  text-base md:text-lg font-medium shadow-lg text-white drop-shadow-lg space-x-6">
      <div className="w-full  flex items-center justify-between h-full">
        <Link to='/'>Home</Link>
        <div className="space-x-5 flex items-center hidden lg:flex">
        {!IsAuth ? ( <Link className="flex items-center" to='/Login'> <span className="pr-2"> Log in </span><FaSignInAlt/></Link> )
        : (
          <>
             <Link to='/createpost'>Create Post</Link>
             <Link to='/MyBlogs'>My Blogs</Link>
             <button onClick={signUserOut} className="flex items-center" > <span className="pr-2"> Log Out </span><FaSignInAlt/></button>
          </> 
         )}
        </div>
        <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setDropdownOpen(true)} 
              >
                <span className="sr-only">Open main menu</span>
                <FaAlignRight className={`h-5 w-5 md:w-6 md:h-6 text-white `} aria-hidden="true" />
              </button>
        </div>
     </div>
     <Dialog as="div" className="lg:hidden" 
               open={DropdownOpen} 
               onClose={setDropdownOpen}>
                 <div className="fixed inset-0 z-50 " />
                 <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 backdrop-blur-lg bg-opacity-70">
                   <div className="flex items-center justify-between">
                     <div onClick={() => { window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} className="-m-1.5 p-1.5">
                       <span className="sr-only">blog dash</span>
                     </div>
                     <button
                       type="button"
                       className="-m-2.5 rounded-md p-2.5 text-gray-700"
                       onClick={() => setDropdownOpen(false)}
                     >
                       <span className="sr-only">Close menu</span>
                       <FaAlignRight className="h-6 w-6 text-[#000]   hover:text-[#72bf44]" aria-hidden="true" />
                     </button>
                   </div>
                   <div className="mt-6 flow-root">
                     <div className="-my-6 divide-y divide-gray-500/10">
                       <div className="space-y-2 py-6">
                         <Disclosure as="div" className="-mx-3 ">
                           {({ open }) => (
                             <>
                                      {!IsAuth ? ( 
                                       <Disclosure.Button className="flex flex-col w-full cursor-pointer items-center justify-between  py-2 pl-3 pr-3.5 text-base text-[#1c415d] hover:text-[#72bf44] font-semibold leading-7 hover:bg-gray-200 border-b">
                                          <Link className="flex items-center" to='/Login' onClick={() => setDropdownOpen(false)}> <span className="pr-2"> Log in </span><FaSignInAlt/></Link> 
                                       </Disclosure.Button>
                                      )
                                        : (
                                          <>
                                             <Disclosure.Button className="flex w-full cursor-pointer items-center justify-between  py-2 pl-3 pr-3.5 text-base text-[#1c415d] hover:text-[#72bf44] font-semibold leading-7 hover:bg-gray-200 border-b">
                                             <Link to='/createpost' onClick={() => setDropdownOpen(false)}>Create Post</Link>
                                             </Disclosure.Button>
                                             <Disclosure.Button className="flex  w-full cursor-pointer items-center justify-between  py-2 pl-3 pr-3.5 text-base text-[#1c415d] hover:text-[#72bf44] font-semibold leading-7 hover:bg-gray-200 border-b">
                                             <Link to='/MyBlogs' onClick={() => setDropdownOpen(false)}>My Blogs</Link>
                                             </Disclosure.Button>
                                             <Disclosure.Button className="flex w-full cursor-pointer items-center justify-between  py-2 pl-3 pr-3.5 text-base text-[#1c415d] hover:text-[#72bf44] font-semibold leading-7 hover:bg-gray-200 border-b">
                                             <button onClick={() =>setDropdownOpen(false)} className="flex items-center" > <span onClick={signUserOut} className="pr-2"> Log Out </span><FaSignInAlt/></button>
                                            </Disclosure.Button>
                                          </> 
                                         )}
                             </>
                           )}
                         </Disclosure>
                       </div>
                     </div>
                   </div>
                 </Dialog.Panel>
               </Dialog>
  </nav>
  )
}

export default Navbar
