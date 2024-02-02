import React from 'react';

export default function CreateListing() {
    return (
        <div className='mx-[12rem] my-[2rem]'>
            <h1 className='text-3xl text-center m-5 font-semibold'>Create a Listing</h1>
            <form className='flex flex-col gap-3 sm:flex-row'>
                <div className='flex flex-col gap-3 flex-1'>
                    <input type="text" placeholder='Name' className='border-2 rounded-md text-lg p-1' id='name' />
                    <textarea type="text" placeholder='Description' className='border-2 rounded-md text-lg p-1' id='description' />
                    <input type="text" placeholder='Address' className='border-2 rounded-md text-lg p-1' id='address' />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='check-box'>
                            <input type="checkbox" className='w-5' id='sell' />
                            <span>Sell</span>
                        </div>
                        <div className='check-box'>
                            <input type="checkbox" className='w-5' id='rent' />
                            <span>Rent</span>
                        </div>
                        <div className='check-box'>
                            <input type="checkbox" className='w-5' id='parking' />
                            <span>Parking spot</span>
                        </div>
                        <div className='check-box'>
                            <input type="checkbox" className='w-5' id='furnished' />
                            <span>Furnished</span>
                        </div>
                        <div className='check-box'>
                            <input type="checkbox" className='w-5' id='offer' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-6 flex-wrap'>
                        <div>
                            <input type="number" min="1" max='50' className='border-2 rounded-md text-xl p-2' />
                            <span className='text-lg ml-2'>Beds</span>
                        </div>
                        <div>
                            <input type="number" min="1" max='50' className='border-2 rounded-md text-xl p-2' />
                            <span className='text-lg ml-2'>Baths</span>
                        </div>
                        <div className='flex'>
                            <input type="number" min="1" max='50' className='border-2 rounded-md text-xl p-2' />
                            <div className='flex flex-col items-center'>
                                <p className='text-lg ml-2'>Regular price</p>
                                <span className='text-sm ml-2'>($ / Month)</span>
                            </div>
                        </div>
                        <div className='flex'>
                            <input type="number" min="1" max='50' className='border-2 rounded-md text-xl p-2' />
                            <div className='flex flex-col items-center'>
                                <p className='text-lg ml-2'>Discounted price</p>
                                <span className='text-sm'>($ / Month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4 mx-3'>
                    <p className='text-lg font-semibold'>Images:<span className='text-base font-normal ml-1'>The first image will be the cover (max 6)</span></p>
                    <div className='flex flex-row gap-4'>
                        <input type="file" id='images' className='border-2 p-2 rounded-md w-full' accept='image/*' multiple />
                        <button className='p-2 border-2 border-green-600 text-green-600 rounded-md'>Upload</button>
                    </div>
                    <button className='bg-slate-700 text-white p-2 rounded-md'>CREATE LISTING</button>
                </div>

            </form>

            <div className=''>

            </div>
        </div>
    );
}
