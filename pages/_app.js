import "../styles/globals.scss";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from "next/router";
import cookieCutter from 'cookie-cutter'
import jwt from "jsonwebtoken";
import { Menu, Dropdown, Button } from 'antd';
import Link from 'next/link';
import {UserOutlined} from '@ant-design/icons';

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
        <Link href="/admin"><p>Administrateur</p></Link>
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
      setToken(cookieCutter.get('token'));
    }
    setLoading(false)
  }, []);

  let decryptedToken = {};
  if (token) {
    // fonction de décryptage du token 
    decryptedToken = jwt.verify(token, "secret");
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
            <Button>{decryptedToken.userFirstName}</Button>
          </Dropdown>
        )
      } else if (decryptedToken.userValidated && decryptedToken.userAdmin) {
          return(
            <Dropdown overlay={menuAdmin} placement="bottomCenter" arrow>
              <Button>{decryptedToken.userFirstName}</Button>
            </Dropdown>
          )
      }
    } else {
      return(
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
