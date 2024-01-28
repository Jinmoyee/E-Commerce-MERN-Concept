import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)

            const res = await fetch("/api/auth/google", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    photo: result.user.photoURL,
                    email: result.user.email,
                })
            })
            const data = await res.json()
            console.log(data)
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
            console.log("Could not connect with Google", error)
        }
    }
    return (
        <button className='bg-red-500 p-2 text-xl text-white rounded-md w-[60%] m-2' onClick={handleGoogleClick}>Continue with Google</button>
    );
}

