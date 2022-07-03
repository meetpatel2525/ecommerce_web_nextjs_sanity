import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
// import { urlFor } from '../lib/client';


const MyBanner = ({ myBanner }) => {
  // console.log(myBanner);
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{myBanner.smallText}</p>
        <h3>{myBanner.midText}</h3>
        <h1>{myBanner.largeText1}</h1>
      
    
        <img  src={urlFor(myBanner.image)} alt="headphones" className="hero-banner-image" />
    
        <div>
          <Link href={`/product/${myBanner.product}`}>
            <button type="button">{myBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{myBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBanner