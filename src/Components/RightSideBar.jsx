import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { FaGem } from 'react-icons/fa'
import { FaGears } from 'react-icons/fa6'
import { context } from '../Contexts/Theme'
import { useNavigate } from 'react-router-dom'
import Settings from '../Pages/Settings'
import { tabsContext } from '../Contexts/Tabs'
import { logOut } from '../Config/firebaseConfig'
import { appContext } from '../Contexts/AppContext'
import Button from './Button/Button'

const RightSideBar = () => {
  const { darkMode } = useContext(context)
  const { chatUser, messages } = useContext(appContext)
  const [msgImgs, setMsgImgs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let tempVar = []
    messages.map((msg) => {
      if (msg.image) {
        tempVar.push(msg.image)
      }

    })
    setMsgImgs(tempVar);
  }, [messages])

  return (
    <div className=' text-white flex flex-col gap-4'>
      <div className='flex flex-col justify-center items-center p-4 gap-2'>
        <img src={chatUser ? chatUser?.userData.avatar : assets.avatar_icon} alt="profile" className='w-[50%] rounded-full' />
        <h2 className={`${!darkMode ? "text-slate-800" : "text-slate-50"} font-bold font-poppins`}>{chatUser?.userData.username}</h2>
        <p className='text-slate-400'>{chatUser?.userData.bio}</p>
      </div>
      <div className='flex justify-center items-center gap-4'>
        <p className={`${!darkMode ? "text-slate-800" : "text-slate-100"} border-b p-2 cursor-pointer hover:border-slate-900 hover:transition-all`}>Gallery</p>
        <p className='p-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500'>Add Rank</p>
      </div>
      <div className='text-center'>{msgImgs.length ? null : "No images"}</div>
      <div className='w-full min-h-0 max-h-[40vh] overflow-auto grid grid-cols-4 gap-1 p-2'>
        {msgImgs.map((url, index) => (<img onClick={() => window.open(url)} src={url} alt='gallery' key={index} />))}
      </div>
      <div className='flex items-center justify-around '>
        <button onClick={() => logOut()} className='bg-blue-600 p-2 rounded cursor-pointer hover:bg-blue-500'>Log Out</button>
        <p onClick={() => navigate("/settings")} className={`${!darkMode ? "text-slate-800" : "text-slate-100"} border-b p-2 cursor-pointer hover:border-slate-900 hover:transition-opacity flex gap-1`}><FaGears /> Settings</p>
      </div>
    </div>
  )
}

export default RightSideBar
