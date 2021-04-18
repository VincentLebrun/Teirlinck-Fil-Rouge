import Head from "next/head";
import { useState, useEffect } from "react";
import products from "../product";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Seemore from "../components/Seemore";
import ProductElement from "../components/ProductElement";
import { Row, Col } from "antd";
import Link from "next/link";

export default function Home({ data }) {
  const [produits, setProduits] = useState(data);

  const [momentSlice, setMomentSlice] = useState(4);
  const [soldSlice, setSoldSlice] = useState(4);

  // const [cart, setCart] = useState();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setCart(JSON.parse(localStorage.getItem("cart")));
  //   setLoading(false);
  // }, []);

  const SeeMore = (name) => {
    if (name == "sold") {
      setSoldSlice(soldSlice + 4);
    } else setMomentSlice(momentSlice + 4);
  };

  const listMomentProducts = produits
    .filter((item) => item.highlighted === true)
    .slice(0, momentSlice)
    .map((item) => {
      return (
        <ProductElement
          key={item.id}
          id={item.id}
          name={item.name}
          img={item.image}
          price={item.price}
          price_type={item.price_type}
        />
      );
    });

  const listSoldProducts = produits
    .filter((item) => item.promotion === true)
    .slice(0, soldSlice)
    .map((item) => {
      return (
        <ProductElement
          key={item.id}
          id={item.id}
          name={item.name}
          img={item.image}
          price={item.price}
          price_type={item.price_type}
        />
      );
    });

  // if (loading) {
  //   return <p>Chargement en cours !</p>;
  // }

  return (
    <div>
      {/* <Header
        panier_length={cart.items.length}
      /> */}
      <div className="home-content">
        <img src="/img/accueil.webp" alt="" />
        <div className="test">
          <div className="slogan">
            <Col xs={16} sm={16} className="slogan-cart">
              <h1>Passez commande et venez la récupérer en boucherie</h1>
              <button><Link href="/CreateAccount">Créer un compte</Link></button>
            </Col>
          </div>
        </div>
      </div>

      <div className="descript">
        <Col className="descript-content" xs={16} sm={16}>
          <p>
            Boucherie Teirlinck, synonyme de qualité depuis 1925, vous accueille
            dans sa boutique situé 30 rue de Condé à Lille. Nos atouts ? Un
            savoir-faire traditionnel, une fraîcheur irréprochable et un service
            personnalisé.»
          </p>
        </Col>
      </div>

      <Col className="section-container" xs={21} sm={16}>
        <Row justify="center">
          <Section title="En ce moment" icon="fi-rr-time-fast" />

          <Row className="moment-section" gutter={[24, 24]} justify="center">
            {listMomentProducts}
          </Row>
          <Seemore action={() => SeeMore("moment")} />
        </Row>

        <Row justify="center">
          <Section title="Promotions" icon="fi-rr-label" />

          <Row className="sold-section" justify="center" gutter={[24, 24]}>
            {listSoldProducts}
          </Row>
          <Seemore action={() => SeeMore("sold")} />
        </Row>

        <Row justify="center">
          <Section title="Contact" icon="fi-rr-id-badge" />
        </Row>

        <Row justify="center" gutter={[24, 24]} className="contact-section">
          <Col xs={24} sm={12}>
            <div className="contact">
              <h3>Commandez pour plus de facilité !</h3>
              <div className="command-circle">
                <i class="fi-rr-shop"></i>
              </div>
              <div className="tutorial">
                <button><Link href="CreateAccount">Je me crée un compte</Link></button>
                <hr />
                <button>Je valide mon compte en boucherie</button>
                <hr />
                <button>Je me connecte puis je passe commande</button>
                <hr />
                <button>Je vais récupérer ma commande</button>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div className="contact">
              <h3>Comment nous trouver ?</h3>

              <div className="contact-circle">
                <i class="fi-rr-home"></i>
              </div>
              <div>
                <i class="fi-rr-marker"></i>
                <p>30 rue de Condé,</p>
                <p>59000 Lille</p>
              </div>
              <div>
                <i class="fi-rr-inbox"></i>
                <p>03 20 53 06 44</p>
              </div>

              <div className="open-hours">
                <p>
                  <i className="fi-rr-calendar"> </i>Horaires
                </p>
                <p>Lundi: 09h00 - 13h00, 16h00 - 18h45</p>
                <p>Mardi: 09h00 - 14h00, 16h00 - 18h45</p>
                <p>Mercredi: Fermé</p>
                <p>Jeudi: 09h00 - 14h00, 16h00 - 18h45</p>
                <p>Vendredi: 09h00 - 14h00, 16h00 - 18h45</p>
                <p>Samedi: 08h30 - 15h00</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </Col>
        </Row>
      </Col>

      <Footer />
    </div>
  );
}

async function getProducts() {
    const res = await fetch("http://localhost:4000/products")
        .then(response => response.json())

    return res;

}

export async function getServerSideProps() {
    const data = await getProducts();

    return {
        props: {
            data
        }
    }
}
