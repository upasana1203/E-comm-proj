import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import TextValidators from '../../../FormValidators/TextValidators'

import { getUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreators"

export default function AdminUpdateUserPage() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: '',
        icon: '',
        description: '',
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        icon: "",
        description: ""
    })
    let [show, setShow] = useState(false)

    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function getInputData(e) {
        let {name,value} = e.target

        setData({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
        setErrorMessage({ ...errorMessage, [name]: TextValidators(e) })
    }
    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = UserStateData.find(x => x.id !== id && x.name?.toLocaleLowerCase() === data.name?.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage({ ...errorMessage, 'name': "User With This Name Is Already Exist" })
                return
            }
            dispatch(updateUser({ ...data }))
            navigate("/admin/user")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getUser())
            if (UserStateData.length) {
                let item = UserStateData.find(x => x.id == id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/user")
            }
        })()
    }, [UserStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Update User <Link to="/admin/user"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name <span className='text-danger'>*</span></label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='User Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Description <span className='text-danger'>*</span></label>
                                    <textarea name="description" value={data.description} rows={3} onChange={getInputData} placeholder='Description' className={`form-control ${show && errorMessage.description ? 'border-danger' : 'border-primary'}`} ></textarea>
                                    {show && errorMessage.description ? <p className='text-danger'>{errorMessage.description}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Icon<span className='text-danger'>*</span></label>
                                    <input type="text" name="icon" value={data.icon} placeholder="Bootstrap Icon Tag eg. <i class='bi bi-list'></i>" onChange={getInputData} className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Status</label>
                                    <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inctive</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className='btn btn-primary w-100'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
