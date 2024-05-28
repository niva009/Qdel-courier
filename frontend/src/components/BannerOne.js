import React from "react";
import { Link } from "react-router-dom";
import{ useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BannerOne =()=>{

  const Navigate = useNavigate();

  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const Url = `/tracking/${trackingNumber}`
    Navigate(Url);
  }

  return (
    <>
      {/* banner start */}
      <div className='banner-area banner-area-1'>
        <div className='banner-slider owl-carousel'>  
            <div>
              <div
                className='item'
                style={{ backgroundImage: 'url("./assets/img/banner/bannerqdel.jpg")' }}
              >
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg-7 col-md-8'>
                      <div className='banner-inner style-white'>
                        <h1 className='b-animate-2 title'>
                          FAST CERTIFIED &amp; BEST WORLD WIDE SERVICE
                        </h1>
                        <p className='b-animate-3 content'>
                          Professionally strategize stand-alone functionalities
                          and cooperative total linkage. Objectively predominate
                          virtual quality vectors with orthogonal.
                        </p>
                        <div className='btn-wrap'>

                          <h3 style={{ color:'white'}}>Track Your Shipment</h3>
                          <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          style ={{ padding: '15px 20px',width:'60%'}}
                          id="trackingNumber"
                          value={trackingNumber}
                          onChange={(event) => setTrackingNumber(event.target.value)}
                          placeholder="Enter Tracking ID"
                        />
                        <button style={{ padding: '15px 30px',backgroundColor:'#fa4318',color:'white',border:'none'}} type="submit">Track</button>
                      </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      {/* banner end */}
    </>
  );
}

export default BannerOne;
