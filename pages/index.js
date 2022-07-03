import React from 'react'
import { client } from '../lib/client'

import { Product,MyBanner,Footerbanner } from '../components'

const Home = ( { products, bannerData }) => {

// console.log(bannerData);

  return (
  
    <>

<MyBanner myBanner={bannerData.length && bannerData[0] } ></MyBanner>

<div className='products-heading' >
<h2> Best Selling Product </h2>
{/* {console.log(bannerData)} */}
<p> Speakers of many Veriation </p>
</div>

<div className="products-container">

      {products?.map((product) =>  <Product key={product._id} product={product} />)}
    </div>
{/* //if bannerData has an value than take bannerDatas array first value */}
<Footerbanner footerbanner={bannerData && bannerData[0] }  />
    </>
  
  )
}

//serverside render of admin data so data is alredy avilable for user for batter seo
//we call the api and get data on page 
export const getServerSideProps = async () => {

  //get all product from sanity
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home