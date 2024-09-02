import React, { createContext, useEffect, useState } from 'react'
import Chat from '../Components/Chat'
import Filter from '../Components/Filter/Filter'
import Settings from '../Pages/Settings'
import { useNavigate } from 'react-router-dom'

export const tabsContext = createContext()
const Tabs = (props) => {
    const [tab, setTab] = useState("chat")
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []); 

    const chat = () => {
        navigate(<Chat />)
        setTab("chat")
    }
    const filter = () => {
        navigate(<Filter />)
        setTab("filter")
    }
    const settings = () => {
        navigate(<Settings />)
        setTab("settings")
    }
    const value = {
        tab, setTab,
        chat,
        filter,
        settings,
        isMobile, setIsMobile
    }
    return (
        <tabsContext.Provider value={value}>
            {props.children}
        </tabsContext.Provider>
    )
}

export default Tabs
