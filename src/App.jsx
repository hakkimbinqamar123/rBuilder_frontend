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
import Login from './Pages/Login'
import Register from './Pages/Register'
import LatexEditor from './Pages/LatexEditor'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/resume' element={<ResumeGenerator/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/latex-editor' element={<LatexEditor/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
