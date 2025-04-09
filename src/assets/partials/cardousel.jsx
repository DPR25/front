import React, { useRef, useEffect, useState } from "react";
import Card from './card';
import Slider from 'react-slick';
import ToggleBtn from "./togglebtn";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './cardousel.css';

export default function Cardousel(props) {
    const sliderRef = useRef(null);

    useEffect(() => {
        if (sliderRef.current && props.position !== undefined) {
            sliderRef.current.slickGoTo(props.position);
        }
    }, [props.position]);

    const [isToggled, setIsToggled] = useState(false)
    const settings = {
        dots: true,
        infinite: false, // Already set to false, which is correct for non-infinite behavior
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true, // Enable centerMode to center the active slide
        centerPadding: '0px', // Remove padding to ensure slides align properly
        initialSlide: 0, // Start with the first slide
        autoplay: false,
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
                    centerMode: true, // Keep centerMode true for consistency
                    centerPadding: '0px',
                    initialSlide: 0,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true, // Keep centerMode true for consistency
                    centerPadding: '0px',
                    initialSlide: 0,
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
                <Slider {...settings} ref={sliderRef}>
                    {dummyData.map((p, i) => (
                        <div className="card" key={i}>
                            <Card
                                scale={0.9}
                                img_path={p.img_path}
                                mask_path={p.mask_path}
                                orderSwitch={isToggled}
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className='px-15'>
            <ToggleBtn isToggled={isToggled} onToggle={() => {
                setIsToggled(!isToggled)
            }}/>
            </div>

        </div>
    );
}
