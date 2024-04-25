import { useEffect, useState } from 'react'
import { Route ,Routes , BrowserRouter, useNavigate } from "react-router-dom"
import './App.css'
import Signin from './pages/Signin'
import AuthCard from './components/AuthCard'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import axios from 'axios'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Logout from './pages/Logout'
import Auth from './pages/Auth'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signup" element={<AuthCard><Signup/></AuthCard>}/>
        <Route path="/signin" element={<AuthCard><Signin/></AuthCard>}/>
        <Route path="/dashboard" element={<Auth><Dashboard/></Auth>}/>
        <Route path="/send" element={<SendMoney/>}/>
        <Route path='/profile' element={<AuthCard><Profile/></AuthCard>}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/auth' element={<Auth />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
