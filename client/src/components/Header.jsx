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
        <header className='flex justify-between p-2'>
            <div className="logo">
                <Link to="/">
                    <h1 className='p-1 text-xl'>JT<span className='font-semibold'>Estate</span></h1>
                </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSumbit} className="search-bar relative">
                <input
                    type="text"
                    placeholder="Search"
                    className='border rounded-md p-2 outline-none w-[300px]'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='absolute top-3 right-2'><FaSearch /></button>
            </form>

            {/* Navigation Links */}
            <nav>
                <ul className='flex gap-8 text-lg'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    {currentUser ? (
                        <Link to="/profile">
                            <img src={currentUser.avatar} className='rounded-full w-8 object-cover' alt="user_profile" />
                        </Link>
                    ) : (
                        <li><Link to='/sign-in'>Sign In</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
