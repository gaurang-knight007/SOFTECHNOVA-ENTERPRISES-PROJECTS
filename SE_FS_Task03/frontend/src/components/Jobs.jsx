import React, { useEffect, useState } from 'react'
import FilterSection from './FilterSection'
import JobCard from './JobCard';
import Navbar from './shared/navbar';
import { useSelector } from 'react-redux';
import useGetAllWishlist from './hooks/useGetAllWishlist';

const Jobs = () => {
    useGetAllWishlist()
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filteredJobs, setFilteredJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filterJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase());
            })
            setFilteredJobs(filterJobs);
        } else {
            setFilteredJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterSection />
                    </div>
                    {
                        filteredJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filteredJobs.map((job) => (
                                            <div key={job._id}>
                                                <JobCard job={job} />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Jobs