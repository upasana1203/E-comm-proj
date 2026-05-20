import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getNewsletter, deleteNewsletter, updateNewsletter } from "../../../Redux/ActionCreators/NewsletterActionCreators"
export default function AdminNewsletterPage() {
    let [data, setData] = useState([])
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let dispatch = useDispatch()

    let [flag, setFlag] = useState(false)

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete That Record : ")) {
            dispatch(deleteNewsletter({ id: id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    function updateStatus(id) {
        let item = data.find(x => x.id === id)
        let index = data.findIndex(x => x.id === id)
        item.status = !item.status
        dispatch(updateNewsletter({ ...item }))
        data[index].status = item.status
        setData(data)
        setFlag(!flag)
    }
    useEffect(() => {
        let time = (() => {
            dispatch(getNewsletter())
            if (NewsletterStateData.length) {
                setData(NewsletterStateData)
            }
            let time = setTimeout(() => {
                new DataTable('#myTable')
            }, 500)
            return time
        })()
        return () => clearTimeout(time)
    }, [NewsletterStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Newsletter</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td style={{ cursor: "pointer" }} onClick={() => updateStatus(item.id)}>{item.status ? "Active" : "Inactive"}</td>
                                            <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button> : null}</td>
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
