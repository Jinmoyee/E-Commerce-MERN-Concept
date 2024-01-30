import React from 'react';
import { useSelector } from 'react-redux';
export default function Profile() {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <div className='flex flex-col items-center'>
            <div className='m-10 w-[40%]'>
                <h1 className='text-3xl font-semibold text-center p-3'>Profile</h1>
                <form className='flex flex-col items-center gap-3'>
                    <img src={currentUser.avatar} alt="user_image" className='w-[120px] rounded-full m-2' />
                    <input type="text" className='w-[100%] border rounded-md p-2' />
                    <input type="text" className='w-[100%] border rounded-md p-2' />
                    <input type="text" className='w-[100%] border rounded-md p-2' />
                    <button className='border rounded-md p-2 text-white text-lg bg-slate-700 w-[100%]'>UPDATE</button>
                    <button className='w-[100%] border rounded-md p-2 bg-green-700 text-white text-lg'>CREATE LISTING</button>
                </form>
                <div className='flex justify-between'>
                    <span className='text-red-600'>Delete account</span>
                    <span className='text-red-600'>Sign out</span>
                </div>
            </div>
        </div>
    );
}
