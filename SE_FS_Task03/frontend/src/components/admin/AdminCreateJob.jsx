import React, { useState } from 'react'
import Navbar from '../shared/navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { JOBS_API_END_POINT } from '@/utils/constant'
import { setAllAdminJobs } from '@/store/jobSlice'


const AdminCreateJob = () => {
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        position: 0,
        salary: 0,
        location: "",
        jobtype: "",
        experience: 0,
        companyId: ""
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeSelectValueHandler = (value) => {
        const company = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: company._id });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOBS_API_END_POINT}/post`, input, {
                headers: {
                    'Content-type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-2'>
                <form onSubmit={submitHandler} className='p-4 max-w-5xl border border-gray-200 shadow-lg rounded-md'>
                    <Button onClick={() => navigate('/admin/jobs')} variant='outline'>
                        <ArrowLeft />
                    </Button>
                    <div className='grid grid-cols-2 gap-5 p-2'>
                        <div>
                            <Label>Role</Label>
                            <Input
                                type='text'
                                name='title'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='Enter Job Role'
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div >
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='Enter Job Description'
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div >
                            <Label>Requirements</Label>
                            <Input
                                type='text'
                                name='requirements'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='Enter Job Requirements'
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div >
                            <Label>Position</Label>
                            <Input
                                type='number'
                                name='position'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                placeholder='Enter Number of Position'
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div >
                            <Label>Experience</Label>
                            <Input
                                type='number'
                                name='experience'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                placeholder='Enter require experience'
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div >
                            <Label>Salary</Label>
                            <Input
                                type='number'
                                name='salary'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                placeholder='Enter Salary in LPA'
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div >
                            <Label>Job Type</Label>
                            <Input
                                type='text'
                                name='jobtype'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='Enter Job type'
                                value={input.jobtype}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div >
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='Enter Job Location'
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div >
                            <Label className='mb-2'>Company</Label>
                            {
                                companies.length > 0 && (
                                    <Select onValueChange={changeSelectValueHandler}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => (
                                                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company?.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                        </div>
                    </div>
                    {loading ? <Button className='cursor-pointer w-full my-2'><Loader2 className='mr-2 h-5 w-5 animate-spin' />Please wait</Button> : <Button className='w-full cursor-pointer mt-2'>Post Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs font-bold text-red-600 text-center mt-2'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default AdminCreateJob