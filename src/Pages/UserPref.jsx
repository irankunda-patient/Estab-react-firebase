import React, { useContext } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { context } from '../Contexts/Theme'

const UserPref = () => {
    const { darkMode, toggleThemeDark, toggleThemeLight } = useContext(context)
    return (
        <div className='w-[100vw] h-[100vh] max-sm:h-[80vh] flex items-center justify-center relative'>
            <div className='text-slate-800 bg-white p-10 flex items-center flex-col gap-5 min-w-0 w-[400px] min-h-0 max-h-[80vh] shadow-2xl relative rounded'>
                <FaArrowLeft className='text-slate-800 absolute top-4 left-10 cursor-pointer max-sm:hidden' onClick={() => window.history.back()} />
                <h2 className='text-slate-800 font-bold'>Theme</h2>
                <button onClick={() => toggleThemeDark()} className={`${darkMode ? "bg-slate-900" : "text-slate-950"} focus:bg-slate-950 p-2 w-full text-slate-100`}>Dark</button>
                <button onClick={()=> toggleThemeLight()} className={`${!darkMode ? "bg-slate-900" : "text-slate-950"} focus:bg-slate-950 p-2 w-full text-slate-100`}>Light</button>
            </div>
        </div>
    )
}

export default UserPref
