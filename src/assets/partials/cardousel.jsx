import React from "react"
import Card from './card'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './cardousel.css'

export default function Cardousel(props) {

    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
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
       
        <Slider {...settings}>
            <div className="card">
                
                {dummyData.map((p, i) => (
                    <Card
                        key={i}
                        scale={1}
                        img_path={p.img_path}
                        mask_path={p.mask_path}
                        orderSwitch={props.orderSwitch}
                    />
                ))}
                
            </div>
        </Slider> 
    );
}
