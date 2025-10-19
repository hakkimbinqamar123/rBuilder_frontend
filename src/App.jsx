import { useState } from 'react'
import './App.css'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import ResumeGenerator from './Pages/ResumeGenerator'
import PageNotFound from './Pages/PageNotFound'
import History from './Pages/History'
import Header from './Components/Header'
import Form from './Pages/Form'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/resume' element={<ResumeGenerator/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
