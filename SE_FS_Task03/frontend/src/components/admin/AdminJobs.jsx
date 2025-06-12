import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/store/jobSlice'
import AdminJobsTable from './AdminJobsTable'

const AdminJobs = () => {
    const navigate = useNavigate();
    useGetAllAdminJobs();
    const dispatch = useDispatch();
    const [searchText, SetSearchText] = useState("");

    useEffect(() => {
        dispatch(setSearchJobByText(searchText));
    }, [dispatch, searchText])

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <Input
                        className='w-fit py-6'
                        placeholder='Filter by company name or role'
                        onChange={(e) => SetSearchText(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/Jobs/create')} className='cursor-pointer'>New Job</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs