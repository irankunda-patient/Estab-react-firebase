import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { auth, db } from '../Config/firebaseConfig'
import { useNavigate } from 'react-router-dom'

export const appContext = createContext()
const AppContext = (props) => {
    const [userData, setUserData] = useState(null)
    const [chatData, setChatData] = useState([])
    const [messagesId, setMessagesId] = useState(null)
    const [messages, setMessages] = useState([])
    const [chatUser, setChatUser] = useState(null)
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [showSearch, setShowSearch] = useState(false)
    // console.log(userData);


    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, "users", uid)
            const userSnap = await getDoc(userRef)
            const userData = userSnap.data()

            setUserData(userData)

            if (userData.name && userData.avatar && userData.username) {
                navigate('/chat')
            } else {
                navigate('/profile')
            }
            await updateDoc(userRef, {
                lastSeen: Date.now()
            });

            setInterval(async () => {
                if (auth.chatUser) {
                    await updateDoc(userRef, {
                        lastSeen: Date.now()
                    })
                }
            }, 6000);
        } catch (error) {
            console.error(error)
            toast.error(error.code)
        }
    }

    useEffect(() => {
        if (userData) {
            const chatsRef = doc(db, "chats", userData.id)
            const unSub = onSnapshot(chatsRef, async (res) => {
                const chatItems = res.data().chatsData
                const tempData = []

                for (const item of chatItems) {
                    const userRef = doc(db, "users", item.rId)
                    const userSnap = await getDoc(userRef)
                    const userData = userSnap.data()
                    tempData.push({ ...item, userData })
                }
                // console.log(tempData);
                setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt))
            })
            return () => unSub()
        }
    }, [userData])

    const inputFilter = async (e) => {
        try {
            const input = e.target.value
            if (input) {
                setShowSearch(true)
                const userRef = collection(db, "users")
                const q = query(userRef, where("username", "==", input.toLowerCase()))
                const querySnap = await getDocs(q)
                if (!querySnap.empty && querySnap.docs[0]?.data().id !== userData.id) {
                    let userExist = false

                    chatData.map((user) => {
                        if (user.userData.id === querySnap.docs[0].data().id) {
                            userExist = true
                        }
                    })
                    if (!userExist) {
                        return setUser(querySnap.docs[0].data())
                    }
                } else {
                    setUser(null)
                }
            } else {
                setShowSearch(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const addChat = async () => {
        const messagesRef = collection(db, "messages")
        const chatsRef = collection(db, "chats")
        try {
            const newMessageRef = doc(messagesRef)
            await setDoc(newMessageRef, {
                createdAt: serverTimestamp(),
                messages: []
            })
            await updateDoc(doc(chatsRef, user.id), {
                chatsData: arrayUnion({
                    messageId: newMessageRef.id,
                    lastMessage: "",
                    rId: userData.id,
                    updatedAt: Date.now(),
                    messageSeen: true
                })
            })
            await updateDoc(doc(chatsRef, userData.id), {
                chatsData: arrayUnion({
                    messageId: newMessageRef.id,
                    lastMessage: "",
                    rId: user.id,
                    updatedAt: Date.now(),
                    messageSeen: true
                })
            })
        } catch (error) {
            console.error();
            toast(error.message)
        }
    }

    const setChat = async (item) => {
        setMessagesId(item.messageId)
        setChatUser(item)
        const userChatsRef = doc(db, "chats", userData.id)
        const userChatsSnapShot = await getDoc(userChatsRef)
        const userChatsData = userChatsSnapShot.data()
        const chatIndex = userChatsData.chatsData.findIndex((c) => c.messageId === item.messageId)
        userChatsData.chatsData[chatIndex].messageSeen = true
        await updateDoc(userChatsRef, {
            chatsData: userChatsData.chatsData
        })
    }

    const value = {
        loadUserData,
        userData, setUserData,
        chatData, setChatData,
        messages, setMessages,
        chatUser, setChatUser,
        messagesId, setMessagesId,
        user, setUser,
        showSearch, setShowSearch,
        inputFilter,
        addChat,
        setChat
    }
    return (
        <appContext.Provider value={value}>
            {props.children}
        </appContext.Provider>
    )
}

export default AppContext
