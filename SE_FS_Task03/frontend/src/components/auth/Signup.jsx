import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        contact: "",
        role: "",
        file: null
    })

    const dispath = useDispatch();
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("fullname", input.fullname);
        formdata.append("email", input.email);
        formdata.append("password", input.password);
        formdata.append("contact", input.contact);
        formdata.append("role", input.role);
        if (input.file)
            formdata.append("file", input.file);

        try {
            dispath(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
            else
                toast.error(res.data.message);

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            dispath(setLoading(false));
        }

    }
    useEffect(() => {
        if (user)
            navigate('/');
    }, [])

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my10'>
                    <div className='font-bold text-xl mb-5'>Sign up</div>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type='text'
                            name='fullname'
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder='Indrajit Mondal'
                            className='my-2'
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type='email'
                            name='email'
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder='example@gmail.com'
                            className='my-2'
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type='password'
                            name='password'
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder='12345678'
                            className='my-2'
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Contact Number</Label>
                        <Input
                            type='number'
                            name='contact'
                            value={input.contact}
                            onChange={changeEventHandler}
                            placeholder='99999 99999'
                            className='my-2'
                        />
                    </div>
                    <div className='w-1/2'>
                        <Label>Profile</Label>
                        <Input
                            className='my-2'
                            type='file'
                            accept='image/*'
                            name='file'
                            onChange={changeFileHandler}
                        />
                    </div>
                    <div className='flex items-center'>
                        <RadioGroup className='flex items-center gap-4 my-2'>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    value='student'
                                    name='role'
                                    className='cursor-pointer'
                                    id='r1'
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                />
                                <Label className='cursor-pointer' htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    value='recruiter'
                                    name='role'
                                    className='cursor-pointer'
                                    id='r2'
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                />
                                <Label className='cursor-pointer' htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {loading ? <Button className='cursor-pointer w-full my-2'><Loader2 className='mr-2 h-5 w-5 animate-spin' />Please wait</Button> : <Button submit="submit" className='w-full cursor-pointer my-2'>Signup</Button>}
                    <span>Already have an account? <Link to='/login' className='text-blue-800'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup;