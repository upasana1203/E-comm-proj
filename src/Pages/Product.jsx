import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';

import Breadcrum from '../Components/Breadcrum'
import ProductSlider from '../Components/ProductSlider'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getCart, createCart } from "../Redux/ActionCreators/CartActionCreators"
import { getWishlist, createWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
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
    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    let options = {
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: true,
        modules: [EffectCube, Pagination, Autoplay]
    }

    function addToCart() {
        let item = CartStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,
                qty: selected.qty,
                color: selected.color,
                size: selected.size,
                total: data.finalPrice * selected.qty,

                //Remove following Lines in Case OF Real Backend
                name: data.name,
                brand: data.brand,
                finalPrice: data.finalPrice,
                stockQuantity: data.stockQuantity,
                pic: data.pic[0],
            }
            dispatch(createCart({ ...item }))
        }
        navigate("/cart")
    }

    function addToWishlist() {
        let item = WishlistStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,

                //Remove following Lines in Case OF Real Backend
                name: data.name,
                color: data.color,
                size: data.size,
                brand: data.brand,
                finalPrice: data.finalPrice,
                stockQuantity: data.stockQuantity,
                pic: data.pic[0],
            }
            dispatch(createWishlist({ ...item }))
        }
        navigate("/profile?option=Wishlist")
    }

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
    }, [ProductStateData.length,id])

    useEffect(() => {
        (() => dispatch(getCart()))()
    }, [CartStateData.length])

    useEffect(() => {
        (() => dispatch(getWishlist()))()
    }, [WishlistStateData.length])
    return (
        <>
            <Breadcrum title={data.name} description={`${data.maincategory} -> ${data.subcategory} -> ${data.brand}`} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Swiper {...options}>
                            {data.pic?.map((item, index) => {
                                return <SwiperSlide key={index}>
                                    <img style={{ width: "100%", height: 400 }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} />
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </div>
                    <div className="col-lg-6">
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
                                    {data.stock ?
                                        <th colSpan={2}>
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="btn-group w-100">
                                                        <button className='btn btn-primary' onClick={() => setSelected({ ...selected, qty: selected.qty > 1 ? selected.qty - 1 : selected.qty })}><i className='bi bi-dash'></i></button>
                                                        <h4 className='w-50 text-center'>{selected.qty}</h4>
                                                        <button className='btn btn-primary' onClick={() => setSelected({ ...selected, qty: selected.qty < data.stockQuantity ? selected.qty + 1 : selected.qty })}><i className='bi bi-plus'></i></button>
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="btn-group w-100">
                                                        <button className='btn btn-primary' onClick={addToCart}><i className='bi bi-cart-plus'></i> Add To Cart</button>
                                                        <button className='btn btn-success' onClick={addToWishlist}><i className='bi bi-heart'></i> Add To Wishlist</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </th> :
                                        <th colSpan={2}><button className='btn btn-success' onClick={addToWishlist}><i className='bi bi-heart'></i> Add To Wishlist</button></th>
                                    }
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
