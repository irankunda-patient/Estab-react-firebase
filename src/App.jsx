import React, { useContext, useEffect, useState } from 'react'
import Chat from './Pages/Main'
import Login from './Auth/Login'
import Theme, { context } from './Contexts/Theme'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Filter from './Components/Filter/Filter'
import Settings from './Pages/Settings'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Config/firebaseConfig'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Profile from './Pages/Profile'
import { appContext } from './Contexts/AppContext'
import UserPref from './Pages/UserPref'

const App = () => {
  const { darkMode, setDarkMode } = useContext(context)
  const navigate = useNavigate()
  const { loadUserData } = useContext(appContext)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate('chat')
        loadUserData(user.uid)
      } else {
        navigate('/')
      }
    })
  }, [])
  return (
    <div className={darkMode ? `bg-primary transition` : "transition"}>
      <ToastContainer />
      <Routes>
        <Route path='/chat' element={<Chat />} />
        <Route path='/filter' element={<Filter />} />
        <Route path='/' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/Settings' element={<Settings />} />
        <Route path='/theme' element={<UserPref />} />
      </Routes>

    </div>
  )
}

export default App
