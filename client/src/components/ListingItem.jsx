import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link
                to={`/listing/${listing._id}`}
                className=''
            >
                <img
                    src={listing.imageUrls[0] || "https://img.freepik.com/free-photo/villa-house-model-key-drawing-retro-desktop-real-estate-sale-concept_1387-310.jpg?w=996&t=st=1707517081~exp=1707517681~hmac=373af858a76efb47fb5ac6ee6add36e40f2bfa4378c3b52687361c9fec9b645a"}
                    alt=""
                    className='w-full h-[320px] sm:h-[220px] objext-cover hover:scale-105 transition-scale duration-300'
                />
                <div className='p-3 flex flex-col gap-2'>
                    <p className='text-lg font-semibold truncate'>{listing.name}</p>
                    <div className='flex items-center gap-1'>
                        <MdLocationOn className='h-4 w-4 text-green-700' />
                        <p className='truncate text-sm text-grey-700 w-full'>{listing.address}</p>
                    </div>
                    <p className='line-clamp-2 text-sm'>
                        {listing.description}
                    </p>
                    <p className='text-slate-500 mt-2 font-semibold'>$
                        {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' ? '/month' : ''}
                    </p>
                    <div className='text-slate-700 flex gap-4'>
                        <div className='font-bold text-xs'>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : '1 Bed'}
                        </div>
                        <div className='font-bold text-xs'>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : '1 Bath'}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
