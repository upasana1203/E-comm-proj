import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import DataTable from 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreators"
export default function AdminContactUsPage() {
    let [data, setData] = useState([])
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()

    let [flag, setFlag] = useState(false)

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete That Record : ")) {
            dispatch(deleteContactUs({ id: id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    function updateStatus(id) {
        if (window.confirm("Are You Sure to Update Status : ")) {
            let item = data.find(x => x.id === id)
            let index = data.findIndex(x => x.id === id)
            item.status = !item.status
            dispatch(updateContactUs({ ...item }))
            data[index].status = item.status
            setData(data)
            setFlag(!flag)
        }
    }
    useEffect(() => {
        let time = (() => {
            dispatch(getContactUs())
            if (ContactUsStateData.length) {
                setData(ContactUsStateData)
            }
            let time = setTimeout(() => {
                new DataTable('#myTable')
            }, 500)
            return time
        })()
        return () => clearTimeout(time)
    }, [ContactUsStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>ContactUs</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>
                                                <div style={{ width: 200 }}>
                                                    {item.subject}
                                                </div>
                                            </td>
                                            <td>{new Date(item.date).toLocaleDateString()}</td>
                                            <td style={{ cursor: "pointer" }} onClick={() => updateStatus(item.id)}>{item.status ? "Active" : "Inactive"}</td>
                                            <td><Link to={`/admin/contactus/show/${item.id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link></td>
                                            <td>
                                                {item.status ? null : <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button>}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
