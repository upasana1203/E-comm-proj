import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import TextValidators from '../../../FormValidators/TextValidators'
import ImageValidators from '../../../FormValidators/ImageValidators'

import { getProduct, updateProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreators"

const colors = ["White", "Black", "Blue", "Orange", "Red", "Green", "Yellow", "Purple", "Pink", "Gray", "Violet", "N/A"]
const size = ["XXXL", "XXL", "XL", "L", "MD", "SM", "XS", "NB", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "N/A"]
var rte
export default function AdminUpdateProductPage() {
    let { id } = useParams()
    var refdiv = useRef(null);
    let [data, setData] = useState({
        name: '',
        maincategory: '',
        subcategory: '',
        brand: '',
        basePrice: '',
        discount: '',
        finalPrice: '',
        stock: true,
        stockQuantity: '',
        color: [],
        size: [],
        pic: [],
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        color: "",
        size: "",
        basePrice: "",
        discount: "",
        stockQuantity: "",
        pic: ""
    })
    let [show, setShow] = useState(false)
    let [flag, setFlag] = useState(false)

    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        let value = name === "pic" ? data.pic.concat(Array.from(e.target.files).map(x => "product/" + x.name)) : e.target.value
        // let value = name === "pic" ? e.target.files : e.target.value

        setData({ ...data, [name]: name === "status" || name === "stock" ? (value === "1" ? true : false) : value })
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidators(e) : TextValidators(e) })
    }

    function getInputCheckbox(key, value) {
        let arr = key === "color" ? data.color : data.size
        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        setData({ ...data, [key]: arr })
        setErrorMessage({ ...errorMessage, [key]: arr.length === 0 ? `Please Select Atleast one ${key}` : '' })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else if (data.pic.length === 0) {
            setShow(true)
            setErrorMessage({ ...errorMessage, pic: "Please Upload Atleast One Image" })
        }
        else {
            let bp = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let fp = parseInt(bp - bp * d / 100)
            let sc = parseInt(data.stockQuantity)
            let description = rte.getHTMLCode()
            dispatch(updateProduct({
                ...data,
                maincategory: data.maincategory || MaincategoryStateData[0].name,
                subcategory: data.subcategory || SubcategoryStateData[0].name,
                brand: data.brand || BrandStateData[0].name,
                basePrice: bp,
                discount: d,
                finalPrice: fp,
                stockQuantity: sc,
                description: description
            }))

            // let formData = new FormData()
            // formData.append("id",id)
            // formData.append("name",data.name)
            // formData.append("maincategory", data.maincategory || MaincategoryStateData[0].id)
            // formData.append("subcategory", data.subcategory || SubcategoryStateData[0].id)
            // formData.append("brand", data.brand || BrandStateData[0].id)
            // data.color.forEach(x=>formData.append("color",x))
            // data.size.forEach(x=>formData.append("size",x))
            // Array.from(data.pic).forEach(x=>formData.append("pic",x))
            // formData.append("basePrice", bp)
            // formData.append("discount", d)
            // formData.append("finalPrice", fp)
            // formData.append("stockQuantity", sc)
            // formData.append("description", description)
            // formData.append("status",data.status)
            // dispatch(updateProduct(formData))

            navigate("/admin/product")
        }
    }


    useEffect(() => {
        (() => {
            dispatch(getProduct())
            rte = new window.RichTextEditor(refdiv.current);
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id == id)
                if (item) {
                    setData({ ...data, ...item })
                    rte.setHTMLCode(item.description)
                }
                else
                    navigate("/admin/product")
            }
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getSubcategory()))()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getBrand()))()
    }, [BrandStateData.length])

    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Update Product <Link to="/admin/product"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name <span className='text-danger'>*</span></label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Product Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-lg-3 mb-3">
                                    <label>Maincategory <span className='text-danger'>*</span></label>
                                    <select name="maincategory" value={data.maincategory} onChange={getInputData} className='form-select border-primary'>
                                        {MaincategoryStateData.filter(x => x.status).map(item => {
                                            return <option key={item.id}>{item.name}</option>
                                            // return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-3 mb-3">
                                    <label>Subncategory <span className='text-danger'>*</span></label>
                                    <select name="subcategory" value={data.subcategory} onChange={getInputData} className='form-select border-primary'>
                                        {SubcategoryStateData.filter(x => x.status).map(item => {
                                            return <option key={item.id}>{item.name}</option>
                                            // return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-3 mb-3">
                                    <label>Brand <span className='text-danger'>*</span></label>
                                    <select name="brand" value={data.brand} onChange={getInputData} className='form-select border-primary'>
                                        {BrandStateData.filter(x => x.status).map(item => {
                                            return <option key={item.id}>{item.name}</option>
                                            // return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label>Stock <span className='text-danger'>*</span></label>
                                    <select name="stock" value={data.stock?"1":"0"} onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">In Stock</option>
                                        <option value="0">Out Of Stock</option>
                                    </select>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Base Price <span className='text-danger'>*</span></label>
                                    <input type="number" value={data.basePrice} name="basePrice" onChange={getInputData} placeholder='Product Base Price' className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Discount <span className='text-danger'>*</span></label>
                                    <input type="number" name="discount" value={data.discount} onChange={getInputData} placeholder='Product Discount' className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Color <span className='text-danger'>*</span></label>
                                    <div className='border border-primary rounded p-2'>
                                        <div className="row">
                                            {colors.map((item, index) => {
                                                return <div className='col-xl-2 col-lg-3 col-4' key={index}>
                                                    <input type='checkbox' id={item} checked={data.color?.includes(item)} onChange={() => getInputCheckbox('color', item)} />
                                                    <label htmlFor={item} className='ms-3'>{item}</label>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    {show && errorMessage.color ? <p className='text-danger'>{errorMessage.color}</p> : null}
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Size <span className='text-danger'>*</span></label>
                                    <div className='border border-primary rounded p-2'>
                                        <div className="row">
                                            {size.map((item, index) => {
                                                return <div className='col-xl-2 col-lg-3 col-4' key={index}>
                                                    <input type='checkbox' id={item} checked={data.size?.includes(item)} onChange={() => getInputCheckbox('size', item)} />
                                                    <label htmlFor={item} className='ms-3'>{item}</label>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    {show && errorMessage.size ? <p className='text-danger'>{errorMessage.size}</p> : null}
                                </div>


                                <div className="col-12 mb-3">
                                    <label>Description<span className='text-danger'>*</span></label>
                                    <div className='border border-primary rounded' ref={refdiv}></div>
                                </div>


                                <div className="col-lg-6 mb-3">
                                    <label>Pic<span className='text-danger'>*</span></label>
                                    <input type="file" name="pic" multiple onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? errorMessage.pic?.split("|").map((item, index) => {
                                        return <p className='text-danger' key={index}>{item}</p>
                                    }) : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Old Pic (Click on Pic to Remove)</label>
                                    <div>
                                        {data.pic.map((item, index) => {
                                            return <img key={index} onClick={() => {
                                                data.pic.splice(index, 1)
                                                setFlag(!flag)
                                            }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} className='m-1' height={80} width={80} />
                                        })}
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Stock Quantity <span className='text-danger'>*</span></label>
                                    <input type="number" value={data.stockQuantity} name="stockQuantity" onChange={getInputData} placeholder='Product Stock Quantity' className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Status<span className='text-danger'>*</span></label>
                                    <select name="status" onChange={getInputData} className='form-select border-primary'>
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
