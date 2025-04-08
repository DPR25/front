import React from "react"
import Card from './card'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './cardousel.css'

export default function Cardousel(props) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        adaptiveHeight: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false
                }
            }
        ]
      };

    const dummyData = [
        {
            img_path: '/dummy-slider/img0.png',
            mask_path: '/dummy-slider/mask0.png'
        },
        {
            img_path: '/dummy-slider/img1.png',
            mask_path: '/dummy-slider/mask1.png'
        },
        {
            img_path: '/dummy-slider/img2.png',
            mask_path: '/dummy-slider/mask2.png'
        },
        {
            img_path: '/dummy-slider/img3.png',
            mask_path: '/dummy-slider/mask3.png'
        }
    ];


    return (
        <div className="slider-container">
            <div className="carousel-wrapper">
                <Slider {...settings}>
                    {dummyData.map((p, i) => (
                        <div className="card" key={i}>
                            <Card
                                scale={0.9}
                                img_path={p.img_path}
                                mask_path={p.mask_path}
                                orderSwitch={props.orderSwitch}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
