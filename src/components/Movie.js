import React, { useState } from 'react'

import { FaHeart, FaRegHeart } from 'react-icons/fa'

import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'


function Movie({ item }) {

    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)
    const { user } = UserAuth()

    const movieID = doc(db, 'users', `${user?.email}`, 'favorite', `${item?.id}`)

    const saveShow = async () => {
        if (user?.email) {
            setLike(!like)
            setSaved(true)
            await setDoc(movieID, {

                id: item.id,
                title: item.title || item.name,
                img: item.backdrop_path

            })
        } else {
            alert('Please log in to save a movie')
        }
    }

    return (
            <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative cursor-pointer p-2'>
                <img src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title || item?.name} />
                <div className='absolute top-0 left-0 w-full h-full opacity-0 hover:bg-black/60 hover:opacity-100 text-white'>
                    <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center h-full'>{item?.title || item?.name}</p>
                    <p onClick={saveShow}>
                        {like ? <FaHeart className=' absolute top-4 left-4 text-gray-400' /> : <FaRegHeart className=' absolute top-4 left-4 text-gray-300' />}
                    </p>
                </div>
            </div>
    )
}

export default Movie