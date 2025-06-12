import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)

    return (
        <div className='max-w-6xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'> <span className='text-[#0f0e61]'>Latest & Top </span>Job Opening</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>Jon not found.</span> : allJobs.slice(0, 6).map((job) => (
                        <LatestJobCard key={job._id} job={job} />))
                }
            </div>
        </div>
    )
}

export default LatestJobs