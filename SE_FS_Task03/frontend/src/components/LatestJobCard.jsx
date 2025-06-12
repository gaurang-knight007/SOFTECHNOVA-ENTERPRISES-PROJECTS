import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCard = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-grey-200 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.companyId?.name}</h1>
                <p className='text-sm text-grey-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-grey-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant='ghost' className='font-bold text-blue-700'>{job?.jobtype}</Badge>
                <Badge variant='ghost' className='font-bold text-[#960064]'>{job?.position} Positions</Badge>
                <Badge variant='ghost' className='font-bold text-[#00aeff]'>{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCard