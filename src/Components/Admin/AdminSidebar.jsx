import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
    return (
        <div className="list-group">
            <Link to="/admin" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-house-check'></i><span className='float-end'>Home</span></Link>
            <Link to="/admin/maincategory" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-bookmark-plus'></i><span className='float-end'>Maincategory</span></Link>
            <Link to="/admin/subcategory" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-bookmark-plus'></i><span className='float-end'>Subcategory</span></Link>
            <Link to="/admin/brand" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-shield-check'></i><span className='float-end'>Brand</span></Link>
            <Link to="/admin/product" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-tags-fill'></i><span className='float-end'>Product</span></Link>
            <Link to="/admin/feature" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-list-ol'></i><span className='float-end'>Feature</span></Link>
            <Link to="/admin/faq" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-question-circle'></i><span className='float-end'>Faq</span></Link>
            <Link to="/admin/setting" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-gear'></i><span className='float-end'>Setting</span></Link>
            <Link to="/admin/newsletter" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-envelope'></i><span className='float-end'>Newsletter</span></Link>
            <Link to="/admin/checkout" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-bag-check'></i><span className='float-end'>Checkout</span></Link>
            <Link to="/admin/contactus" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-telephone'></i><span className='float-end'>Contact Us</span></Link>
            {localStorage.getItem("role") === "Admin" ? null : <Link to="/admin/user" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fs-5 bi bi-people'></i><span className='float-end'>User</span></Link>}
        </div>
    )
}
