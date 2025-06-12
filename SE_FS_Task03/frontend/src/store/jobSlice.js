import { createSlice } from '@reduxjs/toolkit'

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchJobByText: "",
        searchedQuery: ""
    },
    reducers: {
        setAllJobs: (state, actions) => {
            state.allJobs = actions.payload;
        },
        setSingleJob: (state, actions) => {
            state.singleJob = actions.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
    }
})

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setSearchedQuery
} = jobSlice.actions;
export default jobSlice;