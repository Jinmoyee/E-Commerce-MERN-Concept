import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";

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
            <div className="flex flex-col gap-5 mx-[12rem] my-[8rem]">
                <div>
                    <h1 className='text-6xl font-bold text-slate-700'>Find your next <span className="text-slate-400">perfect</span></h1>
                    <h1 className='text-6xl font-bold text-slate-700'> place with ease</h1>
                </div>
                <p className="text-slate-400 text-sm">JT Estate website is the premier destination for those seeking their dream property. With a commitment to excellence and a passion for finding the perfect home for every client, JT Estate offers a comprehensive platform where buyers and sellers can connect seamlessly. Our user-friendly interface provides intuitive navigation, allowing visitors to explore a diverse range of listings tailored to their preferences. Whether your in search of a cozy suburban retreat, a bustling urban oasis, or a picturesque countryside escape, JT Estate has you covered. Backed by a team of experienced professionals dedicated to delivering exceptional service, we strive to make the buying and selling process as smooth and stress-free as possible. With JT Estate, your dream home is just a click away.</p>
                <Link to='/search' className="p-3 rounded-3xl border w-[7rem] text-lg">Start Now</Link>
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

            <div className='flex flex-wrap w-full justify-center gap-4 my-10'>
                {offerListings && offerListings.length > 0 && (
                    <div>
                        <div>
                            <h1 className='text-3xl font-bold text-slate-700 my-3'>Recent Offer</h1>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {offerListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                        <div className="m-3">
                            <Link to={'/search?offer=true'} className="p-2 rounded-3xl border">Show more Offers</Link>
                        </div>
                    </div>
                )}

                {rentListings && rentListings.length > 0 && (
                    <div>
                        <div>
                            <h1 className='text-3xl font-bold text-slate-700 my-3'>Recent places for Rent</h1>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {rentListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                        <div className="m-3">
                            <Link to={'/search?type=rent'} className="p-2 rounded-3xl border">Show more Rents</Link>
                        </div>
                    </div>
                )}

                {saleListings && saleListings.length > 0 && (
                    <div>
                        <div>
                            <h1 className='text-3xl font-bold text-slate-700 my-3'>Recent Sale</h1>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {saleListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                        <div className="m-3">
                            <Link to={'/search?type=sale'} className="p-2 rounded-3xl border">Show more Sales</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
