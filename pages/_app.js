import "../styles/globals.scss";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from "next/router";
import cookieCutter from 'cookie-cutter'
import jwt from "jsonwebtoken";
import { Menu, Dropdown, Button, notification } from 'antd';
import Link from 'next/link';
import { DownOutlined } from '@ant-design/icons';
import CookieConsent from "react-cookie-consent";
import Maintenance from "../components/Maintenance";

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [notif, setNotif] = useState(false);
  const [manager, setManager] = useState();

  const id = "61964283500214bbcde28d12";

  async function getManager() {
    await fetch(process.env.NEXT_PUBLIC_API_MANAGER + "/" + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json()).then(json => { setManager(json); setLoading(false); });

  }

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
    getManager();
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
      } else if (!decryptedToken.userValidated && !decryptedToken.userAdmin) {
        return (
          <Dropdown overlay={menuUser} placement="bottomCenter" arrow>
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

  const cookieBar = () => {
    if (token) {
      return (
        <CookieConsent
          location="bottom"
          buttonText="Accepter"
          setDeclineCookie={false}
          enableDeclineButton
          declineButtonText="Refuser"
          style={{ background: "#222222" }}
          onDecline={() => {
            cookieCutter.set('token', '', { expires: new Date(0) })
            setToken()
          }}
        >
          Ce site utilise un cookie de connexion nécessaire, si vous refusez celui ci vous serez alors déconnecté ! </CookieConsent>
      )
    }
  }

  const renderHeader = () => {
    if (router.pathname != "/CreateAccount" && router.pathname != "/connexion" && !router.pathname.startsWith("/admin")) {
      return (
        <Header
          panier_length={cart.items.length}
        >
          {renderDropdown()}
          {cookieBar()}
        </Header>
      )
    }
  }

  const desactivateCommands = () => {
    if (!notif) {
      if (!manager?.validCommands) {
        notification['info']({
          message: "Information",
          description: "Les commandes sont désactivées sur le site actuellement, vous pouvez néanmoins consulter nos produits et remplir votre panier pour une prochaine fois.",
          placement: "bottomRight",
          duration: 0,
          style: {
            width: 500,
          }
        })
      }
      if (manager?.principalMessage != "") {
        notification['info']({
          message: "Information",
          description: `${manager?.principalMessage}`,
          placement: "bottomRight",
          duration: 0,
          style: {
            width: 500,
          }
        })
      }
      setNotif(true);
    }
  }


  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (manager?.maintenance) {
    if (router.pathname != "/connexion" && !router.pathname.startsWith("/admin")) {
      return <Maintenance manager={manager} />
    }
  }


  return (
    <Fragment>

      <Head>
        <title>Boucherie Teirlinck</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      {renderHeader()}
      {desactivateCommands()}
      <Component
        {...pageProps}
        cart={cart}
        setCart={setCart}
        token={token}
        setToken={setToken}
        manager={manager}
        setManager={setManager}
      />
    </Fragment>
  );
}

export default MyApp;
