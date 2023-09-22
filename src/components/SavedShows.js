import React, { useEffect, useState } from 'react'
// import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { getDocs, collection, query, limit, startAfter, orderBy, deleteDoc, doc, } from 'firebase/firestore'

import { AiOutlineClose } from 'react-icons/ai'

function SavedShows() {

  const { user } = UserAuth()
  const [movies, setMovies] = useState([])

  // const slideLeft = () => {
  //   var slider = document.getElementById('slider')
  //   slider.scrollLeft = slider.scrollLeft - 500
  // }

  // const slideRight = () => {
  //   var slider = document.getElementById('slider')
  //   slider.scrollLeft = slider.scrollLeft + 500
  // }

  const [lastVisible, setLastVisible] = useState('')

  const getData = async () => {
    const first = query(collection(db, 'users', `${user?.email}`, 'favorite'), orderBy('title'), startAfter(lastVisible), limit(10));
    const data = await getDocs(first);
    setLastVisible(data.docs[data.docs.length - 1])
    data.forEach((doc) => {
      const movieData = doc.data()
      setMovies(arr => [...arr, movieData])
    })

  }
  useEffect(() => {
    getData()
  }, [user])


  const handelDelete = async (id) => {
    const result = movies.filter((item) => item.id !== id)
    setMovies(result)
    await deleteDoc(doc(db, 'users', `${user?.email}`, 'favorite', `${id}`))
  }


  // const movieRef = doc(db, 'users', `${user?.email}`)
  // const deleteShow = async (passedID) => {
  //   try {
  //     const result = movies.filter((item) => item.id !== passedID)
  //     await updateDoc(movieRef, {
  //       favorites: result
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div>
      <h2 className='text-white font-bold md:text-xl p-6'>My Shows</h2>
      <div className='relative flex flex-col items-center group justify-center'>
        {/* <MdChevronLeft onClick={slideLeft} size={30} className='bg-white absolute z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block h-full' /> */}
        <div id={'slider'} className='max-w-[1400px] h-full flex flex-wrap px-4'>
          {
            movies.map((item, id) => (
              <>
                <div key={id} className='w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 inline-block relative cursor-pointer p-2'>
                  <img src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                  <div className='hidden lg:block absolute top-0 left-0 w-full h-full opacity-0 hover:bg-black/60 hover:opacity-100 text-white'>
                    <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center h-full'>{item?.title}</p>
                    <p onClick={() => handelDelete(item?.id)} className=' absolute top-4 right-4 text-gray-300 font-bold'><AiOutlineClose size={20} /></p>
                  </div>
                  <div className='flex items-center justify-between lg:justify-center gap-x-10 mt-1 mx-1'>
                    <p className='text-white text-center text-xs md:text-sm md:font-bold lg:text-base overflow-hidden'>
                      {item?.title || item?.name}
                    </p>
                    <p className='lg:hidden text-gray-300' onClick={() => handelDelete(item?.id)}>
                      <AiOutlineClose size={20} />
                    </p>
                  </div>
                </div>
              </>
            ))
          }
        </div>
        <div>
          <button className='text-gray-200 border border-gray-200 px-4 py-2 rounded my-8 font-bold md:active:scale-110 lg:hover:scale-110 transition-all' onClick={getData}>Show More</button>
        </div>
        {/* <MdChevronRight onClick={slideRight} size={30} className='bg-white absolute z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block mx-1 h-full right-0' /> */}
      </div>
    </div>
  )
}

export default SavedShows