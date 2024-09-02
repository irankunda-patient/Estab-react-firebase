import React, { useContext, useState } from 'react'
import LeftSideBar from '../Components/LeftSideBar'
import RightSideBar from '../Components/RightSideBar'
import { FaFacebookMessenger, FaSearch, FaUser } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import Logo from '../Components/Logo/Logo'
import { useNavigate } from 'react-router-dom'
import Chat from '../Components/Chat'
import Filter from '../Components/Filter/Filter'
import { tabsContext } from '../Contexts/Tabs'
import Settings from './Settings'
import Profile from './Profile'
import UserPref from './UserPref'
import { context } from '../Contexts/Theme'

const Main = () => {
  const { tab, setTab, filter, chat, settings } = useContext(tabsContext)
  const { darkMode } = useContext(context)

  return (
    <>
      <div className={`w-[100vw] h-[100vh] grid-t-cols max-sm:hidden`}>
        <LeftSideBar />
        <Chat />
        <RightSideBar />
      </div>
      <div className='w-full h-[100vh] sm:hidden lg:hidden'>

        <Logo />
        {tab === "chat" ? <Chat /> : null}
        {tab === "filter" ? <Filter /> : null}
        {tab === "settings" ? <Settings /> : null}
        {tab === "profile" ? <Profile /> : null}
        {tab === "theme" ? <UserPref /> : null}

        <div className='fixed bottom-0 w-full h-6 flex items-center justify-around p-10'>
          <FaHouse className={!darkMode ? 'text-slate-900 text-[20px]' : 'text-white text-[20px]'} />
          <FaFacebookMessenger className={!darkMode ? 'text-slate-900 text-[20px]' : 'text-white text-[20px]'} onClick={() => chat()} />
          <FaSearch className={!darkMode ? 'text-slate-900 text-[20px]' : 'text-white text-[20px]'} onClick={() => filter()} />
          <FaUser className={!darkMode ? 'text-slate-900 text-[20px]' : 'text-white text-[20px]'} onClick={() => settings()} />
        </div>
      </div>
    </>
  )
}

export default Main
