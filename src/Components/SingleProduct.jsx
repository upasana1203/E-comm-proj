import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleProduct({ item }) {
    return (
        <div className="service-item">
            <div className="service-image">
                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`} alt="Product Image" className="img-fluid" />
            </div>
            <div className="service-content">
                <h6>{item.name}</h6>
                <p className='fs-5'><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% Off</sup></p>
                <div className="service-features d-flex justify-content-between">
                    <span className="feature-item"><i className="fas fa-tag fs-5"></i> {item.brand}</span>
                    <span className="feature-item"><i className="bi bi-cart-fill fs-5"></i> {item.stockQuantity} Left In Stock</span>
                </div>
                <Link to={`/product/${item.id}`} className="service-btn">
                    <span>Add to Cart</span>
                    <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
        </div>
    )
}
