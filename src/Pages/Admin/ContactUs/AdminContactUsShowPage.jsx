import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreators"
export default function AdminContactUsShowPage() {
    let { id } = useParams()
    let [data, setData] = useState({})

    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()

    let [flag, setFlag] = useState(false)
    let navigate = useNavigate()

    function deleteRecord() {
        if (window.confirm("Are You Sure to Delete That Record : ")) {
            dispatch(deleteContactUs({ id: id }))
            navigate("/admin/contactus")
        }
    }

    function updateStatus() {
        if (window.confirm("Are You Sure to Update Status : ")) {
            data.status = !data.status
            dispatch(updateContactUs({ ...data }))
            setData(data)
            setFlag(!flag)
        }
    }
    useEffect(() => {
        (() => {
            dispatch(getContactUs())
            if (ContactUsStateData.length) {
                let item = ContactUsStateData.find(x => x.id === id)
                if (item)
                    setData({ ...item })
                else
                    navigate("/admin/contactus")
            }
        })()
    }, [ContactUsStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>ContactUs Query</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{data.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Subject</th>
                                        <td>{data.subject}</td>
                                    </tr>
                                    <tr>
                                        <th>Message</th>
                                        <td>{data.message}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{data.status ? "Active" : "Inactive"}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {data.status ?
                                                <button onClick={updateStatus} className='btn btn-primary w-100'>Update</button> :
                                                <button onClick={deleteRecord} className='btn btn-danger w-100'>Delete</button>}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
