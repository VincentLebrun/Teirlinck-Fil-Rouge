import "../styles/globals.scss";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from "next/router";
import cookieCutter from 'cookie-cutter'

// function MyApp({ Component, pageProps }) {
//   const [loading, setLoading] = useState(true);

//   let cart = { items: [], total: 0 };

//   useEffect(() => {
//     if (!localStorage.getItem("cart")) {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//     setLoading(false);
//   });

//   if (loading) {
//     return <p>Chargement en cours...</p>;
//   }

//   return <Component {...pageProps} />;
// }

// export default MyApp;

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const [cart, setCart] = useState( { items: [], total: 0 } )
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  

  // Initialisation ou récupération du localStorage
  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
    if (cookieCutter.get('token')) {
      setToken(cookieCutter.get('token'));
    } 
      setLoading(false)
  }, []);

  // Synchronisation panier <=> localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const renderHeader = () => {
    if (router.pathname != "/CreateAccount" && router.pathname != "/connexion" && !router.pathname.startsWith("/admin")) {
      return(
        <Header
          panier_length={cart.items.length}
          //userName={token.firstname}
          // if(admin) {<Dropdown/>} else {<Dropdown/>}
        />
      )
    }
  }

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  return(
    <Fragment>
      <Head>
        <title>Boucherie Teirlinck</title>
        <link rel="icon" href="/favicon.ico"></link>
        {/* rajouter la favicon pour l'appli */}
      </Head>
      {renderHeader()}
      <Component 
        {...pageProps} 
        cart={cart}
        setCart={setCart}
        token={token}
        setToken={setToken}
      />
    </Fragment>
  );
}

export default MyApp;
