import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft, FaEdit } from 'react-icons/fa'
import assets from '../assets/assets'
import { toast } from 'react-toastify'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../Config/firebaseConfig'
import upload from '../lib/upload'
import { onAuthStateChanged } from 'firebase/auth'
import { appContext } from '../Contexts/AppContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [username, setUserName] = useState("")
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [img, setImg] = useState(false)
    const [prevImg, setPrevImg] = useState('')
    const [uid, setUid] = useState("")
    const { setUserData } = useContext(appContext)
    const navigate = useNavigate()
    console.log(name);


    const profileUpdate = async (e) => {
        e.preventDefault()
        try {
            if (!prevImg && !img) {
                toast.error("Upload Profile image")
            }
            const docRef = doc(db, "users", uid)
            if (img) {
                const imageUrl = await upload(img)
                setPrevImg(imageUrl)
                await updateDoc(docRef, {
                    avatar: imageUrl,
                    bio: bio,
                    name: name,
                    username: username
                })
            } else {
                await updateDoc(docRef, {
                    bio: bio,
                    username: username,
                    name: name
                })
            }
            const snap = await getDoc(docRef)
            setUserData(snap.data())
            navigate('/chat')
            toast.success("Profile is Saved!")
        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid)
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)
                console.log(docSnap);

                if (docSnap.data().name) {
                    setName(docSnap.data().name)
                }
                if (docSnap.data().bio) {
                    setBio(docSnap.data().bio)
                }
                if (docSnap.data().avatar) {
                    setPrevImg(docSnap.data().avatar)
                }
                if (docSnap.data().username) {
                    setUserName(docSnap.data().username)
                }
            } else {
                navigate("/")
            }
        })
    }, [])
    return (

        <div className='w-[100vw] h-[100vh] max-sm:h-[80vh] max-sm:w-[100%] flex items-center justify-center relative'>
            
                <form onSubmit={profileUpdate} className='text-slate-800 bg-white p-10 flex items-center flex-col gap-5 min-w-[400px] max-w-[800px] min-h-0 max-h-[80vh] max-sm:w-full relative rounded'>
                    <FaArrowLeft className='text-slate-800 absolute top-4 left-10 cursor-pointer max-sm:hidden' onClick={() => window.history.back()} />
                    <label className='relative w-32 h-32 rounded-full cursor-pointer'>
                        <img src={img ? URL.createObjectURL(img) : prevImg ? prevImg : assets.avatar_icon} alt="" className='w-32 h-32 rounded-full bg-slate-400' />
                        <input onChange={(e) => setImg(e.target.files[0])} accept='.jpg, .png, .jpeg' type="file" hidden />
                        <FaEdit className='absolute right-0 top-[90%]' />
                    </label>
                    <h2 className='text-slate-800 font-bold'>Profile</h2>
                    <input onChange={(e) => setUserName(e.target.value)} value={username} type="text" placeholder='username' className='px-2 border-b outline-none text-slate-800  w-[80%]' />
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='name' className='px-2 border-b outline-none text-slate-800  w-[80%]' />
                    <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Bio ...' className='border-b outline-none text-slate-800 resize-none w-[80%] px-2'></textarea>
                    <button type='submit' className='bg-blue-600 text-slate-100 w-[80%] p-2'>save</button>
                </form>
            
        </div>

    )
}

export default Profile
