import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

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
                </>
            )}
        </div>
    );
}

