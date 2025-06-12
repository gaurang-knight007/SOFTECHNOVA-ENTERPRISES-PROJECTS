import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/store/authSlice'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

const UpdateProfileDialog = ({ open, setOpen }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        contact: user?.contact,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills.map((skill) => skill),
        file: user?.profile?.resume
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('contact', input.contact);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);

        if (input.file)
            formData.append('file', input.file);

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                toast.success(res.data.message);
            }
            else
                toast.error(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 py-4">
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name'>Name</Label>
                                <Input
                                    name='name'
                                    type='text'
                                    id='name'
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    name='email'
                                    type='text'
                                    id='email'
                                    onChange={changeEventHandler}
                                    value={input.email}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='contact'>Contact</Label>
                                <Input
                                    name='contact'
                                    type='text'
                                    id='contact'
                                    onChange={changeEventHandler}
                                    value={input.contact}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='bio'>Bio</Label>
                                <Input
                                    name='bio'
                                    type='text'
                                    value={input.bio}
                                    id='bio'
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='skills'>Skills</Label>
                                <Input
                                    name='skills'
                                    type='text'
                                    value={input.skills}
                                    id='skills'
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='file'>Resume</Label>
                                <Input
                                    name='file'
                                    type='file'
                                    id='file'
                                    onChange={fileChangeHandler}
                                    className='col-span-3'
                                />
                            </div>
                        </div>
                        {loading ? <Button className='cursor-pointer w-full my-2'><Loader2 className='mr-2 h-5 w-5 animate-spin' />Please wait</Button> : <Button submit="submit" className='w-full cursor-pointer my-2'>Update</Button>}
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog