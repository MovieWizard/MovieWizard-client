//import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import CreateMovie from './pages/CreateMovie'
import HomePage from './pages/HomePage'
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <div className='App'>
      
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/create-movie" element={ <IsPrivate> <CreateMovie/> </IsPrivate> }/>
          <Route path="/:movieId" element={<MovieDetails/>}/>

          <Route path="/signup" element={ <IsAnon> <SignupPage/> </IsAnon>}/>
          <Route path="/login" element={ <IsAnon> <LoginPage/> </IsAnon>}/>
        </Routes>
      
    </div>  
  )
}

export default App
