import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SingleProduct from './SingleProduct'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"

export default function Products() {
    let [data, setData] = useState([])
    let [selected, setSelected] = useState("")

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            setData(ProductStateData.filter(x => x.status))
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [MaincategoryStateData.length])
    return (
        <section id="services" className="services section">

            <div className="container" data-aos="fade-up" data-aos-delay="100">

                <div className="mb-3">
                    <div className="m-auto">
                        <div className="btn-group w-100">
                            <button onClick={() => setSelected("")} className={`w-100 btn ${selected === "" ? 'btn-primary' : ''}`}>All</button>
                            {MaincategoryStateData.filter(x => x.status && ProductStateData.filter(p=>p.maincategory===x.name).length).map((item, index) => {
                                return <button onClick={() => setSelected(item.name)} className={`w-100 btn ${selected === item.name ? 'btn-primary' : 'btn-light'}`} key={index}>{item.name}</button>
                            })}
                        </div>
                    </div>
                </div>
                <div className="row gy-4">
                    {data.filter(x => selected === "" || selected === x.maincategory).slice(0, 24).map((item => {
                        return <div key={item.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                            <SingleProduct item={item} />
                        </div>
                    }))}
                </div>

            </div>

        </section>
    )
}
