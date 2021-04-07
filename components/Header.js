import React from 'react'
import Link from 'next/link'
import { Row, Col } from 'antd';

const Header = () => {
    return (
        <header>
            <Row justify="center" align="middle">
                <Col xs ={16} sm={16} >
                    <Row justify="space-between" align="middle">
                        <Row align="middle">
                            <Col xs={6} sm={6}>
                                <Link href="/"><a><img src="/logo.svg" alt="" /></a></Link>
                            </Col>
                            <Col sm={18}>
                                <nav>
                                    <ul>
                                        <Link href="/api/hello"><a><li>Accueil</li></a></Link>
                                        <Link href="/api/hello"><a><li>Nos Produits</li></a></Link>
                                        <Link href="/api/hello"><a><li>Notre histoire</li></a></Link>
                                    </ul>
                                </nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row align="middle">
                                    <Link href="/api/hello"><a className="connect"><i className="fi-rr-user"></i>Se connecter<i className="fi-rr-angle-down arrow-down"> </i></a></Link>
                                    <Link href="/panier"><a href="" className="shop"><i className="fi-rr-shopping-cart shop-cart"><div class="num-articles-header"><p>2</p></div></i></a></Link>
                                </Row>
                            </Col>
                        </Row>
                    </Row>

                </Col>
            </Row>
        </header>
    )
}

export default Header
