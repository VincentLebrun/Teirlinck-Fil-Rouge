import Head from "next/head";

import Header from "../components/Header"
import Footer from "../components/Footer";
import { Row, Col } from 'antd';

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
        <img src="" alt=""/>
        <Row className="slogan">
            <h1>Passez commande et venez la récupérer en boucherie</h1>
            <button>lol</button>
        </Row>
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
