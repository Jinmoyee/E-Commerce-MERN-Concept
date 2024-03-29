import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'


export default function Profile() {
    const dispatch = useDispatch()
    const { currentUser, loading, error } = useSelector((state) => state.user)
    const [file, setFile] = useState(undefined)
    const [imageUploadPercentage, setImageUploadPercentage] = useState(0)
    const [imageUploadError, setImageUploadError] = useState(false)
    const [formData, setFormData] = useState({})
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [showListingError, setShowListingError] = useState(false)
    const [userListing, setUserListing] = useState([])

    console.log(userListing)

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file])

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadPercentage(Math.round(progress))
            },
            (error) => {
                setImageUploadError(true)
            },
            () => {
                getDownloadURL(storageRef)
                    .then((downloadURL) => {
                        setFormData({
                            ...formData,
                            avatar: downloadURL,
                        })
                    })
            }
        );


    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true)
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message))
                return
            }
            dispatch(deleteUserSuccess(data))
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }

    const handleSignOutUser = async () => {
        try {
            dispatch(signOutUserStart())
            const res = await fetch('/api/auth/signout')
            const data = await res.json()
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message))
                return
            }
            dispatch(signOutUserSuccess(data))
        } catch (error) {
            dispatch(signOutUserFailure(error.message))
        }
    }

    const handleShowListings = async () => {
        try {
            setShowListingError(false)
            const res = await fetch(`/api/user/listings/${currentUser._id}`)
            const data = await res.json()
            if (data.success === false) {
                setShowListingError(true)
                console.log("Error from data")
            }
            setUserListing(data)
        } catch (error) {
            setShowListingError(true)
            console.log("Error from catch")
        }
    }

    const handleEditListing = () => {

    }

    const handleDeleteListing = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            if (data.success === false) {
                console.log(data.message)
                return
            }
            setUserListing((prev) => prev.filter((listing) => listing._id !== listingId))
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='m-10 w-full'>
                <h1 className='text-4xl font-semibold text-center p-3 text-black'>Profile</h1>
                <form className='flex flex-col items-center gap-3' onSubmit={handleSubmit}>
                    <input type="file" id='file' className='hidden' name='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                    <label htmlFor="file" className='cursor-pointer flex'>
                        <img src={formData.avatar || currentUser.avatar} alt="user_image" className='w-[8rem] h-[8rem] rounded-full m-2 border-[5px] border-black object-cover' />
                    </label>
                    <p>
                        {
                            /* function example() {
                                   return condition1 ? value1
                                        : condition2 ? value2
                                        : condition3 ? value3
                                        : value4;
                            }*/
                        }
                        {imageUploadError ? (<span className='text-red-600'>Error in uploading the image (Image must be less than 2 mb)</span>)
                            : ((imageUploadPercentage > 0 && imageUploadPercentage < 100)) ? (<span className='text-green-600'>{`Uploading ${imageUploadPercentage}`}%</span>)
                                : (imageUploadPercentage === 100) ? (<span className='text-green-600'>Uploaded Successfully</span>)
                                    : ("")
                        }</p>
                    <input
                        type="text"
                        className='border-2 px-5 py-3 m-2 rounded-full w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg placeholder-green-800 font-semibold outline-none border-green-900 text-green-900'
                        placeholder='Username' id='username' defaultValue={currentUser.username} onChange={handleChange} />
                    <input
                        type="text"
                        className='border-2 px-5 py-3 m-2 rounded-full w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg placeholder-green-800 font-semibold outline-none border-green-900 text-green-900'
                        placeholder='Email'
                        id='email'
                        defaultValue={currentUser.email} onChange={handleChange} />
                    <input
                        type="password"
                        className='border-2 px-5 py-3 m-2 rounded-full w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg placeholder-green-800 font-semibold outline-none border-green-900 text-green-900'
                        placeholder='Password'
                        id='password'
                        defaultValue={currentUser.password} onChange={handleChange} />
                    <button disabled={loading}
                        className='border-2 px-5 py-3 rounded-full w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg font-semibold bg-slate-700 outline-none text-center hover:bg-slate-600 text-white disabled:opacity-80'>{loading ? "LOADING..." : "UPDATE"}</button>
                    <Link to={'/create-listing'} className='border-2 px-5 py-3 rounded-full w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg font-semibold bg-green-700 outline-none text-center hover:bg-green-600 text-white'>CREATE LISTING</Link>

                </form>
                <div className='flex justify-center w-full'>
                    <div className='flex justify-between w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-3'>
                        <span className='text-red-600 cursor-pointer' onClick={handleDeleteUser}>Delete account</span>
                        <span className='text-red-600 cursor-pointer' onClick={handleSignOutUser}>Sign out</span>
                    </div>
                </div>
                <p className='text-red-600 pt-3 text-center'>{error ? error : ""}</p>
                <p className='text-green-600 p-3 text-center'>{updateSuccess ? "User updated successfully!" : ""}</p>
                <button onClick={handleShowListings} className='text-green-700 text-lg w-[100%] hover:underline'>Show Listings</button>
                <div className='flex justify-center w-full'>
                    <div className='flex justify-between p-3'>
                        {showListingError && <p className='text-red-600 text-center'>Error in fetching listings</p>}
                        {userListing && userListing.length > 0 && (
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-3xl font-semibold text-center mt-7 text-green-900'>Your Listings</h1>
                                {userListing.map((listing) =>
                                    <div key={listing._id} className='flex border-2 border-green-700 p-3 rounded-xl items-center justify-between gap-4'>
                                        <Link to={`/listing/${listing._id}`}>
                                            <img
                                                src={listing.imageUrls[0]}
                                                alt="listing image"
                                                className='h-20 w-20 object-contain'
                                            />
                                        </Link>
                                        <Link to={`/listing/${listing._id}`} className='text-green-900 flex-1 font-semibold cursor-pointer line-clamp-2 hover:underline'>
                                            <p>{listing.name}</p>
                                        </Link>

                                        <div className='flex flex-col gap-2 border-2 border-green-700 p-2 rounded-md items-center'>
                                            <Link to={`/update-listing/${listing._id}`}>
                                                <button onClick={handleEditListing} className='text-green-700 font-semibold opacity-60 hover:opacity-100'>EDIT</button>
                                            </Link>
                                            <button onClick={() => handleDeleteListing(listing._id)} className='text-red-700 font-semibold opacity-60 hover:opacity-100'>DELETE</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
