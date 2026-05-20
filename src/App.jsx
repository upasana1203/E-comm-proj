import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ShopPage from './Pages/ShopPage'
import FeaturePage from './Pages/FeaturePage'
import FaqPage from './Pages/FaqPage'
import ContactUsPage from './Pages/ContactUsPage'
import ErrorPage from './Pages/ErrorPage'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import TermsAndConditionPolicy from './Pages/TermsAndConditionsPolicy'
import TestimonialPage from './Pages/TestimonialPage'


import AdminHomePage from './Pages/Admin/AdminHomePage'

import AdminMaincategoryPage from './Pages/Admin/Maincategory/AdminMaincategoryPage'
import AdminCreateMaincategoryPage from './Pages/Admin/Maincategory/AdminCreateMaincategoryPage'
import AdminUpdateMaincategoryPage from './Pages/Admin/Maincategory/AdminUpdateMaincategoryPage'

import AdminSubcategoryPage from './Pages/Admin/Subcategory/AdminSubcategoryPage'
import AdminCreateSubcategoryPage from './Pages/Admin/Subcategory/AdminCreateSubcategoryPage'
import AdminUpdateSubcategoryPage from './Pages/Admin/Subcategory/AdminUpdateSubcategoryPage'

import AdminBrandPage from './Pages/Admin/Brand/AdminBrandPage'
import AdminCreateBrandPage from './Pages/Admin/Brand/AdminCreateBrandPage'
import AdminUpdateBrandPage from './Pages/Admin/Brand/AdminUpdateBrandPage'

import AdminFeaturePage from './Pages/Admin/Feature/AdminFeaturePage'
import AdminCreateFeaturePage from './Pages/Admin/Feature/AdminCreateFeaturePage'
import AdminUpdateFeaturePage from './Pages/Admin/Feature/AdminUpdateFeaturePage'

import AdminFaqPage from './Pages/Admin/Faq/AdminFaqPage'
import AdminCreateFaqPage from './Pages/Admin/Faq/AdminCreateFaqPage'
import AdminUpdateFaqPage from './Pages/Admin/Faq/AdminUpdateFaqPage'

import AdminSettingPage from './Pages/Admin/Setting/AdminSettingPage'

import AdminProductPage from './Pages/Admin/Product/AdminProductPage'
import AdminCreateProductPage from './Pages/Admin/Product/AdminCreateProductPage'
import AdminUpdateProductPage from './Pages/Admin/Product/AdminUpdateProductPage'
import Product from './Pages/Product'
import LoginPage from './Pages/User/LoginPage'
import SignupPage from './Pages/User/SignupPage'
import ProfilePage from './Pages/User/ProfilePage'
import CartPage from './Pages/User/CartPage'
import CheckoutPage from './Pages/User/CheckoutPage'
import OrderConfirmation from './Pages/User/OrderConfirmation'
import AdminNewsletterPage from './Pages/Admin/Newsletter/AdminNewsletterPage'
import AdminContactUsPage from './Pages/Admin/ContactUs/AdminContactUsPage'
import AdminContactUsShowPage from './Pages/Admin/ContactUs/AdminContactUsShowPage'
import AdminCheckoutPage from './Pages/Admin/Checkout/AdminCheckoutPage'
import AdminCheckoutShowPage from './Pages/Admin/Checkout/AdminCheckoutShowPage'
import AdminUserPage from './Pages/Admin/User/AdminUserPage'
import AdminCreateUserPage from './Pages/Admin/User/AdminCreateUserPage'
import AdminUpdateUserPage from './Pages/Admin/User/AdminUpdateUserPage'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/feature' element={<FeaturePage />} />
          <Route path='/faq' element={<FaqPage />} />
          <Route path='/testimonial' element={<TestimonialPage />} />
          <Route path='/contactus' element={<ContactUsPage />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/tc' element={<TermsAndConditionPolicy />} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />

          {/* User Routes */}
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/order-confirmation' element={<OrderConfirmation />} />


          {/* Admin Routes */}
          <Route path='/admin' element={<AdminHomePage />} />

          <Route path='/admin/maincategory' element={<AdminMaincategoryPage />} />
          <Route path='/admin/maincategory/create' element={<AdminCreateMaincategoryPage />} />
          <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMaincategoryPage />} />

          <Route path='/admin/subcategory' element={<AdminSubcategoryPage />} />
          <Route path='/admin/subcategory/create' element={<AdminCreateSubcategoryPage />} />
          <Route path='/admin/subcategory/update/:id' element={<AdminUpdateSubcategoryPage />} />

          <Route path='/admin/brand' element={<AdminBrandPage />} />
          <Route path='/admin/brand/create' element={<AdminCreateBrandPage />} />
          <Route path='/admin/brand/update/:id' element={<AdminUpdateBrandPage />} />

          <Route path='/admin/feature' element={<AdminFeaturePage />} />
          <Route path='/admin/feature/create' element={<AdminCreateFeaturePage />} />
          <Route path='/admin/feature/update/:id' element={<AdminUpdateFeaturePage />} />

          <Route path='/admin/faq' element={<AdminFaqPage />} />
          <Route path='/admin/faq/create' element={<AdminCreateFaqPage />} />
          <Route path='/admin/faq/update/:id' element={<AdminUpdateFaqPage />} />

          <Route path='/admin/product' element={<AdminProductPage />} />
          <Route path='/admin/product/create' element={<AdminCreateProductPage />} />
          <Route path='/admin/product/update/:id' element={<AdminUpdateProductPage />} />

          <Route path='/admin/setting' element={<AdminSettingPage />} />

          <Route path='/admin/newsletter' element={<AdminNewsletterPage />} />

          <Route path='/admin/contactus' element={<AdminContactUsPage />} />
          <Route path='/admin/contactus/show/:id' element={<AdminContactUsShowPage />} />


          <Route path='/admin/checkout' element={<AdminCheckoutPage />} />
          <Route path='/admin/checkout/show/:id' element={<AdminCheckoutShowPage />} />

          <Route path='/admin/user' element={<AdminUserPage />} />
          <Route path='/admin/user/create' element={<AdminCreateUserPage />} />
          <Route path='/admin/user/update/:id' element={<AdminUpdateUserPage />} />

          <Route path='/*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
