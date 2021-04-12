import { useState } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { Row, Col } from 'antd';
import Link from 'next/link'
import carts from "../cart"

const panier = () => {
    const [panier, setPanier] = useState(carts);
    const [total, setTotal] = useState();

    const itemPrice = (price, quantity, type) => {

        if (type == "/kg") {
            const pricekg = Number(((price * quantity) / 1000).toFixed(2));
            return pricekg;
        } else {
            const pricepc = Number(((price * quantity)).toFixed(2));
            return pricepc;
        }

    }

    const priceType = (type) => {
        if (type == "/kg") {
            return "g";
        }
        else {
            console.log(type);
            return "pc";
        }
    }


    let testTotal = 0;
    const listPanier = panier.map(item => {

        testTotal += itemPrice(item.price, item.quantity, item.price_type);


        return (
            <div>
                <hr className="top-hr" />

                <Row justify="space-between">
                    <Col xs={24} sm={12}>
                        <Row justify="space-between">
                            <Col xs={24} sm={12}>

                                <Link href={`/products/1`}>

                                    <div className="element">
                                        <img src={item.image} alt="" />
                                        <div className="element-absolute">
                                            <div className="element-inside"></div>
                                        </div>
                                    </div>

                                </Link>

                            </Col>

                            <Col xs={24} sm={8}>
                                <h2>{item.name}</h2>
                                <div className="input-weight">
                                    <input type="number" placeholder={item.quantity} step="25" min="0" />
                                    <p>{priceType(item.price_type)}</p>
                                </div>
                            </Col>
                        </Row>

                    </Col>

                    <Col className="price-suppr" xs={24} sm={8}>

                        <h2>~{itemPrice(item.price, item.quantity, item.price_type)}€</h2>
                        <div className="store-button">
                            <button>Supprimer de votre panier</button>
                        </div>

                    </Col>


                </Row>
            </div>

        )
    })

    return (
        <div>
            <Header />
            <Hero

                title="Votre panier"
                image="panier.webp"
            />

            <Col className="section-container" xs={21} sm={16}>
                <Row justify="space-between">
                    <Col className="store-item-container" sm={15}>
                        <Row justify="space-between">
                            <Col>
                                <h2>Vos produits</h2>
                            </Col>

                            <Col>
                                <h2>Prix</h2>
                            </Col>
                        </Row>

                        {/* Composant panier --------------------------------- */}
                        {listPanier}
                        {/* Composant panier------------------------------------ */}


                        <hr />

                        <Row justify="end">
                            <h3>Total( {carts.length} produits): ~{Number(testTotal.toFixed(2))}€</h3>
                        </Row>
                    </Col>

                    <Col sm={7} className="total-store">
                        <div className="info">
                            <i class="fi-rr-exclamation"></i> <p>Le prix peut être légèrement différent au moment du règlement en boucherie dû à la pesée.</p>
                        </div>

                        <h1>Total ({carts.length} produits): ~{Number(testTotal.toFixed(2))}€</h1>

                        <button>Passer la commande</button>
                    </Col>

                </Row>

            </Col>

            <Footer />
        </div>
    )
}


export default panier
