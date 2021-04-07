import Head from "next/head";

import Header from "../components/Header"
import Footer from "../components/Footer";
import { Row, Col } from 'antd';
import SizeContext from "antd/lib/config-provider/SizeContext";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Teirlinck</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="/icons/uicons/css/uicons-regular-rounded.css" rel="stylesheet"></link>
      </Head>
      <Header />

      <div className="home-content">
        <img src="/img/accueil.webp" alt="" />
        <div className="slogan">
          <Col xs={16} sm={16} className="slogan-cart">
            <h1>Passez commande et venez la récupérer en boucherie</h1>
            <button>Créer un compte</button>
          </Col>
        </div>
      </div>


      <Row xs={24} sm={24} justify="center">
        <Row xs={16} sm={16}>
          <p>test</p>
        </Row>
      </Row>

      <Footer />
    </div>
  );
}
