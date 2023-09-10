import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

import MovieList from '../components/MovieList'
import Footer from '../components/Footer'

function Movies() {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=d035f3b154fbfd9bfde7094b6746ea36&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc')
      .then(response => setMovies(response.data.results))
  }, [])

  const handelPageChange = (data) => {
    let pageNum = data.selected + 1
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d035f3b154fbfd9bfde7094b6746ea36&include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`)
      .then(response => setMovies(response.data.results))
  }

  return (
    <div>
      <div className=' max-w-[1400px] mx-auto pt-[75px]'>
        {
          movies.map((item) => {
            return <MovieList key={item.id} item={item} />
          })
        }

        <ReactPaginate
          pageCount={500}
          className=' text-white text-center my-10 flex justify-center items-center max-w-[900px] mx-auto'
          pageClassName='md:px-3 px-2 py-1 text-sm md:py-2 border'
          previousClassName='md:px-3 px-2 py-1 text-sm md:py-2 border'
          nextClassName='md:px-3 px-2 py-1 text-sm md:py-2 border'
          breakClassName='md:px-3 px-2 py-1 text-sm md:py-2 border'
          activeClassName='bg-red-600'
          previousLabel='Prev'
          onPageChange={handelPageChange}
        />

      </div>
      <Footer />
    </div>
  )
}

export default Movies