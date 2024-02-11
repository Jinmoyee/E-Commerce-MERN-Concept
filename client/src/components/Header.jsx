import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const { currentUser } = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState('')

    const handleSumbit = (e) => {
        e.preventDefault()
        const url = new URLSearchParams(window.location.search)
        url.set('searchTerm', searchTerm)
        const searchQuery = url.toString()
        navigate(`/search?${searchQuery}`)
    }

    useEffect(() => {
        const url = new URLSearchParams(location.search)
        const searchTermFormUrl = url.get('searchTerm')
        if (searchTermFormUrl) {
            setSearchTerm(searchTermFormUrl)
        }
    }, [location.search])

    return (
        <header className='flex justify-between item-center max-w-6xl mx-auto p-2'>
            <div className="logo">
                <Link to="/">
                    <h1 className='p-1 text-xl text-green-900 font-bold md:text-2xl'>JT<span className='font-normal'>Estate</span></h1>
                </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSumbit} className="search-bar relative">
                <input
                    type="text"
                    placeholder="Search"
                    className='border rounded-full py-2 px-4 outline-none w-[150px] md:w-[300px] placeholder-green-800 font-semibold text-sm md:text-base bg-green-100 border-green-200'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='absolute top-3 right-2'><FaSearch className='text-green-800 text-sm md:text-base' /></button>
            </form>

            {/* Navigation Links */}
            <nav>
                <ul className='flex gap-1 sm:gap-8 text-base md:text-lg items-center pt-1'>
                    <li><Link to='/' className='text-green-900 hover:underline font-semibold hidden md:inline'>Home</Link></li>
                    <li><Link to='/about' className='text-green-900 hover:underline font-semibold hidden md:inline'>About</Link></li>
                    {currentUser ? (
                        <Link to="/profile">
                            <img src={currentUser.avatar} className='rounded-full min-w-8 object-cover w-8' alt="user_profile" />
                        </Link>
                    ) : (
                        <li><Link to='/sign-in'><span className='text-green-900 hover:underline font-semibold'>Sign In</span></Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
