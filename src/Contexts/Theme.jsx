import React, { createContext, useEffect, useState } from 'react'

export const context = createContext()

const Theme = (props) => {
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        localStorage.theme === "dark" ? setDarkMode(true) : setDarkMode(false)
    }, [])


    const toggleThemeDark = () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setDarkMode(true)
        } else {
            document.documentElement.classList.remove('dark')
            setDarkMode(false)
        }

        if (!darkMode) {
            setDarkMode(true)
            localStorage.theme = 'dark'
        }
    }
    const toggleThemeLight = () => {
        if (darkMode) {
            setDarkMode(false)
            localStorage.theme = 'light'
        }
    }

    

    const value = {
        darkMode, setDarkMode,
        toggleThemeDark,
        toggleThemeLight
    }
    return (
        <context.Provider value={value}>
            {props.children}
        </context.Provider>
    )
}

export default Theme
