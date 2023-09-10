import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

import Movie from './Movie'
import { Link } from 'react-router-dom'

function Row({ title, fetchURL, rowId }) {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(fetchURL).then(response => {
            setMovies(response.data.results)
        })
    }, [fetchURL])

    const slideLeft = () => {
        var slider = document.getElementById('slider' + rowId)
        slider.scrollLeft = slider.scrollLeft - 600
    }

    const slideRight = () => {
        var slider = document.getElementById('slider' + rowId)
        slider.scrollLeft = slider.scrollLeft + 600
    }
    console.log(movies)

    return (
        <div>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={slideLeft} size={50} className='bg-white absolute z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block rounded-full' />
                <div id={'slider' + rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {
                        movies.map((movie, id) => (
                            movie.title ?
                            <Link to={`/movies/${movie.id}`}>
                                <Movie key={id} item={movie} />
                            </Link>
                            :
                            <Link to={`/tvSeries/${movie.id}`}>
                                <Movie key={id} item={movie} />
                            </Link>
                        ))
                    }
                </div>
                <MdChevronRight onClick={slideRight} size={50} className='bg-white absolute z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block mx-1 rounded-full right-0' />
            </div>
        </div>
    )
}

export default Row