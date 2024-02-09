import React from 'react';

export default function Search() {
    return (
        <div>
            <div className='flex flex-col md:flex-row'>
                <form className='border-b-2 md:border-r-2 md:min-h-screen'>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col gap-5 m-6'>
                            <div className='flex items-center gap-2'>
                                <p className='mb-1 text-lg'>Search Term:</p>
                                <input type="text" className='p-2 text-lg border rounded-md' />
                            </div>

                            <div className='flex gap-2 items-center mt-4 flex-wrap'>
                                <span className='mb-1.5 text-lg'>Type:</span>
                                <div>
                                    <input type="checkbox" className='w-4 h-4' />
                                    <label className='ml-2'>Rent & Sale</label>
                                </div>
                                <div>
                                    <input type="checkbox" className='w-4 h-4' />
                                    <label className='ml-2'>Rent</label>
                                </div>
                                <div>
                                    <input type="checkbox" className='w-4 h-4' />
                                    <label className='ml-2'>Sale</label>
                                </div>
                                <div>
                                    <input type="checkbox" className='w-4 h-4' />
                                    <label className='ml-2'>Offer</label>
                                </div>
                            </div>

                            <div className='flex items-center gap-2 flex-wrap'>
                                <span className='mb-1.5 text-lg'>Amenities:</span>
                                <div>
                                    <input type="checkbox" className='w-4 h-4' />
                                    <label className='ml-2'>Parking</label>
                                </div>
                                <div>
                                    <input type="checkbox" className='w-4 h-4' />
                                    <label className='ml-2'>Furnished</label>
                                </div>
                            </div>

                            <div className='flex item-center gap-2'>
                                <label className='mt-1.5 text-lg'>Sort:</label>
                                <select className='border rounded-md p-3'>
                                    <option value="highest">Price high to low</option>
                                    <option value="lowest">Price low to high</option>
                                    <option value="latest">Latest</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                            </div>
                            <button className='border p-3 bg-slate-700 text-white w-full rounded-md text-lg'>Search</button>
                        </div>
                    </div>
                </form>
                <div className='m-6'>
                    <h1 className='text-2xl font-bold text-slate-600'>Listing Results:</h1>
                </div>
            </div>
        </div>
    );
}
