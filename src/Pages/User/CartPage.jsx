import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../Components/Breadcrum'

import { getCart, deleteCart, updateCart } from "../../Redux/ActionCreators/CartActionCreators"
export default function CartPage() {
    let [data, setData] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let CartStateData = useSelector(state => state.CartStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete That Record : ")) {
            dispatch(deleteCart({ id: id }))
            setData(data.filter(x => x.id !== id))
        }
    }

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

    function updateRecord(option, id) {
        let item = data.find(x => x.id === id)
        let index = data.findIndex(x => x.id === id)
        if ((option === "Dec" && item.qty === 1) || (option === "Inc" && item.qty === item.stockQuantity))
            return
        else if (option === "Dec") {
            item['qty'] = item['qty'] - 1
            item['total'] = item['total'] - item['finalPrice']
        }
        else {
            item['qty'] = item['qty'] + 1
            item['total'] = item['total'] + item['finalPrice']
        }
        data[index] = { ...item }
        setData(data)
        dispatch(updateCart({ ...item }))
        calculate(data)
    }

    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length) {
                let cart = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
                setData(cart)
                calculate(cart)
            }
        })()
    }, [CartStateData.length])
    return (
        <>
            <Breadcrum title="Cart" description="Review your selected items, update quantities, and proceed to secure checkout easily from your Heritage Ally cart. Enjoy a smooth shopping experience with complete order transparency and convenience." />
            <div className="container">
                <>
                    {data.length ?
                        <>
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Brand</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Stock</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(item => {
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
                                                <td>{item.stockQuantity ? `${item.stockQuantity} Left In Stock` : 'Out Of Stock'}</td>
                                                <td>&#8377;{item.finalPrice}</td>
                                                <td>
                                                    <div className="btn-group" style={{ width: 130 }}>
                                                        <button className='btn btn-primary' onClick={()=>updateRecord('Dec',item.id)}><i className='bi bi-dash'></i></button>
                                                        <h4 className='w-50 text-center'>{item.qty}</h4>
                                                        <button className='btn btn-primary' onClick={()=>updateRecord('Inc',item.id)}><i className='bi bi-plus'></i></button>
                                                    </div>
                                                </td>
                                                <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-6"></div>
                                <div className="col-lg-6">
                                    <table className='table table-bordered'>
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
                                                <th colSpan={2}>
                                                    <Link to="/checkout" className='btn btn-primary w-100'>Proceed to Checkout</Link>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </> :
                        <div className='text-center my-5'>
                            <h4>No Items in Cart</h4>
                            <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                        </div>
                    }
                </>
            </div>
        </>
    )
}
