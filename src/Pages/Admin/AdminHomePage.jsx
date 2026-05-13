import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import Profile from '../../Components/User/Profile'

export default function AdminHomePage() {
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Your Profile</h5>
                       <Profile/>
                    </div>
                </div>
            </div>
        </>
    )
}
