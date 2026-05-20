import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"
export default function AdminCheckoutShowPage() {
    let { id } = useParams()
    let [data, setData] = useState({})

    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setPaymentStatus] = useState("")

    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()

    let [flag, setFlag] = useState(false)
    let navigate = useNavigate()

    function updateStatus() {
        if (window.confirm("Are You Sure to Update Status : ")) {
            data.orderStatus = orderStatus
            data.paymentStatus = paymentStatus
            dispatch(updateCheckout({ ...data }))
            setData(data)
            setFlag(!flag)
        }
    }
    useEffect(() => {
        (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                let item = CheckoutStateData.find(x => x.id === id)
                if (item) {
                    setData({ ...item })
                    setOrderStatus(item.orderStatus)
                    setPaymentStatus(item.paymentStatus)
                }
                else
                    navigate("/admin/checkout")
            }
        })()
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
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Delivery Address</th>
                                        <td>
                                            {data.deliveryAddress?.name}<br />
                                            {data.deliveryAddress?.phone},{data.deliveryAddress?.email}<br />
                                            {data.deliveryAddress?.address}<br />
                                            {data.deliveryAddress?.pin},{data.deliveryAddress?.city},{data.deliveryAddress?.state}<br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{data.orderStatus}
                                            {data.orderStatus !== "Delivered" ?
                                                <select className='mt-3 form-select border-primary' onChange={(e) => setOrderStatus(e.target.value)} value={orderStatus}>
                                                    <option>Order Has Been Placed</option>
                                                    <option>Order is Ready to Ship</option>
                                                    <option>Order Has Been Shipped</option>
                                                    <option>Order Has Been In Transit</option>
                                                    <option>Order is Reached at the Final Delivery Station</option>
                                                    <option>Order is Out For Delivery</option>
                                                    <option>Delivered</option>
                                                </select> : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentMode}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentStatus}
                                            {data.paymentStatus === "Pending" ?
                                                <select className='mt-3 form-select border-primary' onChange={(e) => setPaymentStatus(e.target.value)} value={paymentStatus}>
                                                    <option>Pending</option>
                                                    <option>Done</option>
                                                </select> : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>RPPID</th>
                                        <td>{data.rppid ? data.rppid : "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {data.orderStatus !== "Delivered" || data.paymentStatus === "pending" ?
                                                <button onClick={updateStatus} className='btn btn-primary w-100'>Update</button> : null}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <h5>Products in This Order</h5>
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Brand</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.products?.map(item => {
                                            return <tr key={item.id}>
                                                <td>
                                                    <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} target='_blank'>
                                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} height={70} width={90} alt="" />
                                                    </Link>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.brand}</td>
                                                <td>{item?.color}</td>
                                                <td>{item?.size}</td>
                                                <td>&#8377;{item.finalPrice}</td>
                                                <td>{item.qty}</td>
                                                <td>&#8377;{item.total}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
