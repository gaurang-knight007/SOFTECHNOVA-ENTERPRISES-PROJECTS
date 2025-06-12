import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/store/jobSlice';

const Herosections = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    }

    return (
        <div className='text-center'>

            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Great careers begin with a single opportunity</span>
                <h1 className='text-5xl font-bold'>Success starts with the right opportunity<br /> <span className='text-[#0f0e61]'>– let’s find yours!</span></h1>

                <p className='mx-auto text-sm text-gray-500 w-2/3'>Your future starts here! Discover exciting job opportunities, connect with leading companies, and take the next big step in your career. We make the job search easy, so you can focus on what truly matters—building your success story.</p>

                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='find your dream jobs'
                        className='outline-none border-none w-full'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button onClick={submitHandler} className='rounded-r-full bg-[#0f0e61] cursor-pointer'><Search className='h-6 w-6' /> </Button>
                </div>
            </div>

        </div>
    )
}

export default Herosections