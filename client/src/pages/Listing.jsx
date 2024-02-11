import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';


import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
    const { currentUser } = useSelector((state) => state.user)
    SwiperCore.use([Navigation]);
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false)

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.listingId}`)
                const data = await res.json()
                if (data.success === false) {
                    setLoading(false)
                    setError(true)
                    return
                }
                setListing(data)
                setLoading(false)
                setError(false)
            } catch (error) {
                setLoading(false)
                setError(true)
            }
        }
        fetchListing()
    }, [params.listingId])
    return (
        <div className=''>
            {loading && <p className='text-center text-2xl font-semibold text-red-600 mt-8'>Loading...</p>}
            {error ? <p className='text-center text-2xl font-semibold text-red-600 mt-8'>Something went wrong</p> : null}
            {listing && !error && !loading && (
                <>
                    <Swiper navigation>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className='h-[550px]'
                                    style={{
                                        backgroundImage: `url(${url})`,
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                    }}>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='fixed top-[15%] right-[5%] z-10 p-4 bg-white rounded-full cursor-pointer'>
                        <FaShare
                            className='text-green-900'
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true)
                                setTimeout(() => {
                                    setCopied(false)
                                }, [2000])
                            }}
                        />
                    </div>
                    {copied && (
                        <div className='fixed top-[23%] right-[3.5%] z-10 p-1 bg-white rounded-md cursor-pointer'>
                            <p>Link Copied</p>
                        </div>
                    )}

                    <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                        <p className='font-semibold text-2xl'>
                            {listing.name} - ${' '}
                            {listing.offer
                                ?
                                listing.discountPrice.toLocaleString('en-US')
                                :
                                listing.regularPrice.toLocaleString('en-US')
                            }
                            {listing.type === 'rent' && ' / month'}
                        </p>
                        <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                            <FaMapMarkerAlt className='text-green-700' />
                            {listing.address}
                        </p>
                        <div className='flex gap-4'>
                            <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>{listing.type === 'rent' ? 'For Rent' : 'For Sale'}</p>
                            {listing.discountPrice && (
                                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>${listing.regularPrice - listing.discountPrice} discount</p>
                            )}
                        </div>
                        <p className='text-xl font-semibold'>Description - <span className='text-slate-600 text-sm'>{listing.description}</span></p>
                        <div className='flex flex-row flex-wrap text-lg text-green-900 gap-4'>
                            <div className='flex gap-1'>
                                <FaBed />
                                <p className='text-sm font-semibold'>{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : '1 Bed'}</p>
                            </div>
                            <div className='flex gap-1'>
                                <FaBath />
                                <p className='text-sm font-semibold'>{listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : '1 Bath'}</p>
                            </div>
                            <div className='flex gap-1'>
                                <FaParking />
                                <p className='text-sm font-semibold'>{listing.parking === true ? 'Parking Spot' : 'No Parking'}</p>
                            </div>
                            <div className='flex gap-1'>
                                <FaChair />
                                <p className='text-sm font-semibold'>{listing.furnished === true ? 'Furnished' : 'Not Furnished'}</p>
                            </div>
                        </div>
                        {currentUser && listing.userRef !== currentUser._id && !contact && (
                            <button
                                className='p-2 bg-slate-700 text-white rounded-md uppercase hover:opacity-80'
                                onClick={() => setContact(true)}>
                                Contact Landlord
                            </button>
                        )}
                        {contact && (
                            <Contact listing={listing} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

