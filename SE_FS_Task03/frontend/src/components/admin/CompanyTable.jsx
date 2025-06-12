import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { DeleteIcon, Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompanyTable = () => {
    const { companies, searchText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchText) {
                return true;
            }
            return company?.name?.toLowerCase()?.includes(searchText.toLowerCase());
        })
        setFilterCompany(filteredCompany);
    }, [companies, searchText])

    return (
        <div className='mt-5'>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader className='bg-gray-100'>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.length <= 0 ? <span className='flex mt-5 text-xl font-bold'>Not Found</span> : (
                            filterCompany?.map((company) => (
                                <TableRow key={company._id}>
                                    <TableCell>
                                        <Avatar className='h-10 w-10'>
                                            <AvatarImage src={company?.logo} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company?.name}</TableCell>
                                    <TableCell>{company?.createdAt?.split('T')[0]}</TableCell>
                                    <TableCell className='text-right cursor-pointer'>
                                        <Popover >
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className='w-32 '>
                                                <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-3 mb-3 cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                                <div className='flex items-center gap-3 cursor-pointer'>
                                                    <DeleteIcon className='w-4' />
                                                    <span>Delete</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompanyTable