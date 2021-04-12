import "../styles/globals.scss";
import React, { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {

  const cart = {items : [], total : 0};

  useEffect (() => {
    if(!localStorage.getItem('cart')){
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  });
  
  
  return <Component {...pageProps} />;
}

export default MyApp;
