import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { app } from '../firebase';

export default function CreateListing() {
    const [file, setFile] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: []
    })
    const [images, setImages] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
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
                        <input
                            type="file" id='images' className='border-2 p-2 rounded-md w-full' accept='image/*' multiple
                            onChange={(e) => setFile(e.target.files)}
                        />
                        <button
                            type='button'
                            disabled={loading}
                            className='p-2 border-2 border-green-600 text-green-600 rounded-md disabled:opacity-50'
                            onClick={handleSubmit}
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
                    <button className='bg-slate-700 text-white p-2 rounded-md'>CREATE LISTING</button>
                </div>
            </form>
        </div>
    );
}
