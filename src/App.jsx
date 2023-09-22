//import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'

import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
//import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import CreateMovie from './pages/CreateMovie'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar';

function App() {
  return (
    <div className='App'>
      <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/create-movie" element={<CreateMovie/>}/>

          <Route path="/signup" element={ <IsAnon> <SignupPage/> </IsAnon>}/>
          <Route path="/login" element={ <IsAnon> <LoginPage/> </IsAnon>}/>
        </Routes>
      
    </div>  
  )
}

export default App
