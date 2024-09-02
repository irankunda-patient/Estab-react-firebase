import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBhuZ_k2VwrOE9dRgfZKdUET4YfXYyQVZs",
    authDomain: "estab-1d244.firebaseapp.com",
    projectId: "estab-1d244",
    storageBucket: "estab-1d244.appspot.com",
    messagingSenderId: "443466488517",
    appId: "1:443466488517:web:5d909250e3522c16c92eac",
    measurementId: "G-PM1ZKPMN32"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const initUser = async (user, username, email, avatar, name) => {
    await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        username: username.toLowerCase(),
        email,
        name: name ? name : "",
        avatar: avatar ? avatar : "",
        bio: "Hey there, i'am using Estab",
        lastSeen: Date.now()
    })
    await setDoc(doc(db, "chats", user.uid), {
        chatsData: []
    })
}
const signUp = async (username, email, password) => {
    if (!email || !password || !username) {
        toast("Empty UserName/Email/Password field")
        return
    }
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        initUser(user, username, email)

    } catch (error) {
        console.error(error)
        toast.error(error.code)
    }
}
const logIn = async (email, password) => {
    if (!email || !password) {
        toast("Empty Email/Password field")
        return
    }
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split("-").join(" "))
    }
}
const provider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, provider)
        const user = res.user
        const username = ""
        const email = user.email
        const avatar = user.photoURL
        const name = user.displayName
        initUser(user, username, email, avatar, name)
    } catch (error) {
        console.error(error);
        toast.error(error.code)
    }
}
const logOut = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error)
        toast.error(error.code)
    }
}

const resetor = async (email) => {
    if (!email) {
        toast.error("Enter your Email")
        return
    }
    try {
        const userRef = collection(db, "users")
        const q = query(userRef, where("email", "==", email))
        const querySnap = getDocs(q)

        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth, email)
            toast.success("Reset Email sent!")
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message)
    }
}

export { auth, signUp, signInWithGoogle, logOut, logIn, db, resetor }