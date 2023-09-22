import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
        <Routes>
          <Route path="/signup" element={ <IsAnon> <SignupPage/> </IsAnon>}/>
          <Route path="/login" element={ <IsAnon> <LoginPage/> </IsAnon>}/>
        </Routes>

    </div>  
  )
}

export default App
