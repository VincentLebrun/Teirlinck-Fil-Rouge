import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { Row, Col } from 'antd';

const panier = () => {
    return (
        <div>
            <Header />
            <Hero

                title="Votre panier"
                image="panier.webp"
            />

            <Col className="section-container" xs={21} sm={16}>
                <Row justify="space-between">
                    <Col sm={14}>
                        <Row justify="space-between">
                            <Col>
                                <p>Vos produits</p>
                            </Col>

                            <Col>
                                <p>Prix</p>
                            </Col>

                        </Row>

                    </Col>

                    <Col sm={8}>
                        <h1>lol</h1>

                    </Col>

                </Row>

            </Col>

            <Footer />
        </div>
    )
}

export default panier
