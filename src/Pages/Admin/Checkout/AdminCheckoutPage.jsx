import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import DataTable from 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"
export default function AdminCheckoutPage() {
    let [data, setData] = useState([])
    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()

    let [flag, setFlag] = useState(false)

    function updateStatus(id) {
        if (window.confirm("Are You Sure to Update Status : ")) {
            let item = data.find(x => x.id === id)
            let index = data.findIndex(x => x.id === id)
            item.status = !item.status
            dispatch(updateCheckout({ ...item }))
            data[index].status = item.status
            setData(data)
            setFlag(!flag)
        }
    }
    useEffect(() => {
        let time = (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                setData(CheckoutStateData)
            }
            let time = setTimeout(() => {
                new DataTable('#myTable')
            }, 500)
            return time
        })()
        return () => clearTimeout(time)
    }, [CheckoutStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Checkout</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>User</th>
                                        <th>Order Status</th>
                                        <th>Payment Mode</th>
                                        <th>Payment Status</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.deliveryAddress.name},{item.deliveryAddress.city}</td>
                                            <td>{item.orderStatus}</td>
                                            <td>{item.paymentMode}</td>
                                            <td>{item.paymentStatus}</td>
                                            <td>&#8377;{item.total}</td>
                                            <td>{new Date(item.date).toLocaleDateString()}</td>
                                            <td><Link to={`/admin/checkout/show/${item.id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link></td>
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
