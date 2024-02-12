import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//http://localhost:5173/listing/65c339b2c09f048af8f49c20

export default function Contact({ listing }) {
    const [LandLord, setLandLord] = useState(null)
    const [message, setMessage] = useState("")
    console.log(message)
    useEffect(() => {
        const fetchLandLord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data = await res.json()
                if (data.success === false) {
                    console.log(data.message)
                    return
                }
                setLandLord(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLandLord()
    }, [listing.userRef])
    return (
        <div>
            {LandLord && (
                <div className='text-lg flex flex-col gap-2'>
                    <p>Contact <span className='font-semibold'>{LandLord.username}</span> for <span className='font-semibold underline'>{listing.name.toLowerCase()}</span></p>
                    <textarea
                        name="message"
                        id="message"
                        rows="2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Enter your message here...'
                        className='w-full border-2 p-3 rounded-lg outline-none border-green-900'
                    ></textarea>
                    <Link
                        to={`mailto:${LandLord.email}?subject=${listing.name}&body=${message}`}
                        className='bg-slate-700 p-3 text-white rounded-md w-full text-center hover:opacity-90'
                    >
                        Send Message
                    </Link>
                </div>
            )}
        </div>
    );
}
