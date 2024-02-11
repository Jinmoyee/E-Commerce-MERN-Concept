import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";
import Hero from "../assets/images/hero_image.png"

export default function Home() {
    SwiperCore.use([Navigation]);
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);

    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch('/api/listing/get?offer=true&limit=4');
                const data = await res.json();
                setOfferListings(data);
                fetchRentListings()
            } catch (error) {
                console.log(error)
            }
        }

        const fetchRentListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=rent&limit=4');
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings()
            } catch (error) {
                console.log(error)
            }
        }

        const fetchSaleListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=sale&limit=4');
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchOfferListings()
    }, []);

    console.log(saleListings)

    return (
        <div>
            <div className="flex gap-1 flex-col xl:flex-row mb-5">
                <div className="flex flex-col gap-y-5 mt-[3rem] md:mt-[8rem] my-[1rem] mx-[2rem] md:mx-[8rem] xl:mt-[8rem]">
                    <div>
                        <h1 className='text-2xl font-bold text-green-900 sm:text-4xl  md:text-5xl 2xl:text-6xl'>Find your next <span className="text-green-600 hover:underline">perfect</span></h1>
                        <h1 className='text-2xl  sm:text-4xl md:text-5xl 2xl:text-6xl font-bold text-green-900'> place with ease</h1>
                    </div>
                    <p className="text-black text-base xl:text-lg">Welcome to JT Estate, where your dream home awaits! We specialize in crafting exquisite living spaces tailored to your unique lifestyle. Whether you're seeking a cozy retreat, a modern marvel, or a sprawling estate, we're here to turn your vision into reality. With our commitment to quality craftsmanship, attention to detail, and personalized service, we'll help you find the perfect place to call home. Explore our portfolio and let us guide you on your journey to finding the home of your dreams.</p>
                    <div>
                        <Link to='/search' className="px-2 py-1 rounded-3xl border-2 text-green-900 border-green-900 text-base hover:border-green-600 hover:text-green-600 mt-2 md:px-3 md:py-2 md:text-lg ">Start Now</Link>
                    </div>
                </div>
                <div className="mt-[2rem] xl:mt-[0rem] flex justify-center">
                    <img src={Hero} alt="hero_image" className="w-[40rem] xl:w-[300rem] object-center" />
                </div>
            </div>

            <Swiper navigation>
                {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
                    <SwiperSlide key={listing._id}>
                        <div
                            style={{
                                backgroundImage: `url(${listing.imageUrls[0]})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                            className="h-[550px]"
                            key={listing._id}
                        >
                        </div>
                    </SwiperSlide>
                ))
                }
            </Swiper>

            <div className='max-w-[87rem] mx-auto p-3 flex flex-col gap-8 my-10'>
                {offerListings && offerListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h1 className='text-3xl font-bold text-green-900 my-3 text-center mb-2'>Recent Offer</h1>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {offerListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                        <div className="mt-[3rem] text-center">
                            <Link to={'/search?offer=true'} className="px-2 py-1 rounded-3xl border-2 text-green-900 border-green-900 text-base hover:border-green-600 hover:text-green-600 mt-2 md:px-3 md:py-2 md:text-lg ">Show more Offers</Link>
                        </div>
                    </div>
                )}

                {rentListings && rentListings.length > 0 && (
                    <div>
                        <div>
                            <h1 className='text-3xl font-bold text-green-900 my-3 text-center mb-2'>Recent places for Rent</h1>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {rentListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                        <div className="mt-[3rem] text-center">
                            <Link to={'/search?type=rent'} className="px-2 py-1 rounded-3xl border-2 text-green-900 border-green-900 text-base hover:border-green-600 hover:text-green-600 mt-2 md:px-3 md:py-2 md:text-lg ">Show more Rents</Link>
                        </div>
                    </div>
                )}

                {saleListings && saleListings.length > 0 && (
                    <div>
                        <div>
                            <h1 className='text-3xl font-bold text-green-900 my-3 text-center mb-2'>Recent Sale</h1>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {saleListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                        <div className="mt-[3rem] text-center">
                            <Link to={'/search?type=sale'} className="px-2 py-1 rounded-3xl border-2 text-green-900 border-green-900 text-base hover:border-green-600 hover:text-green-600 mt-2 md:px-3 md:py-2 md:text-lg ">Show more Sales</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
