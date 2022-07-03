import React from "react";
import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ products, product }) => {

  const { image, name, details, price} = product;
  const [index, setIndex] = useState(0);

  //get all data from useStateContext component

  const { decQty, incQty, qty ,onAdd,setShowCart} = useStateContext();

//buy now function 

 const handleBuyNow = () =>{
  //  call add product and add in cart 
   onAdd(product,qty);

   //than ridirect to the cart page 
   setShowCart(true);
   
 }







  return (
    <>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              //we can chage the image using change state of index
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>

          <div className="small-images-container">
            {/* //we map the index also for at see other picters */}
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                //triger on hower of images
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1> {name} </h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4> Detail: </h4>
          <p> {details} </p>
          <p className="price"> ${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num"> {qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product,qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="buy-now"
               onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/*  sugest other products with animation  */}

      <div className="maylike-products-wrapper">
        <h2>You may also like this</h2>
        {/* for scroling use marquee */}
        <div className="marquee">
          {/* track is for move the products */}
          <div className="maylike-products-container track">
            {products.map((item) => (
              //we need to defain key item.id and product = item item gets all products details
              //becose we pass props in product component
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

//path code start

//we are using getStaticProps so we also need to set paths of products thata user maybe click on

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;
    
  const products = await client.fetch(query);
  //for perticuler product
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

//path code end

//for fatch product data and make it static for show data  instantly and fast
export const getStaticProps = async ({ params: { slug } }) => {
  //get perticuler product slug slug id
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  //for fatch other products also
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);

  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
