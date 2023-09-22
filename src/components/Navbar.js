import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { UserAuth } from '../context/AuthContext'

function Navbar() {

  const [nav, setNav] = useState(false)

  const handleNav = () => {
    setNav(!nav)
  }

  const { user, logOut } = UserAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full h-[75px] absolute'>
      <Link to={'/'}>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>NETFLIX</h1>
      </Link>


      <div className='hidden md:flex justify-end bg-black/60 w-1/2 py-2 rounded'>
        <Link to={'/tvSeries'}>
          <p className=' text-gray-200 hover:border-b-2 px-4 font-bold'>TV Series</p>
        </Link>
        <Link to={'/movies'}>
          <p className=' text-gray-200 hover:border-b-2 px-4 font-bold'>Movies</p>
        </Link>
      </div>

      {
        user?.email ?
          <>
            <div className='hidden md:flex'>
              <Link to={'/account'}>
                <button className='text-white py-2 px-4 rounded mr-2 bg-slate-300/20'>{user?.displayName}</button>
              </Link>

              <button onClick={handleLogout} className='bg-red-600 py-2 px-4 rounded text-white'>Logout</button>

            </div>

            <div className='md:hidden'>
              <Link to={'/account'}>
                <button className='text-white text-sm py-1 px-2 rounded mr-2 bg-slate-300/20'>{user?.displayName}</button>
              </Link>
            </div>
          </>
          :

          <div className='hidden md:flex'>
            <Link to={'/login'}>
              <button className='text-white py-2 px-4 rounded mr-2 hover:bg-red-600'>Sign In</button>
            </Link>
            <Link to={'/signup'}>
              <button className='bg-red-600 py-2 px-4 rounded text-white'>Sign Up</button>
            </Link>
          </div>
      }

      <div onClick={handleNav} className='block md:hidden cursor-pointer p-1 text-white ' >
        {
          nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />
        }
      </div>

      <div onClick={handleNav} className={nav ? 'fixed right-0 top-0 w-[16%] h-full  ease-in-out duration-500' : 'fixed right-[-100%]'}></div>
        <div className={nav ? 'fixed left-0 top-0 w-[84%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'fixed left-[-100%]'}>

          <div className=' p-5 border-b border-b-gray-500'>
            <Link to={'/'}>
              <h1 onClick={handleNav} className='text-red-600 text-3xl font-bold cursor-pointer border-b-gray-500'>NETFLIX</h1>
            </Link>
            {
              user?.email ?
                <div className='my-4 text-sm'>
                  <Link to={'/account'}>
                    <button onClick={handleNav} className='text-white py-2 px-4 rounded mr-2 bg-slate-300/20'>{user?.displayName}</button>
                  </Link>

                  <button onClick={() => { handleLogout(); handleNav() }} className='bg-red-600 py-2 px-4 rounded text-white'>Logout</button>

                </div>

                :

                <div className='my-4'>
                  <Link to={'/login'}>
                    <button onClick={handleNav} className='text-white py-2 px-4 rounded mr-2 hover:bg-red-600'>Sign In</button>
                  </Link>
                  <Link to={'/signup'}>
                    <button onClick={handleNav} className='bg-red-600 py-2 px-4 rounded text-white'>Sign Up</button>
                  </Link>
                </div>
            }
          </div>

          <div className='p-5'>
            <Link to={'/movies'}>
              <p onClick={handleNav} className=' text-lg text-gray-200 hover:border-b-2 font-bold'>Movies</p>
            </Link>
            <Link to={'/tvSeries'}>
              <p onClick={handleNav} className=' text-lg text-gray-200 hover:border-b-2 font-bold mt-4'>TV Series</p>
            </Link>
          </div>



        </div>

    </div>
  )
}

export default Navbar