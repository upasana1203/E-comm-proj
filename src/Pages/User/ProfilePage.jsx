import React, { useEffect, useState } from 'react'
import Breadcrum from '../../Components/Breadcrum'
import Profile from '../../Components/User/Profile'
import UpdateProfile from '../../Components/User/UpdateProfile'
import Wishlist from '../../Components/User/Wishlist'
import Address from '../../Components/User/Address'
import Orders from '../../Components/User/Orders'
import { useSearchParams } from 'react-router-dom'

export default function ProfilePage() {
    let [option, setOption] = useState("Profile")
    let [searchParams, setSearchParams] = useSearchParams()

    function changeParams(value) {
        setOption(value)
        setSearchParams({ option: value })
    }
    useEffect(() => {
        setOption(searchParams.get("option") ?? "Profile")
    }, [searchParams])
    return (
        <>
            <Breadcrum title="Profile" description="Manage your personal information, track orders, update account details, and view your shopping activity easily on your Heritage Ally profile page for a secure and personalized experience." />
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <ul>
                            <li className='btn btn-primary mb-1 d-block'>Select Option</li>
                            <li className={`btn ${option === "Profile" ? 'btn-primary' : 'btn-light'} mb-1 d-block`} onClick={() => changeParams("Profile")}>Profile Details</li>
                            <li className={`btn ${option === "Update" ? 'btn-primary' : 'btn-light'} mb-1 d-block`} onClick={() => changeParams("Update")}>Update Profile Details</li>
                            <li className={`btn ${option === "Wishlist" ? 'btn-primary' : 'btn-light'} mb-1 d-block`} onClick={() => changeParams("Wishlist")}>Wishlist</li>
                            <li className={`btn ${option === "Orders" ? 'btn-primary' : 'btn-light'} mb-1 d-block`} onClick={() => changeParams("Orders")}>Orders</li>
                            <li className={`btn ${option === "Address" ? 'btn-primary' : 'btn-light'} mb-1 d-block`} onClick={() => changeParams("Address")}>Address</li>
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <div className={`${option === "Profile" ? 'd-block' : 'd-none'}`}>
                            <h5 className='bg-primary p-2 text-light text-center'>Profile Details</h5>
                            <Profile option={option}/>
                        </div>
                        <div className={`${option === "Update" ? 'd-block' : 'd-none'}`}>
                            <h5 className='bg-primary p-2 text-light text-center'>Update Profile Details</h5>
                            <UpdateProfile changeParams={changeParams}/>
                        </div>
                        <div className={`${option === "Wishlist" ? 'd-block' : 'd-none'}`}>
                            <h5 className='bg-primary p-2 text-light text-center'>Wishlist</h5>
                            <Wishlist />
                        </div>
                        <div className={`${option === "Orders" ? 'd-block' : 'd-none'}`}>
                            <h5 className='bg-primary p-2 text-light text-center'>Orders</h5>
                            <Orders />
                        </div>
                        <div className={`${option === "Address" ? 'd-block' : 'd-none'}`}>
                            <h5 className='bg-primary p-2 text-light text-center'>Address</h5>
                            <Address />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
