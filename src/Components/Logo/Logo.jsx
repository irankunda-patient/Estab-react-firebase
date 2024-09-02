import React, { useContext } from 'react'
import { FaBell } from 'react-icons/fa'
import { context } from '../../Contexts/Theme'

const Logo = () => {
    const { darkMode } = useContext(context)
    return (
        <div className='relative flex py-2 px-4 gap-2 border-b w-full items-center justify-between'>
            <div className='absolute w-[50px] h-[50px] rounded-full top-2 left-8 pink__gradient -z-0'></div>
            <h1 className='text-center font-bold text-[50px] h-full bg-url fill-slate-50 self-start'>Estab</h1>
            <FaBell className={!darkMode ? 'text-slate-900 text-[20px]' : 'text-white text-[20px]'} />
        </div>
    )
}

export default Logo
