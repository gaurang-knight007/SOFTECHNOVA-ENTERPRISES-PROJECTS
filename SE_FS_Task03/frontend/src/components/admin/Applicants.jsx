import React, { useEffect } from 'react'
import Navbar from '../shared/navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import useGetAllApplicants from '../hooks/useGetAllApplicants'
import { useSelector } from 'react-redux'


const Applicants = () => {
    const params = useParams();
    useGetAllApplicants(params.id);

    const { applicants } = useSelector(store => store.application);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-5'>
                <h1 className='text-xl font-bold my-5'>Applicants ({applicants.applications?.length})</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants