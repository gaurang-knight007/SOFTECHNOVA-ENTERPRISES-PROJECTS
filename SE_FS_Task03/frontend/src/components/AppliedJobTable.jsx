import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { appliedJob } = useSelector(store => store.auth);
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        appliedJob.length == 0 ? <span>You haven't applied any job yet.</span> : (
                            appliedJob.map((application) => (
                                <TableRow key={application._id}>
                                    <TableCell>{application?.createdAt.split('T')[0]}</TableCell>
                                    <TableCell>{application?.job?.title}</TableCell>
                                    <TableCell>{application?.job?.companyId?.name}</TableCell>
                                    <TableCell className='text-right'><Badge className={`text-md py-2 px-3 ${application.status === 'selected' && 'bg-green-800'} ${application.status === 'rejected' && 'bg-red-800'} ${application.status === 'pending' && 'bg-gray-400'}`}>{application.status.toUpperCase()}</Badge></TableCell>
                                </TableRow>
                            ))
                        )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable