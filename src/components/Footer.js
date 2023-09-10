import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='w-full h-80 border-t border-gray-800 mt-10 md:flex items-center'>
      <Link to={'/'}>
        <h1 className='text-red-600 text-3xl md:text-5xl font-bold cursor-pointer border-b-gray-500 m-10'>NETFLIX</h1>
      </Link>
    </div>
  )
}

export default Footer