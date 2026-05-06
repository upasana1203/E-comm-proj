import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'


import About from '../Components/About'
import Feature from '../Components/Feature'
import CustomerSupport from '../Components/CustomerSupport'
import Products from '../Components/Products'
import Testimonial from '../Components/Testimonial'
import ProductSlider from '../Components/ProductSlider'


import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
export default function HomePage() {
  let SettingStateData = useSelector(state => state.SettingStateData)
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)

  let dispatch = useDispatch()

  let [settingData, setSettingData] = useState({
    siteName: import.meta.env.VITE_APP_SITE_NAME,
  })

  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        setSettingData({ siteName: SettingStateData[0].siteName || settingData.siteName })
      }
    })()
  }, [SettingStateData.length])

  useEffect(() => {
    (() => dispatch(getProduct()))()
  }, [ProductStateData.length])

  useEffect(() => {
    (() => dispatch(getMaincategory()))()
  }, [MaincategoryStateData.length])
  return (
    <>
      <section id="hero" className="hero section">

        <div className="container" data-aos="fade-up" data-aos-delay="100">

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">

                <h1 data-aos="fade-right" data-aos-delay="300">
                  <span className="highlight">  Timeless Heritage</span> Modern Style – Discover Quality You Can Trust at Heritage Ally
                </h1>

                <p className="hero-description" data-aos="fade-right" data-aos-delay="400">
                  Explore {settingData.siteName}'s curated collection of timeless products blending tradition with modern style. Enjoy premium quality, exclusive designs, and a seamless shopping experience crafted just for you.
                </p>

                <div className="hero-stats mb-4" data-aos="fade-right" data-aos-delay="500">
                  <div className="stat-item">
                    <h3><span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="2"
                      className="purecounter"></span><i className='bi bi-check'></i></h3>
                    <p>100% Genuine Products</p>
                  </div>
                  <div className="stat-item">
                    <h3><span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="2"
                      className="purecounter"></span><i className='bi bi-headphones'></i></h3>
                    <p>24/7 Customer Support</p>
                  </div>

                  <div className="stat-item">
                    <h3><span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="2"
                      className="purecounter"></span><i className='bi bi-truck'></i></h3>
                    <p>Fast Delivery</p>
                  </div>

                </div>

                <div className="hero-actions" data-aos="fade-right" data-aos-delay="600">
                  <Link to="/shop" className="btn btn-primary btn-sm">Shop Now</Link>
                  <Link to="/feature" className="btn btn-primary btn-sm">Features</Link>
                  <Link to="/contactus" className="btn btn-primary btn-sm">Have Any Query</Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-visual" data-aos="fade-left" data-aos-delay="400">
                <div className="main-image">
                  <img src="/assets/images/banner10.jpg" alt="Modern Healthcare Facility" className="img-fluid" />
                  <div className="floating-card appointment-card">
                    <div className="card-icon">
                      <i className="bi bi-bag-heart-fill"></i>
                    </div>
                    <div className="card-content">
                      <h6>Sales is Live</h6>
                      <p>Grab Upto 90% Discount</p>
                      <small>On Latest Products</small>
                    </div>
                  </div>
                  <div className="floating-card rating-card">
                    <div className="card-content">
                      <div className="rating-stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <h6>4.9/5</h6>
                      <small>10000+ Reviews</small>
                    </div>
                  </div>
                </div>
                <div className="background-elements">
                  <div className="element element-1"></div>
                  <div className="element element-2"></div>
                  <div className="element element-3"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>
      <Products />
      <About />
      <Feature />
      <CustomerSupport />
      {
        MaincategoryStateData.filter(x => x.status).map((item, index) => {
          let data = ProductStateData.filter(x => x.status && x.maincategory === item.name)
          if (data.length) {
            return <ProductSlider key={index} maincategory={item.name} data={data} />
          }
        })
      }
      <Testimonial />
    </>
  )
}
