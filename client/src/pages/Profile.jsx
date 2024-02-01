import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';
export default function Profile() {
    const { currentUser } = useSelector((state) => state.user)
    const [file, setFile] = useState(undefined)
    const [imageUploadPercentage, setImageUploadPercentage] = useState(0)
    const [imageUploadError, setImageUploadError] = useState(false)
    const [formData, setFormData] = useState({})

    console.log(formData)
    console.log(imageUploadPercentage)
    console.log(imageUploadError)
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

    return (
        <div className='flex flex-col items-center'>
            <div className='m-10 w-[40%]'>
                <h1 className='text-3xl font-semibold text-center p-3'>Profile</h1>
                <form className='flex flex-col items-center gap-3'>
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
                    <input type="text" className='w-[100%] border rounded-md p-2' />
                    <input type="text" className='w-[100%] border rounded-md p-2' />
                    <input type="text" className='w-[100%] border rounded-md p-2' />
                    <button className='border rounded-md p-2 text-white text-lg bg-slate-700 w-[100%]'>UPDATE</button>
                    <button className='w-[100%] border rounded-md p-2 bg-green-700 text-white text-lg'>CREATE LISTING</button>
                </form>
                <div className='flex justify-between'>
                    <span className='text-red-600'>Delete account</span>
                    <span className='text-red-600'>Sign out</span>
                </div>
            </div>
        </div>
    );
}
