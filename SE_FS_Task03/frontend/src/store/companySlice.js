import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: 'company',
    initialState: {
        singleCompany: null,
        companies: [],
        searchText: ""
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setAllCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        }
    }
})

export const { setSingleCompany, setAllCompanies, setSearchText } = companySlice.actions;
export default companySlice;