import React, { useEffect, useState } from 'react'
import Breadcrum from '../Components/Breadcrum'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ProductSlider from '../Components/ProductSlider'
export default function Product() {
    let { id } = useParams()
    let [data, setData] = useState({})
    let [relatedData, setRelatedData] = useState([])

    let [selected, setSelected] = useState({
        qty: 1,
        color: "",
        size: ""
    })

    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id === id)
                if (item) {
                    setData(item)
                    setSelected({ ...selected, color: item?.color[0], size: item?.size[0] })
                    setRelatedData(ProductStateData.filter(x => x.maincategory === item.maincategory))
                }
                else
                    window.history.back()
            }
        })()
    }, [ProductStateData.length])
    return (
        <>
            <Breadcrum title={data.name} description={`${data.maincategory} -> ${data.subcategory} -> ${data.brand}`} />
            <div className="container">
                <div className="row">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6">
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Maincategory</th>
                                    <td>{data.maincategory}</td>
                                </tr>
                                <tr>
                                    <th>Subcategory</th>
                                    <td>{data.subcategory}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{data.brand}</td>
                                </tr>
                                <tr>
                                    <th>Color</th>
                                    <td>
                                        {data.color?.map((item, index) => {
                                            return <button key={index} onClick={() => setSelected({ ...selected, color: item })} style={{ width: 80 }} className={`btn ${selected.color === item ? 'btn-primary' : 'btn-light'}`}>{item}</button>
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Size</th>
                                    <td>
                                        {data.size?.map((item, index) => {
                                            return <button key={index} onClick={() => setSelected({ ...selected, size: item })} style={{ width: 80 }} className={`btn ${selected.size === item ? 'btn-primary' : 'btn-light'}`}>{item}</button>
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{data.stock ? `${data.stockQuantity} Left In Stock` : 'Out of Stock'}</td>
                                </tr>
                                <tr >
                                    <th colSpan={2}>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="btn-group w-100">
                                                    <button className='btn btn-primary' onClick={()=>setSelected({...selected,qty:selected.qty>1?selected.qty-1:selected.qty})}><i className='bi bi-dash'></i></button>
                                                    <h4 className='w-50 text-center'>{selected.qty}</h4>
                                                    <button className='btn btn-primary' onClick={()=>setSelected({...selected,qty:selected.qty<data.stockQuantity?selected.qty+1:selected.qty})}><i className='bi bi-plus'></i></button>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="btn-group w-100">
                                                    <button className='btn btn-primary'><i className='bi bi-cart-plus'></i> Add To Cart</button>
                                                    <button className='btn btn-success'><i className='bi bi-heart'></i> Add To Wishlist</button>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>
                                        <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ProductSlider maincategory="Related Products" data={relatedData} />
        </>
    )
}
