import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Breadcrum from '../Components/Breadcrum'

import TextValidators from '../FormValidators/TextValidators'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
import { getContactUs, createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators"

const dataOptions = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
}
const errorOptions = {
    name: "Name Field is Mendatory",
    email: "Email Address Field is Mendatory",
    phone: "Phone Number Field is Mendatory",
    subject: "Subject Field is Mendatory",
    message: "Message Field is Mendatory",
}
export default function ContactUsPage() {
    let [data, setData] = useState(dataOptions)
    let [errorMessage, setErrorMessage] = useState(errorOptions)

    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    let [settingData, setSettingData] = useState({
        map1: import.meta.env.VITE_APP_MAP1,
        map2: import.meta.env.VITE_APP_MAP2,
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

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: TextValidators(e) })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({
                ...data,
                status: true,
                date: new Date()
            }))
            setMessage("Thank to Contact Us, Our Team Will Contact You Soon")
            setData(dataOptions)
            setErrorMessage(errorOptions)
        }
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
        <>
            <Breadcrum title="Contact Us" description={"Get in touch with Heritage Ally for any queries, support, or feedback. Our team is always ready to assist you and ensure a smooth, reliable, and satisfying shopping experience."} />
            <section id="contact" value={data.name} onChange={getInputData} className="contact section">

                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="row g-5">
                        <div className="col-lg-5">
                            <div className="contact-info-wrapper">
                                <div className="contact-info-item" data-aos="fade-up" data-aos-delay="100">
                                    <div className="info-icon">
                                        <i className="bi bi-geo-alt"></i>
                                    </div>
                                    <div className="info-content">
                                        <h3>Our Address</h3>
                                        <Link to={settingData.map1} target='_blank'>{settingData.address}</Link>
                                    </div>
                                </div>

                                <div className="contact-info-item" data-aos="fade-up" data-aos-delay="200">
                                    <div className="info-icon">
                                        <i className="bi bi-envelope"></i>
                                    </div>
                                    <div className="info-content">
                                        <h3>Email Address</h3>
                                        <Link to={`mailto:${settingData.email}`} target='_blank'>{settingData.email}</Link>
                                    </div>
                                </div>
                                <div className="contact-info-item" data-aos="fade-up" data-aos-delay="200">
                                    <div className="info-icon">
                                        <i className="bi bi-telephone"></i>
                                    </div>
                                    <div className="info-content">
                                        <h3>Phone Number</h3>
                                        <Link to={`tel:${settingData.phone}`} target='_blank'>{settingData.phone}</Link>
                                    </div>
                                </div>
                                <div className="contact-info-item" data-aos="fade-up" data-aos-delay="200">
                                    <div className="info-icon">
                                        <i className="bi bi-whatsapp"></i>
                                    </div>
                                    <div className="info-content">
                                        <h3>Whatsapp</h3>
                                        <Link to={`https://wa.me/${settingData.whatsapp}`} target='_blank'>{settingData.whatsapp}</Link>
                                    </div>
                                </div>
                                <div className="contact-info-item" data-aos="fade-up" data-aos-delay="200">
                                    <div className="social-links d-flex align-items-center ms-3">
                                        <Link to={settingData.facebook} target="_blank" value={data.name} onChange={getInputData} className="text-primary me-4"><i className="fs-4 bi bi-facebook"></i></Link>
                                        <Link to={settingData.twitter} target="_blank" value={data.name} onChange={getInputData} className="text-primary me-4"><i className="fs-4 bi bi-twitter-x"></i></Link>
                                        <Link to={settingData.instagram} target="_blank" value={data.name} onChange={getInputData} className="text-primary me-4"><i className="fs-4 bi bi-instagram"></i></Link>
                                        <Link to={settingData.linkedin} target="_blank" value={data.name} onChange={getInputData} className="text-primary me-4"><i className="fs-4 bi bi-linkedin"></i></Link>
                                        <Link to={settingData.youtube} target="_blank" value={data.name} onChange={getInputData} className="text-primary me-4"><i className="fs-4 bi bi-youtube"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="contact-form-card" data-aos="fade-up" data-aos-delay="200">
                                <h2>Send us a Message</h2>
                                <p className="mb-4">{message ? message : `Have questions or want to learn more? Reach out to us and our team will get back to you
                                    shortly.`}</p>

                                <form onSubmit={postData} >
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <input type="text" value={data.name} onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} name="name" id="name" placeholder="Your Name" />
                                        </div>

                                        <div className="col-md-6">
                                            <input type="email" value={data.email} onChange={getInputData} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} name="email" id="email" placeholder="Your Email" />
                                        </div>

                                        <div className="col-md-6">
                                            <input type="phone" value={data.phone} onChange={getInputData} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} name="phone" id="phone" placeholder="Your Phone Number" />
                                        </div>

                                        <div className="col-12">
                                            <input type="text" value={data.subject} onChange={getInputData} className={`form-control ${show && errorMessage.subject ? 'border-danger' : 'border-primary'}`} name="subject" id="subject" placeholder="Subject" />
                                        </div>

                                        <div className="col-12">
                                            <textarea value={data.message} onChange={getInputData} className={`form-control ${show && errorMessage.message ? 'border-danger' : 'border-primary'}`} name="message" id="message" placeholder="Your Message" rows="6"></textarea>
                                        </div>

                                        <div className="col-12">
                                            <button type="submit" className="btn btn-submit">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid map-container" data-aos="fade-up" data-aos-delay="200">
                    <div className="map-overlay"></div>
                    <iframe
                        src={settingData.map2}
                        width="100%" height="500" allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </section>
        </>
    )
}
