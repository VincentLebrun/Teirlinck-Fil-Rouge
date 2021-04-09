import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero';
import Header from "../../components/Header"
import Footer from "../../components/Footer";
import products from "../../product";
import Section from '../../components/Section'
import { Row, Col } from 'antd';
import ProductElement from '../../components/ProductElement';

const Product = ({ product }) => {

    const [price, setPrice] = useState(0);

    // const [produits, setProduits] = useState(products);
    // const [id, setId] = useState(router.query.id);
    // const product = produits.find((product) => product.id == id);
    // const [produit, setProduit] = useState(product);

    // pour le moment on utilise le tableau de produits pour récupérer le produit, après on récupèrera directement le produit dans la base avec un appel à l'API via un getServerSideProps( { params })

    const renderPrice = (e) => {
        if (e.target.name == "weight") {
            const price = ((product.price * e.target.value) / 1000).toFixed(2)
            setPrice(price);
        } else {
            const price = (product.price * e.target.value).toFixed(2)
            setPrice(price);
        }

    }

    return (
        <div className="productDetails">
            <Header />
            <Hero
                title={product.name}
                image="ourproducts.webp"
            />
            <Row justify="center">
                <Col span={16}>
                    <Row justify="space-around">
                        <Col xs={24} sm={12}>
                                <div className="element">
                                    <img src={product.image} alt="" />
                                    {/* <div className="element-name"><h1>{product.name}</h1></div> */}
                                    {/* <div className="element-price"><h2>{product.price}€{product.price_type}</h2></div> */}
                                    <div className="element-absolute">
                                        <div className="element-inside"></div>
                                    </div>
                                </div>
                        </Col>
                        <Col xs={24} xl={8}>
                            <div className="productPrice">
                                <ul>
                                    <li className="title">Prix</li>
                                    <hr/>
                                    <li>{product.price} €{product.price_type}</li>
                                    <li className="title">Quantité</li>
                                    <hr/>
                                    <li>
                                        <input onChange={(e) => renderPrice(e)} className={product.price_type === "/pc" ? "hidden" : ""} type="number" name="weight" id="inputWeight" placeholder="(en grammes)" step="25" min="0" />
                                        <input onChange={(e) => renderPrice(e)} className={product.price_type === "/kg" ? "hidden" : ""} type="number" name="numberOfPieces" id="inoutNumberOfPieces" placeholder="(nombre de pièces)" step="25" min="0" />
                                    </li>
                                    <li className="title">Prix à régler</li>
                                    <hr/>
                                    <li>{price} €</li>
                                </ul>
                                <div className="btn_add_to_cart"></div>
                                <span className="iconCart"><i className="fi-rr-shopping-cart-check"></i></span>
                                <button>Ajouter au panier</button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="productInfos">
                <Row justify="center">
                    <Section
                        title="Descriptif"
                        icon="fi-rr-document"
                    />
                </Row>
                <Row justify="center">
                    <Col span={14}><p>{product.description}</p></Col>
                </Row>
                <Row justify="center">
                    <Section
                        title="Allergènes"
                        icon="fi-rr-exclamation"
                    />
                </Row>
                <Row justify="center">
                    <Col span={14}><p>{product.allergenes.lenght == 0 ? "Ce produit contient les allergènes suivant : " : "Ce produit ne contient aucun des 14 allergènes (conformément au Règlement (UE) n° 1169/2011 concernant l'information des consommateurs sur les denrées alimentaires) selon la recette. La contamination croisée dans la boucherie ne peut jamais être totalement exclue)."}</p></Col>
                </Row>
            </div>
            <Footer />
        </div>
    )
}

export default Product;

// getServerSideProps

export async function getServerSideProps({ params }) {
    const product = products.find((product) => product.id == params.id)

    return {
        props: {
            product
        }
    }
}