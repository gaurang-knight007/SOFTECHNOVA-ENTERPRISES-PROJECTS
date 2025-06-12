import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '@/store/authSlice';
import axios from 'axios';
import { JOBS_API_END_POINT } from '@/utils/constant';

const useGetAllWishlist = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await axios.get(`${JOBS_API_END_POINT}/getfromwishlist`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(addToWishlist(res.data.user.wishlist));
                }
            } catch (err) {
                console.error("Failed to fetch wishlist:", err);
            }
        };

        fetchWishlist();
    }, [dispatch]);
};

export default useGetAllWishlist;
