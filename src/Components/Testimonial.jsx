import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Testimonial(props) {
    let [reviews, setReviews] = useState([])
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    let options = {
        slidesPerView: 'auto',
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        },
        modules: [Autoplay]
    }

    function getStar(star) {
        if (star == 5) {
            return <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
            </div>
        }
        else  if (star == 4) {
            return <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i>
            </div>
        }
        else  if (star == 3) {
            return <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
            </div>
        }
        else  if (star == 2) {
            return <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
            </div>
        }
        else{
            return <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
            </div>
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (props.data)
                setReviews(props.data)
            else if (TestimonialStateData.length) {
                setReviews(TestimonialStateData.filter(x => x.star >= 4))
            }
        })()
    }, [TestimonialStateData.length])
    return (
        <section id="featured-testimonials" className="featured-testimonials section">

            <div className="container" data-aos="fade-up" data-aos-delay="100">

                <div className="testimonials-14 swiper init-swiper">
                    <Swiper {...options}>
                        {reviews.map((item, index) => {
                            return <SwiperSlide>
                                <div className="testimonial-item">
                                    {getStar(item.star)}
                                    <p className='testimonial-message'>{item.message}</p>
                                    <div className="profile">
                                        <div className="info">
                                            <h4>{item.user} <i className="bi bi-patch-check-fill"></i></h4>
                                            <span><Link to={`/product/${item.product}`}>Click To Show More</Link></span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}
                    </Swiper>

                    <div className="swiper-pagination"></div>

                </div>

            </div>

        </section>
    )
}
