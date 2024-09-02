import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { context } from '../Contexts/Theme'
import { FaTelegramPlane } from 'react-icons/fa'
import { appContext } from '../Contexts/AppContext'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../Config/firebaseConfig'
import { toast } from 'react-toastify'
import upload from '../lib/upload'
import Button from './Button/Button'

const Chat = () => {
  const { darkMode } = useContext(context)
  const [input, setInput] = useState("")
  const { userData, messagesId, chatUser, messages, setMessages, chatData } = useContext(appContext)

  const sendMessage = async (e) => {
    e.preventDefault()
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date()
          })
        })

        const userIDs = [chatUser.rId, userData.id]

        userIDs.forEach(async (id) => {
          const userChatRef = doc(db, "chats", id)
          const userChatSnapShot = await getDoc(userChatRef)

          if (userChatSnapShot.exists()) {
            const userChatData = userChatSnapShot.data()
            const chatIndex = userChatData.chatsData.findIndex((c) => c.messageId === messagesId)

            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30)
            userChatData.chatsData[chatIndex].updatedAt = Date.now()

            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false
            }
            await updateDoc(userChatRef, {
              chatsData: userChatData.chatsData
            })
          }
        })
        setInput("")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const sendImage = async (e) => {
    try {
      const fileUrl = await upload(e.target.files[0])
      if (fileUrl && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createdAt: new Date()
          })
        })
        const userIDs = [chatUser.rId, userData.id]

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, 'chats', id)
          const userChatsSnapShot = await getDoc(userChatsRef)

          if (userChatsSnapShot.exists()) {
            const userChatData = userChatsSnapShot.data()
            const chatIndex = userChatData.chatsData.findIndex((c) => c.messageId === messagesId)

            userChatData.chatsData[chatIndex].lastMessage = "Image"
            userChatData.chatsData[chatIndex].updatedAt = Date.now()

            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData
            })
          }
        })

      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, 'messages', messagesId), (res) => {
        setMessages(res.data().messages.reverse())
        console.log(res.data().messages.reverse());

      })
      return () => unSub(messages)
    }
  }, [messagesId])

  const timeConverter = (timestamp) => {
    const date = timestamp.toDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return hours > 12 ? `${hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`
  }
  return chatUser ? (
    <div className='text-white h-[100vh] max-sm:h-[80%] border-r border-r-[gray] flex flex-col items-center justify-between pt-2'>

      <div className='flex flex-1 h-[10vh] flex-col-reverse overflow-auto w-full items-end p-4 gap-2'>
        {messages.map((msg, index) => (

          <div className={msg.sId === userData.id ? `receiver  flex flex-col gap-1 ` : " sender self-start flex flex-col gap-1"}>
            {msg["image"] ?
              <div className={msg.sId === userData.id ? "receiver flex flex-col gap-1 items-end" : "flex flex-col gap-1 self-start"}>
                <img src={msg.image} alt="img" className='w-[50%] mr-7 rounded' />
              </div> :
              <p className={`${!darkMode ? `${msg.sId === userData.id ? "text-slate-800" : "text-slate-800 border-slate-400"}` : `${msg.sId === userData.id ? "bg-slate-950 text-slate-300" : "text-slate-300 border-slate-800"}`} ${msg.sId === userData.id ? "p-2 text-wrap min-w-0 max-w-[400px] text-[12px] border border-slate-900 rounded-tr rounded-l mr-7" : 'p-2 text-wrap min-w-0 max-w-[400px] text-[12px] border rounded-tl-md rounded-r-md ml-7'}`}>{msg.text}</p>}
            <div className={msg.sId === userData.id ? "flex flex-col items-end" : `flex flex-col gap-1`}>
              <img src={msg.sId === userData.id ? userData.avatar : chatUser.userData.avatar} alt="profile" className='w-7 h-7 rounded-[50%]' />
              <p className='text-[10px] text-slate-300'>{timeConverter(msg.createdAt)}</p>
            </div>
          </div>
        ))
        }
      </div>
      <form className={`${!darkMode ? "border border-slate-800" : null} bg-white w-[600px] max-sm:max-w-[80%] min-h-[50px] max-h-[200px] mb-4 flex rounded-full items-center justify-center gap-2 p-2`}>
        <textarea onChange={(e) => setInput(e.target.value)} value={input} placeholder="Something here" id="" className='flex-1 border-none outline-none resize-none text-slate-900 px-4 h-full font-poppins rounded-full'></textarea>
        <label>
          <input onChange={(e) => sendImage(e)} type="file" hidden />
          <img src={assets.gallery_icon} alt="img" className='w-7 h-7' />
        </label>
        <Button type={"submit"} text={<FaTelegramPlane onClick={sendMessage} className='w-10 h-10 text-blue-600' />} />
      </form>
    </div>
  ) : <div className='text-slate-500 text-[32px] h-[100vh] max-sm:h-[80%] border-r border-r-[gray] flex justify-center items-center pt-2'>Hey chat here!!</div>
}

export default Chat
