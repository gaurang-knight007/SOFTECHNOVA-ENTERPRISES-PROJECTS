import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/store/jobSlice';

const filterData = [
    {
        filterType: 'Location',
        array: ['Delhi', 'Mumbai', 'Hyderabad', 'Bengalore', 'Gurugram', 'Kolkata']
    },
    {
        filterType: 'Industry',
        array: ['Frontend Developer', 'Backend Developer', 'Fullstack', 'Data Science']
    },
    {
        filterType: 'Salary',
        array: ['0-40k', '40k-1lakh', '1lakh-5lakh']
    }
];

const FilterSection = () => {
    const dispatch = useDispatch();
    const [selectedValues, setSelectedValues] = useState("");

    const changeHandler = (value) => {
        setSelectedValues(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValues));
    }, [selectedValues]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValues} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'> {data.filterType} </h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={idx} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterSection