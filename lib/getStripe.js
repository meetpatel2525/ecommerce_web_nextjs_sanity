

import {loadStripe} from '@stripe/stripe-js'
// You can use Stripe. js' APIs to tokenize customer information, 
// collect sensitive payment details using customizable Stripe Elements,
//  and accept payments with browser payment APIs like Apple Pay and the Payment Request API.


let stripePromise;

//This function returns a Promise that resolves
//  with a newly created Stripe object once Stripe.js has 

const getStripe = () => {
    if(!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }
  console.log(stripePromise);
    return stripePromise;
  }
  
  export default getStripe
