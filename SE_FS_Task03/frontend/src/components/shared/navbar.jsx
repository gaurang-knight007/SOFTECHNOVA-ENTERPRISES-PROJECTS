import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button';
import { Heart, LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setAuthUser } from '@/store/authSlice';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate('/');
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  }

  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-6xl h-16'>
        <div>
          <Link to='/'><h1 className='text-2xl font-bold'>Career<span className='text-[#0244f8]'>Hunt</span></h1></Link>
        </div>
        <div className='flex gap-15'>
          <ul className='flex font-medium items-center gap-5 cursor-pointer'>
            {
              user?.role === 'recruiter' ?
                (
                  <>
                    <li><Link to='/admin/jobs'>Jobs</Link></li>
                    <li><Link to='/admin/companies'>Companies</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/jobs'>Jobs</Link></li>
                    <li><Link to='/browse'>Browse</Link></li>
                    <li><Link to='/wishlist'><Heart /></Link></li>
                  </>
                )
            }
          </ul>

          {!user ? <div className='flex items-center gap-2'>
            <Link to='/login'><Button variant='outline' className='cursor-pointer'>Login</Button></Link>
            <Link to='/signup'><Button className='bg-[#0f0e61] cursor-pointer hover:bg-[#090849]'>Signup</Button></Link>
          </div> :
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className='flex space-y-4 gap-5'>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h1 className='font-medium'>{user.fullname}</h1>
                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className='flex flex-col my-2 text-gray-500'>
                  <div className='flex w-fit items-center gap-2 cursor-pointer outline-none'>
                    <User2 />
                    <Button variant='link'><Link to='/profile'>View Profile</Link></Button>
                  </div>
                  <div className='flex w-fit items-center gap-2'>
                    <LogOut />
                    <Button variant='link' className='cursor-pointer outline-none' onClick={logoutHandler}>Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar;