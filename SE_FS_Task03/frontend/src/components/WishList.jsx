import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './shared/navbar';
import JobCard from './JobCard';
import { addToWishlist } from '@/store/authSlice';
import { JOBS_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const WishList = () => {
    const { wishlist } = useSelector(store => store.auth);
    const [localWishlist, setLocalWishlist] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        refreshWishlist();
    }, []);

    const refreshWishlist = async () => {
        try {
            const res = await axios.get(`${JOBS_API_END_POINT}/getfromwishlist`, { withCredentials: true });
            if (res.data.success) {
                dispatch(addToWishlist(res.data.user.wishlist));
                setLocalWishlist(res.data.user.wishlist);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveFromWishlist = (jobId) => {
        const updatedList = localWishlist.filter(job => job._id !== jobId);
        setLocalWishlist(updatedList);
        dispatch(addToWishlist(updatedList));
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Wishlist Items ({wishlist.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        wishlist.map((job) => {
                            return <JobCard key={job._id} job={job} onRemove={() => handleRemoveFromWishlist(job._id)} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default WishList