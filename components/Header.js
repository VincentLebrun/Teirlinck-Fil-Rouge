import { React, useState } from 'react'
import Link from 'next/link'
import { Row, Col } from 'antd';
import { Drawer, Button } from 'antd';
import { WindowsFilled } from '@ant-design/icons';
// import { AiOutlineMenuFold } from "react-icons/ai";

const Header = (props) => {

    const [visible, setVisible] = useState(false);
    const [scroll, setScroll] = useState(scrollY);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    window.onscroll = function () {
        setScroll(scrollY)
    }


    return (
        <header>
            <Row justify="center" align="middle" className={`header ${scroll > 200 ? "headerHeightDown" : "headerHeightTop"}`}>
                <Col xs={21} sm={20} lg={16} >
                    <Row justify="space-between" align="middle">

                        <Col xs={7} md={5} lg={3}>
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


                        <Col xs={15} md={14} lg={7}>
                            <Row align="middle" className="connectAndStore">
                                {props.children}
                                {/* <Link href="/connexion"><a className="connect"><i className="fi-rr-user"></i>Se connecter<i className="fi-rr-angle-down arrow-down"> </i></a></Link> */}
                                <Link href="/panier"><a href="" className="shop"><i className="fi-rr-shopping-cart shop-cart"><div className="num-articles-header"><p>{props.panier_length}</p></div></i></a></Link>
                                <Button className="burgerMenu" onClick={showDrawer}>
                                    <i className="fi-rr-align-justify"></i>
                                </Button>

                                <Drawer
                                    className="menu"
                                    placement="right"
                                    closable={true}
                                    onClose={onClose}
                                    visible={visible}
                                >

                                    <nav>
                                        <ul>
                                            <Link href="/"><li>Accueil</li></Link>
                                            <Link href="/products/"><li>Nos produits</li></Link>
                                            <Link href="/notrehistoire"><li>Notre histoire</li></Link>
                                        </ul>
                                    </nav>
                                </Drawer>
                            </Row>
                        </Col>

                    </Row>

                </Col>
            </Row>
        </header>
    )
}

export default Header
