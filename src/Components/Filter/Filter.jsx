import React, { useContext, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import assets from '../../assets/assets'
import { context } from '../../Contexts/Theme'
import { appContext } from '../../Contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import { tabsContext } from '../../Contexts/Tabs'


const Filter = () => {
    const { darkMode } = useContext(context)
    const navigate = useNavigate()
    const [toggleSearch, setToggleSearch] = useState(false)
    const { userData, chatData, messagesId, setMessagesId, chatUser, setChatUser, inputFilter, user, setUser, showSearch, setShowSearch, setChat, addChat } = useContext(appContext)
    const {chat} =useContext(tabsContext)

    const navigator = (item) => {
        chat()
        setChat(item)
    }
    return (
        <div className='relative flex flex-col py-2 gap-2 border-t border-b-slate-400 max-sm:px-4'>
            <label className={`search relative flex gap-2 bg-white items-center justify-center px-2 rounded-full ${toggleSearch ? " min-w-0 max-w-[100%] animate-scale-in" : "w-0"}`}>
                <input type="text" placeholder="Search" className={`flex-1 border-none outline-none text-slate-600 text-[15px] p-1 text-center rounded-full ${toggleSearch ? "visible min-w-0 max-w-[100%]" : "hidden"}`} />
                <FaSearch onClick={() => setToggleSearch(toggleSearch ? false : true)} className={`cursor-pointer mx-1 absolute left-[80vw] top-1 text-[25px] ${toggleSearch ? "text-slate-800" : "text-slate-100"}`} />
            </label>
            <div className='h-[73vh] scrolls overflow-auto mt-5'>
                {showSearch && user ?
                    <div onClick={addChat} className='flex gap-1 mb-4 hover:bg-slate-800 rounded-full transition-all cursor-pointer p-2'>
                        <img src={user.avatar} alt="image" className='w-12 rounded-full aspect-square' />
                        <label className='flex flex-col'>
                            <p className={`font-poppins ${!darkMode ? "text-slate-800" : "text-white"} cursor-pointer`}>{user.username}</p>
                            <p className={`font-poppins ${"text-slate-400"} cursor-pointer`}>{user.name}</p>
                        </label>
                    </div> :
                    chatData.map((item, index) => (
                        <div onClick={() => navigator(item)} key={index || item.rId} className={`flex gap-1 mb-4 hover:bg-slate-800 rounded-full transition-all cursor-pointer ${item.messageSeen || item.messageId === messagesId ? "" : "border border-blue-300"}`}>
                            <img src={item.userData.avatar} alt="image" className='w-12 rounded-full aspect-square' />
                            <label className='flex flex-col'>
                                <p className={`font-poppins ${!darkMode ? "text-slate-800" : "text-white"} cursor-pointer`}>{item.userData.username}</p>
                                <p className='text-[12px] text-slate-400 cursor-pointer'>{item.lastMessage}</p>
                            </label>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Filter
