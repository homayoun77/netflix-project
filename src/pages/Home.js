import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
        <Main />
        <Row rowId='1' title='UpComing' fetchURL={requests.requestUpcoming} />
        <Row rowId='2' title='Popular' fetchURL={requests.requestPopular} />
        <Row rowId='3' title='Trending' fetchURL={requests.requestTrending} />
        <Row rowId='4' title='TopRated Movies' fetchURL={requests.requestTopRated} />
        <Row rowId='5' title='TopRated Series' fetchURL={requests.requestTopRatedSeries} />
        <Footer />
    </div>
  )
}

export default Home