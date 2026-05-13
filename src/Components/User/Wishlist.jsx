import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getWishlist, deleteWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"
export default function Wishlist() {
  let [data, setData] = useState([])
  let WishlistStateData = useSelector(state => state.WishlistStateData)
  let dispatch = useDispatch()

  function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete That Record : ")) {
      dispatch(deleteWishlist({ id: id }))
      setData(data.filter(x => x.id !== id))
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getWishlist())
      if (WishlistStateData.length) {
        setData(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [WishlistStateData.length])
  return (
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
                  <th></th>
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
                    <td>{item.color.join(", ")}</td>
                    <td>{item.size.join(", ")}</td>
                    <td>{item.stockQuantity ? `${item.stockQuantity} Left In Stock` : 'Out Of Stock'}</td>
                    <td>&#8377;{item.finalPrice}</td>
                    <td><Link to={`/product/${item.product}`} className='btn btn-primary'><i className='bi bi-cart-check'></i></Link></td>
                    <td><button className='btn btn-danger' onClick={()=>deleteRecord(item.id)}><i className='bi bi-trash'></i></button></td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </> :
        <div className='text-center my-5'>
          <h4>No Items in Wishlist</h4>
          <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
        </div>
      }
    </>
  )
}
