import React, { useEffect } from 'react'
import Navbar from './shared/navbar'
import JobCard from './JobCard'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/store/jobSlice'
import useGetAllJobs from './hooks/useGetAllJobs'
import useGetAllWishlist from './hooks/useGetAllWishlist'

const Browse = () => {
    useGetAllWishlist();
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchedQuery(""));
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return <JobCard key={job._id} job={job} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse