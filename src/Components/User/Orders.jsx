import React, { useEffect, useState } from 'react'

import { getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export default function Orders() {
  let [orders, setOrders] = useState([])

  let CheckoutStateData = useSelector(state => state.CheckoutStateData)
  let dispatch = useDispatch()

  useEffect(() => {
    (() => {
      dispatch(getCheckout())
      if (CheckoutStateData.length) {
        setOrders(CheckoutStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [CheckoutStateData.length])
  return (
    <>
      {orders.length ?
        orders.map(item => {
          return <div key={item.id}>
            <h5>Order Details</h5>
            <div className="table-responsive">
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Order Status</th>
                    <th>Payment Mode</th>
                    <th>Payment Status</th>
                    <th>Subtotal</th>
                    <th>Shipping</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <td>{item.id}</td>
                  <td>{item.orderStatus}</td>
                  <td>{item.paymentMode}</td>
                  <td>{item.paymentStatus}</td>
                  <td>&#8377;{item.subtotal}</td>
                  <td>&#8377;{item.shipping}</td>
                  <td>&#8377;{item.total}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                </tbody>
              </table>
            </div>
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {item.products?.map(item => {
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
                      <td>
                        <div className="btn-group">
                        <Link to={`/product/${item.product}`} className='btn btn-primary btn-sm'>Buy Again</Link>
                        </div>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        }) :
        <div className='text-center my-5'>
          <h4>No Order History Found</h4>
          <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
        </div>
      }
    </>
  )
}
