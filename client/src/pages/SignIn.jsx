import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signInStart, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";


const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState("");
    const { loading, error } = useSelector((state) => state.user)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        dispatch(signInStart())
        const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success == false) {
            dispatch(signInFailure(data.message))
        } else {
            dispatch(signInSuccess(data))
            navigate('/')
        }
        console.log(data);
    };

    return (
        <div className="flex flex-col text-center py-[5%] mt-[2rem] sm:mt-[0rem]">
            <h2 className="text-5xl font-semibold mb-[3rem] lg:mb-5 text-green-900">Sign In</h2>
            <form onSubmit={handleSignup}>
                <label>
                    <input
                        className="border-2 px-5 py-3 m-2 rounded-full w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg placeholder-green-800 font-semibold outline-none border-green-900 text-green-900"
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    <input
                        className="border-2 px-5 py-3 m-2 rounded-full w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg placeholder-green-800 font-semibold outline-none border-green-900 text-green-900"
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button
                    type="submit" className="bg-green-700 hover:bg-green-600 p-3 text-xl text-white rounded-full w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] m-2">
                    {loading ? 'loading...' : 'Sign In'}
                </button>
                <br />
                <OAuth />
                <br />
                <p className="text-lg">Dont have an account?<span className="text-green-900 ml-1 cursor-pointer font-semibold hover:underline" onClick={() => navigate('/sign-up')}>Sign Up</span></p>
                <br />
                {error && <p className="text-red-500 text-xl">{error}</p>}
            </form>
        </div>
    );
};

export default SignIn;
