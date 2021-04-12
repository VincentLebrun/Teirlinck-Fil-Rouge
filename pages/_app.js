import "../styles/globals.scss";
import React, { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {

  const cart = [];

  useEffect (() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  });
  
  
  return <Component {...pageProps} />;
}

export default MyApp;
