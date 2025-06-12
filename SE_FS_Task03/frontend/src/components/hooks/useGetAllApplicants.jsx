import { setApplicants } from '@/store/applicataionSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useGetAllApplicants = (jobId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setApplicants(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchApplicants();
    }, [dispatch, jobId])
}

export default useGetAllApplicants;