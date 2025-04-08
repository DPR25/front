import React, { useEffect, useRef, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './cardousel.css';
import Card from './card';

export default function LocationSlider({ 
  locations = [], 
  currentLocation = null, 
  onSlideChange = () => {} 
}) {
  const sliderRef = useRef(null);
  const innerSliderRef = useRef(null);
  const [currentInnerIndex, setCurrentInnerIndex] = useState(0);
  
  // Najdi indeks trenutne lokacije
  const currentIndex = currentLocation ? locations.findIndex(loc => 
    loc.name === currentLocation.name
  ) : 0;

  // Premakni slider, ko se spremeni currentLocation
  useEffect(() => {
    if (sliderRef.current && currentIndex >= 0) {
      sliderRef.current.slickGoTo(currentIndex);
      setCurrentInnerIndex(0); // Resetiraj notranji slider ob spremembi lokacije
    }
    console.log("Current location:", currentLocation);
  }, [currentLocation, currentIndex]);

  // Funkcije za navigacijo
  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Nastavitve za glavni slider (za lokacije)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: false,
    initialSlide: currentIndex,
    adaptiveHeight: false,
    arrows: false, // Izklopimo privzete puščice
    afterChange: (index) => onSlideChange(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Nastavitve za notranji slider (za slike)
  const innerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '40px',
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    arrows: true,
    swipeToSlide: true,
    focusOnSelect: true,
    afterChange: (index) => setCurrentInnerIndex(index),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          centerPadding: '40px'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '30px'
        }
      }
    ]
  };

  if (!currentLocation || !currentLocation.images || currentLocation.images.length === 0) {
    return <div className="location-slider-container empty-slider">No images</div>;
  }

  return (
    <div className="location-slider-container">
      <div className="carousel-wrapper w-full">
        <div className="location-card w-full">
          <div className="location-content-wrapper w-full">
            <div className="images-slider-container w-full">
                <Slider ref={innerSliderRef} {...innerSliderSettings}>
                  {currentLocation.images.map((image, imageIndex) => (
                    <div key={imageIndex} className="card-wrapper">
                      <Card 
                        scale={0.9}
                        img_path={image.img_path || '/dummy-slider/img0.png'}
                        mask_path={image.mask_path || '/dummy-slider/mask0.png'}
                        orderSwitch={(imageIndex % 2 === 0)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
} 