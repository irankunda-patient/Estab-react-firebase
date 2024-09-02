import React, { useContext, useState } from 'react'
import { FaEnvelope, FaGoogle, FaLock, FaMoon, FaSun, FaUser } from 'react-icons/fa'

import { context } from '../Contexts/Theme'
import { logIn, resetor, signInWithGoogle, signUp } from '../Config/firebaseConfig'
import Button from '../Components/Button/Button'

const Login = () => {
    const [currState, SetCurrState] = useState("Sign Up")
    const { darkMode, SetDarkMode, toggleThemeDark, toggleThemeLight } = useContext(context)
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (currState === 'Sign Up') {
            signUp(userName, email, password)
        } else {
            logIn(email, password)
        }
    }

    return (
        <div className='w-[100vw] h-[100vh] flex flex-col items-center pt-10 gap-5'>
            <div className='relative w-full flex justify-end px-10'><span className='flex gap-5 border p-1 rounded-full border-dashed border-slate-800'><FaMoon onClick={() => toggleThemeDark()} className={`${darkMode ? "text-white" : "text-black"} text-[30px] max-sm:text-[15px] rounded-full ${darkMode ? "border" : null} border-slate-400 p-1 cursor-pointer transition-all`} /><FaSun onClick={() => toggleThemeLight()} className={`text-slate-200 text-[30px] max-sm:text-[15px] ${!darkMode ? "border" : null} rounded-full p-1 cursor-pointer transition-all`} /></span></div>
            <h1 className={`flex items-center  gap-4 font-bold ${darkMode ? "text-slate-100" : "text-slate-800"}`}>{currState} or <p onClick={() => signInWithGoogle()} className='flex gap-2 bg-blue-400 rounded-full py-4 px-10 text-white cursor-pointer'>continue with <FaGoogle /></p></h1>
            <form onSubmit={handleSubmit} className='flex flex-col border-white border bg-white p-4 gap-3 rounded shadow-2xl max-sm:w-[80%]'>
                {currState === "Sign Up" ? <label className="flex items-center justify-center"><FaUser fill='gray' className='text-[20px]' /> <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder='Username' className='text-slate-800 p-1 w-[300px] text-center border-b outline-none' /></label> : null}
                <label className="flex items-center justify-center"><FaEnvelope fill='gray' /> <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' className='text-slate-800 p-1 w-[300px] text-center border-b outline-none' /></label>
                <label className="flex items-center justify-center"><FaLock fill='gray' /> <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='text-slate-800 p-1 w-[300px] text-center border-b outline-none' /></label>
                <Button type={"submit"} styles={`flex-1 bg-blue-400 rounded p-2 text-white`} text={currState === "Log In" ? "Log In now" : "Create Account"} />
                <p>{currState === "Sign Up" ? "Already have an account?" : "haven't account?"} <span className='text-blue-500 cursor-pointer' onClick={() => SetCurrState(currState === "Log In" ? "Sign Up" : "Log In")}>{currState === "Sign Up" ? "Login" : "Signup"}</span></p>
                <p onClick={() => resetor(email)} className='text-blue-500 cursor-pointer'>{currState === "Sign Up" ? null : "forget password?"}</p>
            </form>
        </div>
    )
}

export default Login