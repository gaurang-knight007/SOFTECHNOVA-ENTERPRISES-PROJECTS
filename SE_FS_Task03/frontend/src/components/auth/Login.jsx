import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser, setLoading } from '@/store/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate('/');
                toast.success(res.data.message);
            }
            else
                toast.error(res.data.message);

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
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
                    <div className='font-bold text-xl mb-5'>Login</div>
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

                    {loading ? <Button className='cursor-pointer w-full my-2'><Loader2 className='mr-2 h-5 w-5 animate-spin' />Please wait</Button> : <Button submit="submit" className='w-full cursor-pointer my-2'>Login</Button>}
                    <span>Don't have an account? <Link to='/signup' className='text-blue-800'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login