import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        appliedJob: [],
        wishlist: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        setAppliedJob: (state, action) => {
            state.appliedJob = action.payload;
        },
        addToWishlist: (state, action) => {
            state.wishlist = action.payload;
        },
    }
})

export const { setLoading, setAuthUser, setAppliedJob, addToWishlist } = authSlice.actions;
export default authSlice;