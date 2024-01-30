import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Header = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <header className='flex justify-between p-2 bg-slate-400'>
            <div className="logo">
                <h1 className='p-1 text-xl'>RealESTATE</h1>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
                <input type="text" placeholder="Search" className='rounded-md p-1 outline-none w-[300px]' />
                <button className='ml-2'>Search</button>
            </div>

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
