import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const statusData = ['Selected', 'Rejected']

const ApplicantsTable = () => {

    const { applicants } = useSelector(store => store.application);

    const statusChangeHandler = async (status, id) => {
        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants.applications?.length === 0 ? <TableRow><TableCell><span>No Application</span></TableCell></TableRow> : applicants?.applications?.map((application) => {
                            return <TableRow key={application._id}>
                                <TableCell>{application?.applicant?.fullname}</TableCell>
                                <TableCell>{application?.applicant?.email}</TableCell>
                                <TableCell>{application?.applicant?.contact}</TableCell>
                                <TableCell>
                                    {
                                        application?.applicant?.profile?.resume ? <Link className='text-blue-600 hover:underline' to={application?.applicant?.profile?.
                                            resume}>{application?.applicant?.profile?.
                                                resumeOriginalName}</Link> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{application?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover >
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                statusData.map((data, index) => (
                                                    <div onClick={() => statusChangeHandler(data, application._id)} key={index} className='flex items-center justify-center my-2 font-bold cursor-pointer'>{data}</div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable