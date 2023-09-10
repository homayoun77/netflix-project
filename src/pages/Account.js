import React from 'react'
import SavedShows from '../components/SavedShows'
import Footer from '../components/Footer'

function Account() {
  return (
    <div>
      <div className=' w-full text-white'>
        <img className='w-full h-[350px] object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/6c884f48-f7d8-4a59-9d25-b7c138813aee/c741e848-5f1b-4230-8400-909aa0a4ac80/US-en-20230807-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
        <div className=' bg-black/60 fixed top-0 left-0 w-full h-[450px]'></div>
        <div className=' absolute top-[18%] p-4 md:p-8'>
          <h1 className=' text-3xl md:text-5xl font-bold'>My Shows</h1>
        </div>
      </div>

      <SavedShows />
      
      <Footer />
    </div>
  )
}

export default Account