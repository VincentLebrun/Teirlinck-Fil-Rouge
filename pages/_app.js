import "../styles/globals.scss";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from "next/router";
import cookieCutter from 'cookie-cutter'
import jwt from "jsonwebtoken";
import { Menu, Dropdown, Button } from 'antd';
import Link from 'next/link';
import { DownOutlined } from '@ant-design/icons';
import CookieConsent from "react-cookie-consent";


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
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();


  const logout = () => {
    // Supprimer les cookies
    cookieCutter.set('token', '', { expires: new Date(0) })
    // faire un setToken();
    setToken();
  }

  const menuUser = (
    <Menu>
      <Menu.Item>
        <Link href="/panier"><p>Mon panier</p></Link>
      </Menu.Item>
      <Menu.Item onClick={() => logout()}>
        <p>Se déconnecter</p>
      </Menu.Item>
    </Menu>
  );

  const menuAdmin = (
    <Menu>
      <Menu.Item>
        <Link href="/panier"><p>Mon panier</p></Link>
      </Menu.Item>
      <Menu.Item onClick={() => logout()}>
        <p>Se déconnecter</p>
      </Menu.Item>
      <Menu.Item>
        <Link href="/admin"><p>Administration</p></Link>
      </Menu.Item>
    </Menu>
  );

  // Initialisation ou récupération du localStorage
  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
    if (cookieCutter.get('token')) {
      jwt.verify(cookieCutter.get('token'), process.env.NEXT_PUBLIC_JWT_KEY, (err, decode) => {
        if (err) {
          cookieCutter.set('token', '', { expires: new Date(0) })
          setToken();
        } else {
          setToken(cookieCutter.get('token'));
        }
      });
    }
    setLoading(false)
  }, []);

  let decryptedToken = {};
  if (token) {
    // fonction de décryptage du token 
    decryptedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
  }

  // Synchronisation panier <=> localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const renderDropdown = () => {
    if (token && decryptedToken) {
      if (decryptedToken.userValidated && !decryptedToken.userAdmin) {
        return (
          <Dropdown overlay={menuUser} placement="bottomCenter" arrow>
            <Button><i className="fi-rr-user"></i> {decryptedToken.userFirstName}<DownOutlined /></Button>
          </Dropdown>
        )
      } else if (decryptedToken.userValidated && decryptedToken.userAdmin) {
        return (
          <Dropdown overlay={menuAdmin} placement="bottomCenter" arrow>
            <Button><i className="fi-rr-user"></i> {decryptedToken.userFirstName}<DownOutlined /></Button>
          </Dropdown>
        )
      }
    } else {
      return (
        <Button><Link href="/connexion"><i className="fi-rr-user"> Se connecter</i></Link></Button>
      )
    }
  }

  const renderHeader = () => {
    if (router.pathname != "/CreateAccount" && router.pathname != "/connexion" && !router.pathname.startsWith("/admin")) {
      return (
        <Header
          panier_length={cart.items.length}
        //userName={decryptedToken.userFirstName}
        >
          {renderDropdown()}
        </Header>
      )
    }
  }

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <Fragment>
      <CookieConsent
        location="bottom"
        buttonText="Accepter"
        style={{ background: "#222222" }}
      >
        Ce site utilise des cookies pour améliorer l'expérience de navigation et fournir des fonctionnalités supplémentaires !</CookieConsent>
      <Head>
        <title>Boucherie Teirlinck</title>
        <link rel="icon" href="/favicon.ico"></link>
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
