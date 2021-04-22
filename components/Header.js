import React from 'react'
import Link from 'next/link'
import { Row, Col } from 'antd';

const Header = (props) => {
 
    return (
        <header>
            <Row justify="center" align="middle" className="header">
                <Col xs={21} sm={20} lg={16} >
                    <Row justify="space-between" align="middle">
                        
                            <Col xs={10} md={8} lg={3}>
                                <Link href="/"><a><img src="/logo.svg" alt="" /></a></Link>
                            </Col>
                            <Col xs={0} md={0} lg={14}>
                                <nav>
                                    <ul>
                                        <Link href="/"><li>Accueil</li></Link>
                                        <Link href="/products/"><li>Nos Produits</li></Link>
                                        <Link href="/notrehistoire"><li>Notre histoire</li></Link>
                                    </ul>
                                </nav>
                            </Col>
                        
                       
                            <Col xs={12} md={14} lg={7}>
                                <Row align="middle">
                                    {props.children}
                                    {/* <Link href="/connexion"><a className="connect"><i className="fi-rr-user"></i>Se connecter<i className="fi-rr-angle-down arrow-down"> </i></a></Link> */}
                                    <Link href="/panier"><a href="" className="shop"><i className="fi-rr-shopping-cart shop-cart"><div className="num-articles-header"><p>{props.panier_length}</p></div></i></a></Link>
                                </Row>
                            </Col>
                            <Col xs={2} md={2} lg={0}>
                                <p>X</p>
                            </Col>
                        
                    </Row>

                </Col>
            </Row>
        </header>
    )
}

export default Header
