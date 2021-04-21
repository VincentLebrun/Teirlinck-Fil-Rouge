import React from 'react'
import Link from 'next/link'
import { Row, Col } from 'antd';

const Header = (props) => {
 
    return (
        <header>
            <Row justify="center" align="middle" className="header">
                <Col xs={21} sm={16} >
                    <Row justify="space-between" align="middle">
                        <Row align="middle">
                            <Col xs={6} sm={6}>
                                <Link href="/"><a><img src="/logo.svg" alt="" /></a></Link>
                            </Col>
                            <Col sm={18}>
                                <nav>
                                    <ul>
                                        <Link href="/"><li>Accueil</li></Link>
                                        <Link href="/products/"><li>Nos Produits</li></Link>
                                        <Link href="/notrehistoire"><li>Notre histoire</li></Link>
                                    </ul>
                                </nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row align="middle">
                                    {props.children}
                                    {/* <Link href="/connexion"><a className="connect"><i className="fi-rr-user"></i>Se connecter<i className="fi-rr-angle-down arrow-down"> </i></a></Link> */}
                                    <Link href="/panier"><a href="" className="shop"><i className="fi-rr-shopping-cart shop-cart"><div className="num-articles-header"><p>{props.panier_length}</p></div></i></a></Link>
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
