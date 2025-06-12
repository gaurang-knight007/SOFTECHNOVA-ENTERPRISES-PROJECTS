import React, { useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/store/companySlice'

const CreateCompany = () => {

    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const submitHandler = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-type': 'application/json'
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                toast.success(res.data.message);
                dispatch(setSingleCompany(res.data.company));
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type='text'
                    className='my-2'
                    placeholder='CarrerHunt, Google etc.'
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                <div className='flex items-center gap-2 my-10'>
                    <Button variant='outline' onClick={() => navigate('/admin/companies')}>Cancel</Button>
                    <Button onClick={submitHandler}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany