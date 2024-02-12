import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState("");
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSignup = async (event) => {
        event.preventDefault();
        setLoading(true)
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success == false) {
            setError(data.message)
            setLoading(false)
        } else {
            setLoading(false)
            setError(null)
            navigate('/sign-in')
        }
        console.log(data);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className="flex flex-col text-center py-[5%]">
            <h2 className="text-5xl font-semibold mb-[3rem] lg:mb-5 text-green-900">Sign Up</h2>
            <form onSubmit={handleSignup}>
                <label>
                    <input
                        className="border-2 px-5 py-3 m-2 rounded-full w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg placeholder-green-800 font-semibold outline-none border-green-900 text-green-900"
                        type="text"
                        placeholder="Username"
                        id="username"
                        onChange={handleChange}
                    />
                </label>
                <br />
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
                    {loading ? 'loading...' : 'Sign Up'}
                </button>
                <br />
                <OAuth />
                <br />
                <p className="text-lg">Have an account?<span className="text-green-900 ml-1 cursor-pointer font-semibold hover:underline" onClick={() => navigate('/sign-in')}>Sign In</span></p>
                <br />
                {error && <p className="text-red-500 text-xl">{error}</p>}
            </form>
        </div>
    );
};

export default SignUp;
