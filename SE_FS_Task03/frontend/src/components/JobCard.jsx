import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, Loader2 } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOBS_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const JobCard = ({ job, onRemove }) => {
    const { wishlist } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

    useEffect(() => {
        setIsAddedToWishlist(wishlist?.some(item => item._id === job._id));
    }, [wishlist, job._id]);


    const getDate = (mongodbTime) => {
        const createdDate = new Date(mongodbTime);
        const currentDate = new Date();

        const timeDifference = currentDate - createdDate;

        return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    }

    const clickAddEventHandler = async (id) => {
        try {
            setLoading(true);
            const res = await axios.get(`${JOBS_API_END_POINT}/addtowishlist/${id}`, { withCredentials: true });
            console.log(res)
            if (res.data.success) {
                toast.success(res.data.message);
            }
            setIsAddedToWishlist(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const clickRemoveEventHandler = async (id) => {
        try {
            setLoading(true);
            const res = await axios.get(`${JOBS_API_END_POINT}/removewishlist/${id}`, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data.message);
                setIsAddedToWishlist(false);
                if (onRemove) {
                    onRemove();
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-grey-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-grey-200'>{getDate(job?.createdAt) <= 0 ? "Today" : `${getDate(job?.createdAt)} days ago`}</p>
                <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button variant='outline' size='icon'>
                    <Avatar>
                        <AvatarImage src={job?.companyId?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.companyId?.name}</h1>
                    <p className='text-sm text-grey-300'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant='ghost' className='font-bold text-blue-700'>{job?.jobtype}</Badge>
                <Badge variant='ghost' className='font-bold text-[#960064]'>{job?.position} Positions</Badge>
                <Badge variant='ghost' className='font-bold text-[#00aeff]'>{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-2 my-4'>
                <Button variant='outline'><Link to={`/description/${job._id}`}>Details</Link></Button>
                {
                    loading ? <Button className='bg-[#1d66b9]'><Loader2 className='h-5 w-5 animate-spin' />Please Wait</Button> : isAddedToWishlist ? <Button className='bg-[#b91d1d]' onClick={() => clickRemoveEventHandler(job._id)}>Remove from wishlist</Button> : <Button className='bg-[#1d66b9]' onClick={() => clickAddEventHandler(job._id)}>Save for later</Button>
                }
            </div>
        </div>
    )
}

export default JobCard