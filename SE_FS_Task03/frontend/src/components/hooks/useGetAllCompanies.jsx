import { setAllCompanies } from '@/store/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    }, [dispatch])
}

export default useGetAllCompanies