import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Bounce, ToastContainer, toast } from 'react-toastify';

import { getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
import { getTestimonial, createTestimonial, updateTestimonial } from "../../Redux/ActionCreators/TestimonialActionCreators"

const inputOptions = {
  message: "",
  star: "5",
  product: "",
  user: ""
}
export default function Orders() {
  let [orders, setOrders] = useState([])
  let [reviews, setReviews] = useState([])

  let [showModal, setShowModal] = useState(false)
  let [option, setOption] = useState("")

  let [inputData, setInputData] = useState(inputOptions)

  let CheckoutStateData = useSelector(state => state.CheckoutStateData)
  let TestimonialStateData = useSelector(state => state.TestimonialStateData)

  let dispatch = useDispatch()

  function createRecord(id) {
    setShowModal(true)
    setOption("Create")
    setInputData({ ...inputOptions, product: id, user: localStorage.getItem("userid") })
  }

  function updateRecord(id) {
    let item = reviews.find(x => x.product === id)
    setShowModal(true)
    setInputData({ ...item })
    setOption("Update")
  }

  function getInputData(e) {
    let { name, value } = e.target
    setInputData({ ...inputData, [name]: value })
  }

  async function postData(e) {
    e.preventDefault()
    if (option === "Create") {
      dispatch(createTestimonial({ ...inputData, star: parseInt(inputData.star) }))
      setShowModal(false)
      setInputData(inputOptions)
      toast("Review Has Been Submitted")
    }
    else {
      dispatch(updateTestimonial({ ...inputData }))
      toast("Review Has Been Updated")
      let index = reviews.findIndex(x => x.product === inputData.product)
      reviews[index] = { ...inputData }
      setShowModal(false)
      setInputData(inputOptions)

    }
  }

  function check(id) {
    let result = reviews.find(x => x.product === id && x.user === localStorage.getItem("userid")) ? true : false
    return result
  }

  useEffect(() => {
    (() => {
      dispatch(getCheckout())
      if (CheckoutStateData.length) {
        setOrders(CheckoutStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [CheckoutStateData.length])


  useEffect(() => {
    (() => {
      dispatch(getTestimonial())
      if (TestimonialStateData.length) {
        setReviews(TestimonialStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [TestimonialStateData.length])
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
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.orderStatus}</td>
                    <td>{item.paymentMode}</td>
                    <td>{item.paymentStatus}</td>
                    <td>&#8377;{item.subtotal}</td>
                    <td>&#8377;{item.shipping}</td>
                    <td>&#8377;{item.total}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                  </tr>
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
                  {item.products?.map(x => {
                    return <tr key={x.id}>
                      <td>
                        <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${x.pic}`} target='_blank'>
                          <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${x.pic}`} height={70} width={90} alt="" />
                        </Link>
                      </td>
                      <td>{x.name}</td>
                      <td>{x.brand}</td>
                      <td>{x?.color}</td>
                      <td>{x?.size}</td>
                      <td>&#8377;{x.finalPrice}</td>
                      <td>{x.qty}</td>
                      <td>&#8377;{x.total}</td>
                      <td>
                        <div className="btn-group">
                          <Link to={`/product/${x.product}`} className='btn btn-primary btn-sm'>Buy Again</Link>
                          {item.orderStatus === "Delivered" ?
                            check(x.product) ?
                              <button className='btn btn-success btn-sm' onClick={() => updateRecord(x.product)}>Update Review</button> :
                              <button className='btn btn-success btn-sm' onClick={() => createRecord(x.product)}>Write Review</button> : null}
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

      <div className={`modal fade ${showModal ? "show d-block" : ""}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{option} Review</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setShowModal(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={postData}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label>Message*</label>
                    <textarea name="message" value={inputData.message} onChange={getInputData} placeholder='Write Your Review here...' rows={5} className='form-control border-primary' required></textarea>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Star</label>
                    <select name="star" onChange={(getInputData)} value={inputData.star} className='form-select border-primary'>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                  </div>
                  <div className="col-12 mb-3">
                    <button type="submit" className='btn btn-primary w-100'>{option}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  )
}
