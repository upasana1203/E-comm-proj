import React, { useState } from 'react'
import Breadcrum from '../../Components/Breadcrum'
import TextValidators from '../../FormValidators/TextValidators'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
    let [data, setData] = useState({
        username: "",
        password: "",
    })
    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let item = response.find(x => x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.username?.toLocaleLowerCase())
            if (item && item.status === false)
                setErrorMessage("Your Account Has Been Blocked Due to Some Anuthorized Activity, Please Contact Us to Unblock Your Account")
            else if (item) {
                localStorage.setItem("login", true)
                localStorage.setItem("name", item.name)
                localStorage.setItem("userid", item.id)
                localStorage.setItem("role", item.role)
                if (item.role === "Buyer")
                    navigate("/profile")
                else
                    navigate("/admin")
            }
            else
                setErrorMessage("Invalid Username or Password")
        }
    }
    return (
        <>
            <Breadcrum title="Login To Your Account" description="Create your Heritage Ally account to enjoy a personalized shopping experience, faster checkout, order tracking, exclusive offers, and access to the latest products designed to match your style and lifestyle needs." />
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-10 col-md-11 m-auto">
                        <div className="card p-5">
                            <h5 className='text-center p-2 bg-primary text-light'>Login to Your Account</h5>
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label>User Name*</label>
                                        <input type="text" name="username" onChange={getInputData} placeholder='Username' className={`form-control ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                                        {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Password*</label>
                                        <input type="password" name="password" onChange={getInputData} placeholder='Enter Password' className={`form-control ${errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <button type="submit" className='btn btn-primary w-100'>Login</button>
                                    </div>
                                </div>
                            </form>
                            <div className='d-flex justify-content-between'>
                                <Link to="#" className='text-dark'>Already Have an Account?<span className='text-primary'>Forget Password</span></Link>
                                <Link to="/signup" className='text-dark'>Doesn't Have an Account?<span className='text-primary'>Create</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
