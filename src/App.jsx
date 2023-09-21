import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
        <Routes>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>

    </div>  
  )
}

export default App
