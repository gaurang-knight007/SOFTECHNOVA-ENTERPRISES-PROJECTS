import { setAppliedJob } from '@/store/authSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useGetAllAppliedJobs = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAppliedJob(res.data.applications))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAppliedJobs();
    }, [dispatch, id]);
}

export default useGetAllAppliedJobs;