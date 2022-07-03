import '../styles/globals.css'
import React from 'react'
import Layout from '../components/Layout'
import StateContext from '../context/StateContext'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {

  return (
  //for send all data of statConext to evry component 
<StateContext>
<Layout>
{/* // <Toaster/> for popup */}
<Toaster/>
<Component {...pageProps} />
</Layout>
</StateContext> 
  )
}

export default MyApp
