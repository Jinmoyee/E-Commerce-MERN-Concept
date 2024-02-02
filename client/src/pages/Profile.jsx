import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile() {
    const dispatch = useDispatch()
    const { currentUser, loading, error } = useSelector((state) => state.user)
    const [file, setFile] = useState(undefined)
    const [imageUploadPercentage, setImageUploadPercentage] = useState(0)
    const [imageUploadError, setImageUploadError] = useState(false)
    const [formData, setFormData] = useState({})
    const [updateSuccess, setUpdateSuccess] = useState(false)
    console.log(formData)

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

    return (
        <div className='flex flex-col items-center'>
            <div className='m-10 w-[40%]'>
                <h1 className='text-3xl font-semibold text-center p-3'>Profile</h1>
                <form className='flex flex-col items-center gap-3' onSubmit={handleSubmit}>
                    <input type="file" id='file' className='hidden' name='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                    <label htmlFor="file" className='cursor-pointer flex'>
                        <img src={formData.avatar || currentUser.avatar} alt="user_image" className='w-28 h-28 rounded-full m-2 border-[5px] border-black object-cover' />
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
                        className='w-[100%] border rounded-md p-2'
                        placeholder='Username' id='username' defaultValue={currentUser.username} onChange={handleChange} />
                    <input
                        type="text"
                        className='w-[100%] border rounded-md p-2'
                        placeholder='Email'
                        id='email'
                        defaultValue={currentUser.email} onChange={handleChange} />
                    <input
                        type="password"
                        className='w-[100%] border rounded-md p-2'
                        placeholder='Password'
                        id='password'
                        defaultValue={currentUser.password} onChange={handleChange} />
                    <button disabled={loading}
                        className='border rounded-md p-2 text-white text-lg bg-slate-700 w-[100%] disabled:opacity-80'>{loading ? "LOADING..." : "UPDATE"}</button>
                    {/* <button className='w-[100%] border rounded-md p-2 bg-green-700 text-white text-lg'>CREATE LISTING</button> */}

                </form>
                <div className='flex justify-between'>
                    <span className='text-red-600'>Delete account</span>
                    <span className='text-red-600'>Sign out</span>
                </div>

                <p className='text-red-600 pt-3 text-center'>{error ? error : ""}</p>
                <p className='text-green-600 pt-3 text-center'>{updateSuccess ? "User updated successfully!" : ""}</p>
            </div>
        </div>
    );
}
