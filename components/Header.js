import React from 'react'
import Link from 'next/link'
import { Row, Col } from 'antd';
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const Header = () => {
    return (
        <header>
            <Row justify="center" align="middle">
                <Col xl={16} >
                    <Row justify="space-between" align="middle">
                        <Row align="middle">
                            <Col xl={6}>
                                <Link href="/"><a><img src="/logo.svg" alt="" /></a></Link>
                            </Col>
                            <Col xl={18}>
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
                            <Col align="middle">
                                <Link href="/api/hello"><a className="connect"><i className="fi-rr-user"></i>Se connecter<i className="fi-rr-angle-down"> </i></a></Link>
                                <Link href="/panier"><a href="" className="shop"><i className="fi-rr-shopping-cart"></i></a></Link>
                            </Col>
                        </Row>
                    </Row>

                </Col>
            </Row>
        </header>
    )
}

export default Header
