import React from 'react'
import Breadcrum from '../../Components/Breadcrum'
import { Link } from 'react-router-dom'

export default function OrderConfirmation() {
  return (
    <>
      <Breadcrum title="Order Has Been Placed" description="Your order has been successfully placed with Heritage Ally. Thank you for shopping with us! We’re preparing your items for delivery and will keep you updated with tracking details soon." />
      <div className="container">
        <div className="card p-5 text-center">
          <h1>Thank You</h1>
          <h2>Your Order Has Been Placed</h2>
          <h3>You Can Track Your Order in Profile Page</h3>
          <div className="btn-group w-50 m-auto">
            <Link to="/shop" className='btn btn-primary'>Shop More</Link>
            <Link to="/profile?option=Orders" className='btn btn-secondary'>Profile</Link>
          </div>
        </div>
      </div>
    </>
  )
}
