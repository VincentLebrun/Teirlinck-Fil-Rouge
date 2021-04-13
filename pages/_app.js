import "../styles/globals.scss";
import React, { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(true);

   let cart = {items : [], total : 0};

  useEffect (() => {
    if(!localStorage.getItem('cart')){
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    setLoading(false);
  });
  
  if(loading) {
    return (
      <p>Chargement en cours...</p>
    )
  }

  return <Component {...pageProps} />;
}

export default MyApp;
