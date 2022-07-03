import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

//we have the {children} data from _app.js file its default {children} store all components data
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Smart Technica Store</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      
      </footer>
    </div>
  )
}

export default Layout