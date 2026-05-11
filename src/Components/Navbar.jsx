import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function Navbar() {
  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()

  let [showMenu, setShowMenu] = useState(false)
  let navigate = useNavigate()

  let [settingData, setSettingData] = useState({
    siteName: import.meta.env.VITE_APP_SITE_NAME,
    map1: import.meta.env.VITE_APP_MAP1,
    address: import.meta.env.VITE_APP_ADDRESS,
    email: import.meta.env.VITE_APP_EMAIL,
    phone: import.meta.env.VITE_APP_PHONE,
    whatsapp: import.meta.env.VITE_APP_WHATSAPP,
    facebook: import.meta.env.VITE_APP_FACEBOOK,
    twitter: import.meta.env.VITE_APP_TWITTER,
    linkedin: import.meta.env.VITE_APP_LINKEDIN,
    instagram: import.meta.env.VITE_APP_INSTAGRAM,
    youtube: import.meta.env.VITE_APP_YOUTUBE
  })

  function logout() {
    localStorage.clear()
    navigate("/login")
  }

  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        let data = []
        Object.keys(settingData).forEach((x => {
          data.push([x, SettingStateData[0][x] ? SettingStateData[0][x] : settingData[x]])
        }))
        setSettingData(Object.fromEntries(data))
      }
    })()
  }, [SettingStateData.length])
  return (
    <header id="header" className={`header fixed-top ${showMenu ? 'mobile-nav-active' : ''}`}>

      <div className="topbar d-flex align-items-center dark-background">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <Link to={`${settingData.map1}`} target='_blank' className='text-light d-flex me-2'>
              <i className="ms-2 bi bi-geo-alt me-1"></i>
              <span className='d-none d-xl-block'>{settingData.address}</span>
            </Link>
            <Link to={`mailto:${settingData.email}`} target='_blank' className='text-light d-flex me-2'>
              <i className="ms-2 bi bi-envelope me-1"></i>
              <span className='d-none d-xl-block'>{settingData.email}</span>
            </Link>
            <Link to={`tel:${settingData.phone}`} target='_blank' className='text-light d-flex me-2'>
              <i className="ms-2 bi bi-telephone me-1"></i>
              <span className='d-none d-xl-block'>{settingData.phone}</span>
            </Link>
            <Link to={`https://wa.me/${settingData.whatsapp}`} target='_blank' className='text-light d-flex me-2'>
              <i className="ms-2 bi bi-whatsapp me-1"></i>
              <span className='d-none d-xl-block'>{settingData.whatsapp}</span>
            </Link>
          </div>
          <div className="social-links d-flex align-items-center">
            <Link to={settingData.facebook} target="_blank" className="text-light"><i className="bi bi-facebook"></i></Link>
            <Link to={settingData.twitter} target="_blank" className="text-light"><i className="bi bi-twitter-x"></i></Link>
            <Link to={settingData.instagram} target="_blank" className="text-light"><i className="bi bi-instagram"></i></Link>
            <Link to={settingData.linkedin} target="_blank" className="text-light"><i className="bi bi-linkedin"></i></Link>
            <Link to={settingData.youtube} target="_blank" className="text-light"><i className="bi bi-youtube"></i></Link>
          </div>
        </div>
      </div>

      <div className="branding d-flex align-items-cente">

        <div className="container position-relative d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            {/* <img src="assets/img/logo.webp" alt=""/> */}
            <h1 className="sitename">{settingData.siteName}</h1>
          </Link>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/shop">Shop</NavLink></li>
              <li><NavLink to="/feature">Features</NavLink></li>
              <li><NavLink to="/faq">Faq</NavLink></li>
              <li><NavLink to="/testimonial">Testimonials</NavLink></li>
              <li><NavLink to="/contactus">Contact Us</NavLink></li>
              <li><NavLink to="/admin">Admin</NavLink></li>
              {
                localStorage.getItem("login") ?
                  <li className="dropdown"><a href="#"><span>{localStorage.getItem("name")}</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                      <li><Link to="/profile?option=Profile">Profile</Link></li>
                      <li><Link to="/profile?option=Wishlist">Wishlist</Link></li>
                      <li><Link to="/profile?option=Orders">Orders</Link></li>
                      <li><Link to="/profile?option=Address">Address</Link></li>
                      <li><Link to="/cart">Cart</Link></li>
                      <li><Link to="/checkout">Checkout</Link></li>
                      <li><button className='btn ms-2' onClick={logout}>Logout</button></li>
                    </ul>
                  </li> :
                  <li><NavLink to="/login">login</NavLink></li>
              }
            </ul>
            <i className={`mobile-nav-toggle d-xl-none bi ${showMenu ? 'bi-x' : 'bi-list'}`} onClick={() => setShowMenu(!showMenu)}></i>
          </nav>

        </div>

      </div>

    </header>

  )
}

