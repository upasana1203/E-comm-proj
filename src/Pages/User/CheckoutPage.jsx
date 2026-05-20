import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../Components/Breadcrum'

import { getCart, deleteCart } from "../../Redux/ActionCreators/CartActionCreators"
import { getProduct, updateProduct } from "../../Redux/ActionCreators/ProductActionCreators"
import { createCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"

export default function CheckoutPage() {
  let [user, setUser] = useState({})
  let [data, setData] = useState([])
  let [subtotal, setSubtotal] = useState(0)
  let [shipping, setShipping] = useState(0)
  let [total, setTotal] = useState(0)

  let [selected, setSelected] = useState({
    deliveryAddress: {},
    paymentMode: "COD"
  })

  let CartStateData = useSelector(state => state.CartStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()

  let navigate = useNavigate()

  function calculate(cart) {
    let subtotal = 0
    cart.forEach(element => subtotal += element.total)
    if (subtotal > 0 && subtotal < 1000) {
      setShipping(150)
      setTotal(subtotal + 150)
    }
    else {
      setShipping(0)
      setTotal(subtotal)
    }
    setSubtotal(subtotal)
  }

  function placeOrder() {
    let item = {
      user: localStorage.getItem("userid"),
      deliveryAddress: selected.deliveryAddress,
      paymentMode: selected.paymentMode,
      orderStatus: "Order Has Been Placed",
      paymentStatus: "Pending",
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date(),
      products: data
    }
    dispatch(createCheckout(item))
    data.forEach(cart => {
      let p = ProductStateData.find(x => x.id === cart.product)
      p.stockQuantity = p.stockQuantity - cart.qty
      p.stock = p.stockQuantity === 0 ? false : true
      dispatch(updateProduct(p))
      dispatch(deleteCart(cart))
    })
    navigate("/order-confirmation")
  }

  useEffect(() => {
    (() => {
      dispatch(getCart())
      if (CartStateData.length && ProductStateData.length) {
        let cart = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
        cart = cart.map(x => {
          let product = ProductStateData.find(p => p.id === x.product)
          x.stockQuantity = product.stockQuantity
          return x
        })
        setData(cart)
        calculate(cart)
      }
    })()
  }, [CartStateData.length, ProductStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getProduct())
    })()
  }, [ProductStateData.length])


  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setUser(response)
      setSelected({ ...selected, deliveryAddress: response.address[0] })
    })()
  }, [])
  return (
    <>
      <Breadcrum title="Place Order" description="Complete your purchase securely on the Heritage Ally checkout page. Review your order, choose your preferred payment method, and enjoy a fast, smooth, and reliable shopping experience." />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h5 className='bg-primary text-center p-2 text-light'>Choose Delivery Address</h5>
            {user.address?.map((item, index) => {
              return <div key={index} className='card p-2' onClick={() => setSelected({ ...selected, deliveryAddress: item })}>
                <h6>{item.name}</h6>
                <h6>{item.phone},{item.email}</h6>
                <h6>{item.address}</h6>
                <h6>{item.pin},{item.city},{item.state}</h6>
                {selected.deliveryAddress.address === item.address ? <i className='bi bi-check fs-4 position-absolute end-0'></i> : null}
              </div>
            })}
            <h5 className='bg-primary text-center p-2 text-light'>Choose Payment Mode</h5>
            <div className='d-flex'>
              <div className='w-100 card p-2' onClick={() => setSelected({ ...selected, paymentMode: "COD" })}>
                <h6>Cash On Delivery</h6>
                {selected.paymentMode === "COD" ? <i className='bi bi-check fs-4 position-absolute end-0'></i> : null}
              </div>
              <div className='w-100 card p-2' onClick={() => setSelected({ ...selected, paymentMode: "Net Banking" })}>
                <h6>Net Banking/Card/UPI</h6>
                {selected.paymentMode === "Net Banking" ? <i className='bi bi-check fs-4 position-absolute end-0'></i> : null}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h5 className='bg-primary text-center p-2 text-light'>Products in Cart</h5>
            <div className="table-responsive">
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return <tr key={index}>
                      <td className={item.stockQuantity ? 'text-dark' : 'text-danger'}>{item.name}<br />
                        {item.stockQuantity === 0 ? `(Out Of Stock)` : null}
                      </td>
                      <td>{item.brand}</td>
                      <td>{item.color}</td>
                      <td>{item.size}</td>
                      <td>&#8377;{item.finalPrice}</td>
                      <td>{item.qty}</td>
                      <td>&#8377;{item.total}</td>
                    </tr>
                  })}
                </tbody>
              </table>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Subtotal</th>
                    <td>&#8377;{subtotal}</td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td>&#8377;{shipping}</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>&#8377;{total}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      {user.address?.length > 0 ?
                        data.find(x => x.stockQuantity === 0) ?
                          <p className='text-danger'>One Or More Products in Your Cart Are Out Of Stock, Please Remove Them to Proceed to Checkout</p> : <button className='btn btn-primary w-100' onClick={placeOrder}>Place Order</button>
                        :<Link to="/profile?option=Address" className='btn btn-primary w-100'>Create a Delivery Address First</Link>
                      }
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
