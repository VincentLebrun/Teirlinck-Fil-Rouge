import Head from "next/head";
import Header from "../components/Header"
import Footer from "../components/Footer";
import Section from "../components/Section";

import { Row, Col } from 'antd';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Teirlinck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="home-content">
        <img src="/img/accueil.webp" alt="" />
        <div className="test">
          <div className="slogan">
            <Col xs={16} sm={16} className="slogan-cart">
              <h1>Passez commande et venez la récupérer en boucherie</h1>
              <button>Créer un compte</button>
            </Col>
          </div>
        </div>
      </div>

      <div className="descript">
        <Col className="descript-content" xs={16} sm={16}>
          <p>Boucherie Teirlinck, synonyme de qualité depuis 1925, vous accueille dans sa boutique situé 30 rue de Condé à Lille. Nos
atouts ? Un savoir-faire traditionnel, une fraîcheur irréprochable et un service personnalisé.»</p>
        </Col>
      </div>




      <Col className="section-container" xs={16} sm={16}>

        <Row xs={12} sm={12} justify="center">
          <Section
            title="En ce moment"
            icon="fi-rr-time-fast"
          />

          <Row className="moment-section" gutter={[24, 24]}>
            <Col className="moment" xs={6} sm={6}><img src="/img/accueil.webp" alt="" /></Col>
            <Col className="moment" xs={6} sm={6}><img src="/img/accueil.webp" alt="" /></Col>
            <Col className="moment" xs={6} sm={6}><img src="/img/accueil.webp" alt="" /></Col>
            <Col className="moment" xs={6} sm={6}><img src="/img/accueil.webp" alt="" /></Col>
          </Row>


        </Row>


        <Row justify="center" >
          <Section
            title="Promotions"
            icon="fi-rr-label"
          />

          <Row className="sold-section" gutter={[24, 24]}>
            <Col className="sold" xs={6} sm={6}><img src="/img/accueil.webp" alt="" /></Col>
            <Col className="sold" xs={6} sm={6}><img src="/img/accueil.webp" alt="" /></Col>
            <Col className="sold" xs={6} sm={6}><img src="/img/accueil.webp" alt="" /></Col>
            <Col className="sold" xs={6} sm={6}><img src="/img/accueil.webp" alt="" /></Col>
          </Row>

        </Row>
        <Row justify="center" >
          <Section
            title="Contact"
            icon="fi-rr-id-badge"
          />
        </Row>
      </Col>


      <Footer />
    </div>
  );
}
