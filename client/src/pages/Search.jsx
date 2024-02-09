import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem';

export default function Search() {
    const navigate = useNavigate();
    const [sideBarData, setSideBarData] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "createAt",
        order: "desc"
    });
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        if (sideBarData.type === 'all' || sideBarData.type === 'rent' || sideBarData.type === 'sale') {
            {
                setSideBarData({
                    ...sideBarData,
                    type: e.target.id
                })
            }
        }

        if (e.target.id === 'searchTerm') {
            setSideBarData({
                ...sideBarData,
                searchTerm: e.target.value
            })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSideBarData({
                ...sideBarData,
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false
            })
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'createAt';
            const order = e.target.value.split('_')[1] || 'desc';
            setSideBarData({
                ...sideBarData,
                sort, order
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('type', sideBarData.type);
        urlParams.set('parking', sideBarData.parking);
        urlParams.set('furnished', sideBarData.furnished);
        urlParams.set('offer', sideBarData.offer);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('order', sideBarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTerm = urlParams.get('searchTerm');
        const type = urlParams.get('type');
        const parking = urlParams.get('parking');
        const furnished = urlParams.get('furnished');
        const offer = urlParams.get('offer');
        const sort = urlParams.get('sort');
        const order = urlParams.get('order');

        if (searchTerm || type || parking || furnished || offer || sort || order) {
            setSideBarData({
                searchTerm: searchTerm || '',
                type: type || 'all',
                parking: parking === 'true' ? true : false,
                furnished: furnished === 'true' ? true : false,
                offer: offer === 'true' ? true : false,
                sort: sort || 'createAt',
                order: order || 'desc'
            })
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                const data = await res.json();
                setListings(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchData()

    }, [location.search])

    console.log(listings)
    return (
        <div>
            <div className='flex flex-col md:flex-row'>
                <form className='border-b-2 md:border-r-2 md:min-h-screen' onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col gap-5 m-6'>
                            <div className='flex items-center gap-2'>
                                <p className='mb-1 text-lg'>Search Term:</p>
                                <input
                                    id='searchTerm'
                                    type="text"
                                    placeholder='Search...'
                                    className='p-2 text-lg border rounded-md'
                                    value={sideBarData.searchTerm}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='flex gap-2 items-center mt-4 flex-wrap'>
                                <span className='mb-1.5 text-lg'>Type:</span>
                                <div>
                                    <input
                                        id='all'
                                        type="checkbox"
                                        className='w-4 h-4'
                                        onChange={handleChange}
                                        checked={sideBarData.type === "all"}
                                    />
                                    <label className='ml-2'>Rent & Sale</label>
                                </div>
                                <div>
                                    <input
                                        id='rent'
                                        type="checkbox"
                                        className='w-4 h-4'
                                        onChange={handleChange}
                                        checked={sideBarData.type === "rent"}
                                    />
                                    <label className='ml-2'>Rent</label>
                                </div>
                                <div>
                                    <input
                                        id='sale'
                                        type="checkbox"
                                        className='w-4 h-4'
                                        onChange={handleChange}
                                        checked={sideBarData.type === "sale"}
                                    />
                                    <label className='ml-2'>Sale</label>
                                </div>
                                <div>
                                    <input
                                        id='offer'
                                        type="checkbox"
                                        className='w-4 h-4'
                                        onChange={handleChange}
                                        checked={sideBarData.offer}
                                    />
                                    <label className='ml-2'>Offer</label>
                                </div>
                            </div>

                            <div className='flex items-center gap-2 flex-wrap'>
                                <span className='mb-1.5 text-lg'>Amenities:</span>
                                <div>
                                    <input
                                        id='parking'
                                        type="checkbox"
                                        className='w-4 h-4'
                                        onChange={handleChange}
                                        checked={sideBarData.parking}
                                    />
                                    <label className='ml-2'>Parking</label>
                                </div>
                                <div>
                                    <input
                                        id='furnished'
                                        type="checkbox"
                                        className='w-4 h-4'
                                        onChange={handleChange}
                                        checked={sideBarData.furnished}
                                    />
                                    <label className='ml-2'>Furnished</label>
                                </div>
                            </div>

                            <div className='flex item-center gap-2'>
                                <label className='mt-1.5 text-lg'>Sort:</label>
                                <select
                                    id='sort_order'
                                    className='border rounded-md p-3'
                                    onChange={handleChange}
                                    defaultValue={'createAt_desc'}
                                >
                                    <option value="regularPrice_desc">Price high to low</option>
                                    <option value="regularPrice_asc">Price low to high</option>
                                    <option value="createAt_desc">Latest</option>
                                    <option value="createAt_asc">Oldest</option>
                                </select>
                            </div>
                            <button className='border p-3 bg-slate-700 text-white w-full rounded-md text-lg'>Search</button>
                        </div>
                    </div>
                </form>
                <div className='flex-1'>
                    <h1 className='text-3xl font-semibold text-slate-600 border-b-2 m-7 pb-4'>Listing Results:</h1>
                    <div className='p-7 flex flex-wrap gap-4'>
                        {!loading && listings.length === 0 && (
                            <p className='text-xl text-slate-700'>No listing found!</p>
                        )}
                        {loading && (
                            <p className='text-xl text-slate-700 text-center'>Loading...</p>
                        )}
                        {!loading && listings.length > 0 && (
                            listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
