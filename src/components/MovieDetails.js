import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext'

function MovieDetails() {

    const movieID = useParams().id
    const [movie, setMovie] = useState({})
    const [genres, setGenres] = useState([])
    const { user } = UserAuth()


    const movieId = doc(db, 'users', `${user?.email}`, 'favorite', `${movie?.id}`)

    const saveShow = async () => {
        if (user?.email) {
            await setDoc(movieId, {

                id: movie.id,
                title: movie.title,
                img: movie.backdrop_path

            })
        } else {
            alert('Please log in to save a movie')
        }
    }


    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=d035f3b154fbfd9bfde7094b6746ea36&language=en-US`)
            .then(response => setMovie(response.data) & setGenres(response.data.genres))
    }, [])

    const truncateString = (string, num) => {
        if (string?.length > num) {
            return string.slice(0, num) + '...';
        } else {
            return string
        }
    }

    return (
        <>
            <div className='text-white w-full h-screen'>
                <div className='w-full h-full'>
                    <img className=' w-full h-screen object-cover opacity-70' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt="" />

                    <div className=' w-full h-screen absolute top-0 left-0 flex justify-center items-center md:px-4'>
                        <div className=' md:max-w-[1100px] md:h-[550px] w-full h-screen bg-black/80 md:rounded-lg p-4 md:flex'>
                            <div className='flex'>
                                <div className='w-[40%] pt-20 md:py-0'>
                                    <img className=' object-cover md:w-full md:h-[550px] rounded-lg' src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt="" />
                                </div>
                                <div className='w-[60%] pt-20 md:py-6 px-5 md:px-12'>
                                    <h1 className='text-xl md:text-4xl font-bold'>{movie.title}</h1>
                                    <p className='my-8 hidden md:block'><span className='text-yellow-500 font-bold'>Overview : </span>{truncateString(movie.overview, 250)}</p>
                                    <p className='my-2 md:my-4 text-sm md:text-base'><span className='text-yellow-500 font-bold'>Release date : </span>{movie.release_date}</p>
                                    <p className='my-2 md:my-4 text-sm md:text-base'><span className='text-yellow-500 font-bold'>Genres : </span>{genres.map(item => <span> &nbsp; {item.name} </span>)}</p>
                                    <p className='my-2 md:my-4 text-sm md:text-base'><span className='text-yellow-500 font-bold'>Time : </span>{movie.runtime} Min</p>
                                    <p className='my-2 md:my-4 text-sm md:text-base'><span className='text-yellow-500 font-bold'>Rating : </span>{movie.vote_average}</p>
                                    <p className='my-2 md:my-4 text-sm md:text-base'><span className='text-yellow-500 font-bold'>Budget : </span>{movie.budget}</p>

                                    <button className='hidden md:block border-2 border-white text-white hover:bg-slate-100 hover:text-black px-8 py-2 my-8 font-bold transition-all' onClick={saveShow}>Add to Favorite</button>
                                </div>
                            </div>
                            <div>
                                <p className='md:hidden my-2'><span className='text-yellow-500 font-bold'>Overview : </span>{truncateString(movie.overview, 250)}</p>
                            </div>
                            <button className='md:hidden w-full border-2 border-white text-white active:bg-slate-100 active:text-black px-8 py-2 my-4 font-bold transition-all' onClick={saveShow}>Add to Favorite</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetails