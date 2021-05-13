import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";

import Section from "../../components/Section";
import { Row, Col } from "antd";

const Product = ({ product, cart, setCart }) => {

    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const addToCart = () => {
        if (price != 0) {
            // Cette ligne permet d'avoir un id unique lors de l'affichage du panier
            const item = {
                id: product._id,
                name: product.name,
                image: product.image,
                price_type: product.price_type,
                price: product.price,
                quantity,
            };
            // item.quantity = quantity;
            // item.id = `${item.id}-${Date.now()}`;
            //cart.items.push(product) ==> mutation de state !
            // on doit toujours passer par la fonction de modification de la propriété qui est mise à disposition par le useState

            setCart({
                items: [...cart.items, item],
                total: Number((cart.total + price).toFixed(2)),
            });
        } else {
            alert("Veuillez saisir une quantité valide pour ce produit");
        }
    };

    const renderPrice = (e) => {
        if (e.target.name == "weight") {
            const price = Number(
                ((product.price * Math.abs(e.target.value)) / 1000).toFixed(2)
            );
            setPrice(price);
        } else {
            const price = Number((product.price * Math.abs(e.target.value)).toFixed(2));
            setPrice(price);
        }
        setQuantity(Math.abs(e.target.value));
    };

    const updateQuantity = () => {
        const cart_item = cart.items.find((item) => item.name == product.name);
        const previous_price = Number(
            ((cart_item.quantity * cart_item.price) / 1000).toFixed(2)
        );
        cart_item.quantity = quantity;
        const new_price = Number(
            ((cart_item.quantity * cart_item.price) / 1000).toFixed(2)
        );
        let items = cart.items;
        const index_item = cart.items.indexOf(product.name);
        items[index_item] = cart_item;
        // items = cart.items.splice(index_item, 1);
        // items = items.push(cart_item);
        setCart({
            items: items,
            total: Number((cart.total - previous_price + new_price).toFixed(2)),
        });
    };

    const renderButton = () => {
        if (!cart.items.find((item) => item.name == product.name)) {
            return <button onClick={() => addToCart()}>Ajouter au panier</button>;
        } else {
            return (
                <div className="">
                    <p>
                        Cet article est déjà dans votre panier, veuillez cliquer ci-dessous
                        pour modifier sa quantité.
                    </p>
                    <button onClick={() => updateQuantity()}>Modifier</button>
                </div>
            );
        }
    }

    return (
        <div className="productDetails">
            <Hero
                title={product.name}
                image="ourproducts.webp"
            />
            <Row justify="center">
                <Col xs={22} xl={16}>
                    <Row gutter={[16, 24]} justify="space-around">
                        <Col sm={16} xxl={12}>
                            <div className="element">
                                <img src={product.image} alt="" />
                                <div className="element-absolute">
                                    <div className="element-inside"></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={16} xxl={8}>
                            <div className="productPrice">
                                <ul>
                                    <li className="title">Prix</li>
                                    <hr />
                                    <li>{product.price} €{product.price_type}</li>
                                    <li className="title">Quantité</li>
                                    <hr />
                                    <li>
                                        <input onChange={(e) => renderPrice(e)} className={product.price_type === "/pc" ? "hidden" : ""} type="number" name="weight" id="inputWeight" placeholder="(en grammes)" step="50" min="0" />
                                        <input onChange={(e) => renderPrice(e)} className={product.price_type === "/kg" ? "hidden" : ""} type="number" name="numberOfPieces" id="inputNumberOfPieces" placeholder="(nombre de pièces)" step="1" min="0" />
                                    </li>
                                    <li className="title">Prix à régler</li>
                                    <hr />
                                    <li>{price} €</li>
                                </ul>
                                <div className="btn_add_to_cart"></div>
                                <span className="iconCart"><i className="fi-rr-shopping-cart-check"></i></span>
                                {renderButton()}
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

                    <Row justify="center">
                        <Col span={14}>
                            <p>{product.description}</p>
                        </Col>
                    </Row>

                    <Section title="Allergènes" icon="fi-rr-exclamation" />

                    <Row justify="center">
                        <Col span={14}>
                            <p>
                                {product.allergenes.length === 0 ? "Ce produit ne contient aucun des 14 allergènes (conformément au Règlement (UE) n° 1169/2011 concernant l'information des consommateurs sur les denrées alimentaires) selon la recette. La contamination croisée dans la boucherie ne peut jamais être totalement exclue)." : `Ce produit contient les allergènes suivants : ${product.allergenes.join(', ')}`}
                            </p>
                        </Col>
                    </Row>
                </Row>
            </div>
            <Footer />
        </div>
    );
};

export default Product;

async function getProduct(id) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS + '/' + id)
        .then(response => response.json())

    return res;

}

// getServerSideProps

export async function getServerSideProps({ params }) {
    const product = await getProduct(params.id);

    return {
        props: {
            product,
        },
    };
}
