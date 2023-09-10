import React, { useState } from 'react'

import { FaHeart, FaRegHeart } from 'react-icons/fa'

import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

function MovieList({ item }) {

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

    const truncateString = (string, num) => {
        if (string?.length > num) {
            return string.slice(0, num) + '...';
        } else {
            return string
        }
    }

    return (
        <div className=' max-w-[900px] p-4 my-4 mx-auto'>
            <div className='  md:flex md:items-center border-2 border-gray-500'>
                <div className=' md:w-[40%] p-5'>
                    <img className=' bg-cover rounded-lg' src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`} alt="" />
                </div>
                <div className='md:w-[60%] p-5 relative'>
                    <p className=' cursor-pointer' onClick={saveShow}>
                        {like ? <FaHeart className=' absolute top-7 right-7 text-gray-400' /> : <FaRegHeart className=' absolute top-7 right-7 text-gray-300' />}
                    </p>
                    <h1 className=' text-gray-100 text-2xl font-bold'>{item.title}</h1>
                    <p className=' text-gray-100 py-3 text-sm'>{truncateString(item.overview, 250)}</p>
                    <div className='text-gray-100 font-bold flex justify-between items-center'>
                        <p className=' py-1'>Rating : {item.vote_average}</p>
                        <Link to={`${item.id}`}>
                            <button className=' border  px-4 py-1 hover:bg-white hover:text-red-500 hover:border-red-500 transition-all'>Show More</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieList