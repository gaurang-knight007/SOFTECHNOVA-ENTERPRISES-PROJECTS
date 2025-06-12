import React, { useState } from 'react'
import Navbar from './shared/navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAllAppliedJobs from './hooks/useGetAllAppliedJobs'


const isResume = true;

const Profile = () => {

    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    useGetAllAppliedJobs(user._id);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-3'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user?.profile?.profilePhoto} />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-xl'>{user?.fullname}</h1>
                            <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
                </div>
                <div className="my-5">
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.contact}</span>
                    </div>
                </div>
                <div>
                    <h1 className='my-3 text-md font-bold'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length ? user?.profile?.skills.map((skill, index) => {
                                return <Badge key={index}>{skill}</Badge>
                            }) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1 mt-5'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? <a target='_blank' href={user?.profile?.resume} className='w-full text-blue-500 hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl mb-10'>
                <h1 className='font-bold text-xl py-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile