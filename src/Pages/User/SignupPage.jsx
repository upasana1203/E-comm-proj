import React, { useState } from 'react'
import Breadcrum from '../../Components/Breadcrum'
import TextValidators from '../../FormValidators/TextValidators'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Full Name Field is Mendatory",
        username: "User Name Field is Mendatory",
        email: "Name Field is Mendatory",
        phone: "Phone Number Field is Mendatory",
        password: "Password Field is Mendatory"
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: TextValidators(e) })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else if (data.password !== data.cpassword) {
            setShow(true)
            setErrorMessage({ ...errorMessage, password: "Password and Confirm Password Doesn't Matched" })
        }
        else {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let item = response.find(x => x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage({
                    ...errorMessage,
                    username: item.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() ? "Username Already Taken" : "",
                    email: item.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase() ? "Email Address Already Registered" : "",
                })
            }
            else {
                let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: "Buyer",
                        status: true
                    })
                })
                response = await response.json()
                navigate("/login")
            }
        }
    }
    return (
        <>
            <Breadcrum title="Create Your Free Account" description="Create your Heritage Ally account to enjoy a personalized shopping experience, faster checkout, order tracking, exclusive offers, and access to the latest products designed to match your style and lifestyle needs." />
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-10 col-md-11 m-auto">
                        <div className="card p-5">
                            <h5 className='text-center p-2 bg-primary text-light'>Create Your Free Account</h5>
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-lg-6 mb-3">
                                        <label>Name*</label>
                                        <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label>Phone*</label>
                                        <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label>User Name*</label>
                                        <input type="text" name="username" onChange={getInputData} placeholder='Username' className={`form-control ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label>Email*</label>
                                        <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label>Password*</label>
                                        <input type="password" name="password" onChange={getInputData} placeholder='Enter Password' className={`form-control ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label>Confirm Password*</label>
                                        <input type="password" name="cpassword" onChange={getInputData} placeholder='Confirm Password' className={`form-control ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                                    </div>
                                    <div className="col-12">
                                        {show && errorMessage.password ? errorMessage.password?.split("|").map((x, index) => {
                                            return <p className='text-danger' key={index}>{x}</p>
                                        }) : null}
                                    </div>
                                    <div className="col-12 mb-3">
                                        <button type="submit" className='btn btn-primary w-100'>Signup</button>
                                    </div>
                                </div>
                            </form>
                            <Link to="/login" className='text-dark'>Already Have an Account?<span className='text-primary'>Login</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
