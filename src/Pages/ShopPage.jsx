import React, { useEffect, useState } from 'react'
import Breadcrum from '../Components/Breadcrum'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import SingleProduct from '../Components/SingleProduct'

const color = ["White", "Black", "Blue", "Orange", "Red", "Green", "Yellow", "Purple", "Pink", "Gray", "Violet", "N/A"]
const size = ["XXXL", "XXL", "XL", "L", "MD", "SM", "XS", "NB", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "N/A"]
export default function ShopPage() {
    let [data, setData] = useState([])
    let [selected, setSelected] = useState({
        maincategory: [],
        subcategory: [],
        brand: [],
        color: [],
        size: []
    })
    let [sortFilter, setSortFilter] = useState("1")

    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)
    let ProductStateData = useSelector((state) => state.ProductStateData)

    let dispatch = useDispatch()

    function getSelection(key, value) {
        let arr = selected[key]
        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        setSelected({ ...selected, [key]: arr })

        filterData({ ...selected, [key]: arr })
    }

    function filterData(selected) {
        let data = ProductStateData.filter(x => x.status && (
            (selected.maincategory.length === 0 || selected.maincategory.includes(x.maincategory)) &&
            (selected.subcategory.length === 0 || selected.subcategory.includes(x.subcategory)) &&
            (selected.brand.length === 0 || selected.brand.includes(x.brand)) &&
            (selected.color.length === 0 || (new Set(selected.color)).intersection(new Set(x.color)).size) &&
            (selected.size.length === 0 || (new Set(selected.size)).intersection(new Set(x.size)).size)
        ))
        applySortFilter(sortFilter,data)
    }

    function applySortFilter(sortFilter, data) {
        setSortFilter(sortFilter)
        if (sortFilter === "1")
            setData(data.sort((x, y) => y.id.localeCompare(x.id)))
        else if (sortFilter === "2")
            setData(data.sort((x, y) => x.finalPrice - y.finalPrice))
        else
            setData(data.sort((x, y) => y.finalPrice - x.finalPrice))
    }

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getSubcategory()))()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getBrand()))()
    }, [BrandStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                setData(ProductStateData.filter(x => x.status))
            }
        })()
    }, [ProductStateData.length])
    return (
        <>
            <Breadcrum title="Shop" description="Explore our shop at Heritage Ally, where quality meets style. Browse a wide range of carefully curated products designed to suit your needs and elevate your everyday lifestyle." />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <ul className="list-group mb-3">
                            <li className="list-group-item active" aria-current="true">Maincategory</li>
                            {MaincategoryStateData.filter(x => x.status).map(item => {
                                return <li key={item.id} onClick={() => getSelection('maincategory', item.name)} className="list-group-item">{item.name} {selected.maincategory.includes(item.name) ? <span><i className='bi bi-check float-end'></i></span> : null}</li>
                            })}
                        </ul>
                        <ul className="list-group mb-3">
                            <li className="list-group-item active" aria-current="true">Subcategory</li>
                            {SubcategoryStateData.filter(x => x.status).map(item => {
                                return <li key={item.id} onClick={() => getSelection('subcategory', item.name)} className="list-group-item">{item.name} {selected.subcategory.includes(item.name) ? <span><i className='bi bi-check float-end'></i></span> : null}</li>
                            })}
                        </ul>
                        <ul className="list-group mb-3">
                            <li className="list-group-item active" aria-current="true">Brand</li>
                            {BrandStateData.filter(x => x.status).map(item => {
                                return <li key={item.id} onClick={() => getSelection('brand', item.name)} className="list-group-item">{item.name} {selected.brand.includes(item.name) ? <span><i className='bi bi-check float-end'></i></span> : null}</li>
                            })}
                        </ul>
                        <ul className="list-group mb-3">
                            <li className="list-group-item active" aria-current="true">Color</li>
                            {color.map(item => {
                                return <li key={item.id} onClick={() => getSelection('color', item)} className="list-group-item">{item} {selected.color.includes(item) ? <span><i className='bi bi-check float-end'></i></span> : null}</li>
                            })}
                        </ul>
                        <ul className="list-group mb-3">
                            <li className="list-group-item active" aria-current="true">Size</li>
                            {size.map(item => {
                                return <li key={item.id} onClick={() => getSelection('size', item)} className="list-group-item">{item} {selected.size.includes(item) ? <span><i className='bi bi-check float-end'></i></span> : null}</li>
                            })}
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-4">
                                <select name="sortFilter" onChange={(e) => applySortFilter(e.target.value, data)} className='form-select border-primary'>
                                    <option value="1">Latest</option>
                                    <option value="2">Price : Low to High</option>
                                    <option value="3">Price : High to Low</option>
                                </select>
                            </div>
                        </div>

                        <section id="services" className="services section">
                            <div className="row gy-4">
                                {data.map((item => {
                                    return <div key={item.id} className="col-lg-4 col-md-6">
                                        <SingleProduct item={item} />
                                    </div>
                                }))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
