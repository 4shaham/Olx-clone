import React from 'react'
import Posts from '../Component/Posts/Post'
import NavBar from '../Component/NavBar/NavBar'
import Banner from '../Component/Banner/Banner'
import Footer from '../Component/Footer/Footer'

function HomePage() {
  return (
    <>
     <NavBar />
   <Banner/>
    <Posts/>
    <Footer/>
    </>
  )
}

export default HomePage
