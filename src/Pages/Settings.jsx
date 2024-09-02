import React, { useContext } from 'react'
import assets from '../assets/assets'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../Config/firebaseConfig'
import { tabsContext } from '../Contexts/Tabs'

const Settings = () => {
    const navigate = useNavigate()
    const { tab, setTab, isMobile } = useContext(tabsContext)

    const profile = () => {
        if (isMobile) {
            setTab("profile")
        } else {
            if (tab !== "profile") {
                setTab("profile")
            }
            navigate('/profile')
        }
    }
    const theme = () => {

        if (isMobile) {
            setTab("theme");
        } else {
            if (tab !== "theme") {
                setTab("theme");
            }
            navigate('/theme');
        }
    }

    return (
        <div className='w-[100vw] h-[100vh] max-sm:h-[80vh] flex items-center justify-center relative'>
            <div className='text-slate-800 bg-white p-10 flex items-center flex-col gap-5 min-w-0 w-[400px] min-h-0 max-h-[80vh] shadow-2xl relative rounded'>
                <FaArrowLeft className='text-slate-800 absolute top-4 left-10 cursor-pointer max-sm:hidden' onClick={() => window.history.back()} />
                <p onClick={profile} className='cursor-pointer'>Profile</p>
                <p onClick={theme} className='cursor-pointer'>Theme</p>
                <p onClick={() => logOut()} className='cursor-pointer bg-blue-600 text-slate-100 p-2 rounded'>LogOut</p>
            </div>
        </div>
    )
}

export default Settings
