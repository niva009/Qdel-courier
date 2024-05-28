import React from "react";
import {
  FaMoneyBillAlt,
  FaShieldAlt,
  FaToolbox,
  FaTruckMoving,
} from "react-icons/fa"

const FeatureTwo = () => {
  return (
    <>
      {/* Start Our Features area  */}
      <div
        className='features-area-2'
        style={{
          backgroundColor:"#FBB03B"
        }}
      >
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xl-6'>
              <div className='features-item'>
              <div className='single-features-item' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,backgroundColor: 'white' }}>
    <div className='icon'>
        <img width={100} height={110} src={'assets/img/faq/01.PNG'}  style={{ display: 'block' }} />
    </div>
</div>
<div className='single-features-item' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
    <div className='icon'>
        <img width={100} height={110} src={'assets/img/faq/02.PNG'} style={{ display: 'block' }} />
    </div>
</div>
<div className='single-features-item' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,backgroundColor: 'white'}}>
    <div className='icon'>
        <img width={100} height={110} src={'assets/img/faq/03.PNG'} style={{ display: 'block' }} />
    </div>
</div>
<div className='single-features-item' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
    <div className='icon'>
        <img width={100} height={110} src={'assets/img/faq/03.PNG'} style={{ display: 'block' }} />
    </div>
</div>
              </div>
            </div>
            <div className='col-xl-6 d-flex'>
              <div className='section-title white  text-left m-auto'>
                <span className='subtitles text-orange'>Follow This Easy Steps</span>
                <h2 className='title active text-white'>Calculate Your Courier Service Costs Quickly and Easily</h2>
                <p>
                  Affronting everything discretion men now own did. Still round
                  match we to. Frankness pronounce daughters remainder extensive
                  has but. Happiness cordially one determine concluded fat.
                  Plenty season beyond by hardly giving of. Consulted or
                  acuteness dejection an smallness if. Outward general passage
                  another as it. Affronting everything discretion men now own
                  did. Still round match we to. Frankness pronounce daughters
                  remainder extensive has but. Building mr concerns servants in
                  he outlived am breeding.He so lain good miss when sell some at
                  if.
                </p>
                <div className='btn-wrapper animated fadeInUpBig text-left'>
                  <a href='/shipnow' className='btn-bounce'>
                   ShipNow
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Our Features area  */}
    </>
  );
};

export default FeatureTwo;
