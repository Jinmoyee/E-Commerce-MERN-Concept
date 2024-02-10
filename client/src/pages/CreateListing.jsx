import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function CreateListing() {
    const navigate = useNavigate()
    const { currentUser } = useSelector((state) => state.user)
    console.log(currentUser._id)
    const [file, setFile] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 50,
        offer: false,
        parking: false,
        furnished: false,
    })
    const [images, setImages] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState(null)
    const [formLoading, setFormLoading] = useState(false)


    const handleUpload = async (e) => {
        e.preventDefault()
        const storage = getStorage();
        if (file.length > 0 && file.length + formData.imageUrls.length < 7) {
            setLoading(true)
            setError(null)
            for (let i = 0; i < file.length; i++) {
                setLoading(true)
                const imagesRef = ref(storage, new Date().getTime() + file[i].name)
                const uploadTask = uploadBytesResumable(imagesRef, file[i]);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        setLoading(true)
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        setError("Image size must be less than 3 mb")
                        setLoading(false)
                    },
                    () => {
                        setLoading(true)
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImages((prev) => [...prev, downloadURL])
                            setFormData((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, downloadURL] }))
                        });
                        setLoading(false)
                    }
                );

            }
            setLoading(false)
            setError(null)
        }
        else {
            setError("Please select max 6 images")
            setLoading(false)
        }
    }

    const handleRemoveImage = (index) => {
        setFormData((prev) => ({ ...prev, imageUrls: prev.imageUrls.filter((_, i) => i !== index) }))
    }

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData((prev) => ({ ...prev, type: e.target.id }))
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData((prev) => ({ ...prev, [e.target.id]: !prev[e.target.id] }))
        }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormLoading(true)
        setFormError(null)
        try {
            if (+formData.discountPrice > +formData.regularPrice) {
                setFormError("Discount price cannot be greater than regular price")
                setFormLoading(false)
                return
            }
            if (formData.imageUrls.length < 1) {
                setFormError("Please select at least one image")
                setFormLoading(false)
                return
            }
            setFormLoading(true)
            setFormError(null)
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
                ,
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                })
            })
            const data = await res.json()
            setFormLoading(true)
            setFormError(null)
            if (data.success === false) {
                setFormError(data.message)
            }
            setFormLoading(false)
            console.log(data)
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setFormError(error.message)
            setFormLoading(false)
        }
    }

    return (
        <div className='mx-[12rem] my-[2rem]'>
            <h1 className='text-3xl text-center m-5 font-semibold'>Create a Listing</h1>
            <form className='flex flex-col gap-3 sm:flex-row' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-3 flex-1'>
                    <input type="text" placeholder='Name' className='border-2 rounded-md text-lg p-1' maxLength='62' minLength='10' required id='name' onChange={handleChange} value={formData.name} />
                    <textarea type="text" placeholder='Description' className='border-2 rounded-md text-lg p-1' id='description' required onChange={handleChange} value={formData.description} />
                    <input type="text" placeholder='Address' className='border-2 rounded-md text-lg p-1' id='address' required onChange={handleChange} value={formData.address} />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='check-box'>
                            <input type="checkbox" className='w-5' id='sale' onChange={handleChange} checked={formData.type === 'sale'} />
                            <span>Sale</span>
                        </div>
                        <div className='check-box'>
                            <input type="checkbox" className='w-5' id='rent' onChange={handleChange} checked={formData.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className='check-box'>
                            <input type="checkbox" className='w-5' id='parking' onChange={handleChange} checked={formData.parking} />
                            <span>Parking spot</span>
                        </div>
                        <div className='check-box'>
                            <input type="checkbox" className='w-5' id='furnished' onChange={handleChange} checked={formData.furnished} />
                            <span>Furnished</span>
                        </div>
                        <div className='check-box'>
                            <input type="checkbox" className='w-5' id='offer' onChange={handleChange} checked={formData.offer} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-6 flex-wrap'>
                        <div>
                            <input type="number" min="1" max='50' className='border-2 rounded-md text-xl p-2' onChange={handleChange} value={formData.bedrooms} id='bedrooms' />
                            <span className='text-lg ml-2'>Beds</span>
                        </div>
                        <div>
                            <input type="number" min="1" max='50' className='border-2 rounded-md text-xl p-2' onChange={handleChange} value={formData.bathrooms} id='bathrooms' />
                            <span className='text-lg ml-2'>Baths</span>
                        </div>
                        <div className='flex'>
                            <input type="number" className='border-2 rounded-md text-xl p-2' onChange={handleChange} value={formData.regularPrice} id='regularPrice' />
                            <div className='flex flex-col items-center'>
                                <p className='text-lg ml-2'>Regular price</p>
                                {formData.type === 'rent' && <span className='text-sm'>($ / Month)</span>}
                            </div>
                        </div>
                        {formData.offer && (
                            <div className='flex'>
                                <input type="number" className='border-2 rounded-md text-xl p-2' onChange={handleChange} value={formData.discountPrice} id='discountPrice' />
                                <div className='flex flex-col items-center'>
                                    <p className='text-lg ml-2'>Discounted price</p>
                                    {formData.type === 'rent' && <span className='text-sm'>($ / Month)</span>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4 mx-3'>
                    <p className='text-lg font-semibold'>Images:<span className='text-base font-normal ml-1'>The first image will be the cover (max 6)</span></p>
                    <div className='flex flex-row gap-4'>
                        <input
                            type="file" id='images' className='border-2 p-2 rounded-md w-full' accept='image/*' multiple
                            onChange={(e) => setFile(e.target.files)}
                        />
                        <button
                            type='button'
                            disabled={loading}
                            className='p-2 border-2 border-green-600 text-green-600 rounded-md disabled:opacity-50'
                            onClick={handleUpload}
                        >{loading ? "Uploading..." : "Upload"}</button>
                    </div>
                    <p className='text-red-600 text-lg'>{error}</p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                            <div key={url} className='flex justify-between items-center p-3 border-2 rounded-md'>
                                <img src={url} alt="listing-image" className='w-20 h-20 object-cover rounded-md' />
                                <button className='p-3 text-red-700 rounded-lg uppercase border bg-gray-200 hover:opacity-80' type='button' onClick={() => handleRemoveImage(index)}>Delete</button>
                            </div>
                        ))
                    }
                    <button disabled={loading} className='bg-slate-700 text-white p-2 rounded-md disabled:opacity-70'>{formLoading ? "CREATING..." : "CREATE LISTING"}</button>
                    {formError && <p className='text-red-600 text-lg'>{formError}</p>}
                </div>
            </form>
        </div>
    );
}
