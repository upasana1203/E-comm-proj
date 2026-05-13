import { all } from "redux-saga/effects";

import MaincategorySagas from "./MaincategorySagas"
import SubcategorySagas from "./SubcategorySagas"
import BrandSagas from "./BrandSagas"
import ProductSagas from "./ProductSagas"
import FeatureSagas from "./FeatureSagas"
import FaqSagas from "./FaqSagas"
import SettingSagas from "./SettingSagas"
import CartSagas from "./CartSagas"
import WishlistSagas from "./WishlistSagas"
import CheckoutSagas from "./CheckoutSagas"
import NewsletterSagas from "./NewsletterSagas"
import TestimonialSagas from "./TestimonialSagas"
import ContactUsSagas from "./ContactUsSagas"
import UserSagas from "./UserSagas"

export default function* RootSaga() {
    yield all([
        MaincategorySagas(),
        SubcategorySagas(),
        BrandSagas(),
        ProductSagas(),
        FeatureSagas(),
        FaqSagas(),
        SettingSagas(),
        CartSagas(),
        WishlistSagas(),
        CheckoutSagas(),
        NewsletterSagas(),
        TestimonialSagas(),
        ContactUsSagas(),
        UserSagas(),
    ])
}