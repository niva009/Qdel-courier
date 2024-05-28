import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RiFlightTakeoffFill } from "react-icons/ri";
import { Link } from "react-router-dom";




const BannerThree = () => {

  return (
    <>
      {/* banner start */}
      <div className='banner-area banner-area-3'>
        <div className='banner-slider owl-carousel'>
        
            <div>
              <div
                className='item'
                style={{ background: "url('/assets/img/slide-v1/bg-01.png')" }}
              >
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg-8'>
                      <div className='banner-inner style-white'>
                        <h1 className='b-animate-2 title' style={{ color:'orange'}}>
                          Calculate Shipping Rates In One Click
                        </h1>
                        <p className='b-animate-3 content'>
                          Professionally strategize stand-alone functionalities
                          and cooperative total linkage. Objectively predominate
                          virtual quality vectors with orthogonal.
                        </p>
                        <div className='icon-wrap b-animate-3'>
                          <div className='icon-file'>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='img-wrap b-animate-6'>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className='item'
                style={{ background: "url('/assets/img/slide-v1/bg-03.png')" }}
              >
              </div>
            </div>
        </div>
      </div>
      {/* banner end */}
    </>
  );
};

export default BannerThree;
