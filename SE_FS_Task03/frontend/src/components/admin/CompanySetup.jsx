import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '@/store/companySlice'
import useGetCompanyById from '../hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    const id = params.id;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { singleCompany } = useSelector(store => store.company);

    useGetCompanyById(id);

    const [input, setInput] = useState({
        companyName: "",
        description: "",
        location: "",
        website: "",
        file: null
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('companyName', input.companyName);
        formData.append('description', input.description);
        formData.append('location', input.location);
        formData.append('website', input.website);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setSingleCompany(res.data.company));
                navigate('/admin/companies');
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            companyName: singleCompany.name || "",
            description: singleCompany.description || "",
            location: singleCompany.location || "",
            website: singleCompany.website || "",
            file: singleCompany.file || null
        })
    }, [singleCompany])

    return (
        <div>
            <Navbar />
            <div className='max-w-2xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 my-4'>
                        <Button onClick={() => navigate('/admin/companies')} variant='outline'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-7 p-4'>
                        <div >
                            <Label>Company Name</Label>
                            <Input
                                type='text'
                                name='companyName'
                                className='mt-2'
                                placeholder='Enter your company name'
                                value={input.companyName}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                className='mt-2'
                                placeholder='Something about your company'
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                className='mt-2'
                                placeholder='Address...'
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type='text'
                                name='website'
                                className='mt-2'
                                placeholder='Enter your website URL'
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type='file'
                                name='file'
                                className='mt-2'
                                accept='image/*'
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {loading ? <Button className='cursor-pointer w-full my-2'><Loader2 className='mr-2 h-5 w-5 animate-spin' />Please wait</Button> : <Button submit="submit" className='w-full cursor-pointer my-2'>Update</Button>}
                </form>
            </div>
        </div>
    )
}

export default CompanySetup;