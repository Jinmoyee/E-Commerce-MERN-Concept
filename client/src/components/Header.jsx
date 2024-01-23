import React from 'react';

const Header = () => {
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
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/signin">Sign In</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
