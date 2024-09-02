import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import assets from '../assets/assets'
import { context } from '../Contexts/Theme'
import { appContext } from '../Contexts/AppContext'
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../Config/firebaseConfig'
import { toast } from 'react-toastify'


const LeftSideBar = () => {
    const { darkMode } = useContext(context)
    const { userData, chatData, messagesId, setMessagesId, chatUser, setChatUser, inputFilter, user, setUser, showSearch, setShowSearch, setChat, addChat } = useContext(appContext)

    return (
        <div className={`border-r border-[gray] p-4 flex flex-col justify-center gap-5`}>
            <div className='relative flex flex-col py-2 gap-2 border-b border-b-slate-400'>
                <div className='absolute bg-white w-[50px] h-[50px] rounded-full top-2 left-8 pink__gradient -z-0'></div>
                <h1 className='text-center font-bold text-[50px] w-full h-full bg-url fill-slate-50'>Estab</h1>
                <label className="search flex gap-2 bg-white items-center justify-center px-1 rounded-full">
                    <input onChange={inputFilter} type="text" placeholder="Search " className='border-none outline-none text-slate-600 text-[15px] p-1 text-center rounded-full' />
                    <FaSearch className='cursor-pointer mx-1 text-slate-800' />
                </label>
            </div>
            <div className='h-[73vh] scrolls overflow-auto'>
                {showSearch && user ?
                    <div onClick={addChat} className='flex gap-1 mb-4 hover:bg-slate-800 rounded-full transition-all cursor-pointer p-2'>
                        <img src={user.avatar} alt="image" className='w-12 rounded-full aspect-square' />
                        <label className='flex flex-col'>
                            <p className={`font-poppins ${!darkMode ? "text-slate-800" : "text-white"} cursor-pointer`}>{user.username}</p>
                            <p className={`font-poppins ${"text-slate-400"} cursor-pointer`}>{user.name}</p>
                        </label>
                    </div> :
                    chatData.map((item, index) => (
                        <div onClick={() => setChat(item)} key={index || item.rId} className={`flex gap-1 mb-4 hover:bg-slate-800 rounded-full transition-all cursor-pointer ${item.messageSeen || item.messageId === messagesId ? "" : "border border-blue-300"}`}>
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

export default LeftSideBar
