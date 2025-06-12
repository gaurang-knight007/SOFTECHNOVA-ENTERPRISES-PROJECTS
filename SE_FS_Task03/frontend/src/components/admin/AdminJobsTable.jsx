import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { DeleteIcon, Edit2, Eye, MoreHorizontal } from 'lucide-react';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJob, setFilterJob] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase()?.includes(searchJobByText.toLowerCase()) || job?.companyId?.name?.toLowerCase()?.includes(searchJobByText.toLowerCase());
        })
        setFilterJob(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div className='mt-5'>
            <Table>
                <TableCaption>A list of your recent registered Jobs</TableCaption>
                <TableHeader className='bg-gray-100'>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJob?.length <= 0 ? <TableRow><TableCell> <span className='flex mt-5 text-xl font-bold'>Not Found</span></TableCell></TableRow> : (
                            filterJob?.map((job) => (
                                <TableRow key={job._id}>
                                    <TableCell>{job?.companyId?.name}</TableCell>
                                    <TableCell>{job?.title}</TableCell>
                                    <TableCell>{job?.createdAt?.split('T')[0]}</TableCell>
                                    <TableCell className='text-right cursor-pointer'>
                                        <Popover >
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className='w-32 '>
                                                <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className='flex items-center gap-3 mb-3 cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={() => navigate(`/admin/${job._id}/applicants`)} className='flex items-center gap-3 mb-3 cursor-pointer'>
                                                    <Eye className='w-4' />
                                                    <span>Applicants</span>
                                                </div>
                                                <div className='flex items-center gap-3 cursor-pointer'>
                                                    <DeleteIcon className='w-4' />
                                                    <span>Delete</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable