import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import DataTable from 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getUser, deleteUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreators"
export default function AdminUserPage() {
    let [data, setData] = useState([])
    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()


    let [flag, setFlag] = useState(false)

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete That Record : ")) {
            dispatch(deleteUser({ id: id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    function updateStatus(id) {
        if (window.confirm("Are Your Sure to Change Status : ")) {
            let item = data.find(x => x.id === id)
            let index = data.findIndex(x => x.id === id)
            item.status = !item.status
            dispatch(updateUser({ ...item }))
            data[index].status = item.status
            setData(data)
            setFlag(!flag)
        }
    }

    useEffect(() => {
        let time = (() => {
            dispatch(getUser())
            if (UserStateData.length) {
                setData(UserStateData)
            }
            let time = setTimeout(() => {
                new DataTable('#myTable')
            }, 500)
            return time
        })()
        return () => clearTimeout(time)
    }, [UserStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>User <Link to="/admin/user/create"><i className='bi bi-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive">
                            <table className='table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
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
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.role}</td>
                                            <td style={{ cursor: "pointer" }} onClick={() => updateStatus(item.id)}>{item.status ? "Active" : "Inactive"}</td>
                                            <td>{item.role === "Buyer" ? null : <Link to={`/admin/user/update/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil'></i></Link>}</td>
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
