import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import SingleProduct from './SingleProduct';

export default function Testimonial() {
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
    return (
        <section id="featured-testimonials" className="featured-testimonials section">

            <div className="container" data-aos="fade-up" data-aos-delay="100">

                <div className="testimonials-14 swiper init-swiper">
                    <Swiper {...options}>
                        <SwiperSlide>
                            <div className="testimonial-item">
                                <div className="stars">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p>Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus.
                                    Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.</p>
                                <div className="profile">
                                    <img src="assets/img/person/person-m-9.webp" className="testimonial-img" alt="" loading="lazy" />
                                    <div className="info">
                                        <h4>Marcus Chen <i className="bi bi-patch-check-fill"></i></h4>
                                        <span>@marcuschen</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonial-item">
                                <div className="stars">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p>Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim
                                    tempor labore quem eram duis noster aute amet eram fore quis sint minim.</p>
                                <div className="profile">
                                    <img src="assets/img/person/person-f-5.webp" className="testimonial-img" alt="" loading="lazy" />
                                    <div className="info">
                                        <h4>Sarah Mitchell <i className="bi bi-patch-check-fill"></i></h4>
                                        <span>@sarahmitch</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonial-item">
                                <div className="stars">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p>Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit
                                    minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore.</p>
                                <div className="profile">
                                    <img src="assets/img/person/person-f-12.webp" className="testimonial-img" alt="" loading="lazy" />
                                    <div className="info">
                                        <h4>James Wilson <i className="bi bi-patch-check-fill"></i></h4>
                                        <span>@jwilson</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonial-item">
                                <div className="stars">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p>Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa
                                    labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa.</p>
                                <div className="profile">
                                    <img src="assets/img/person/person-m-12.webp" className="testimonial-img" alt="" loading="lazy" />
                                    <div className="info">
                                        <h4>Emma Rodriguez <i className="bi bi-patch-check-fill"></i></h4>
                                        <span>@emmarod</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonial-item">
                                <div className="stars">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p>Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis
                                    quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.</p>
                                <div className="profile">
                                    <img src="assets/img/person/person-m-13.webp" className="testimonial-img" alt="" loading="lazy" />
                                    <div className="info">
                                        <h4>David Kumar <i className="bi bi-patch-check-fill"></i></h4>
                                        <span>@davidkumar</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonial-item">
                                <div className="stars">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p>Texit tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis
                                    quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.</p>
                                <div className="profile">
                                    <img src="assets/img/person/person-f-13.webp" className="testimonial-img" alt="" loading="lazy" />
                                    <div className="info">
                                        <h4>Sophia Lee <i className="bi bi-patch-check-fill"></i></h4>
                                        <span>@sophialee</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    <div className="swiper-pagination"></div>

                </div>

            </div>

        </section>
    )
}
