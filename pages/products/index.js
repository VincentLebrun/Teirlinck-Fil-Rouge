import React from 'react';
import { Menu, Row, Col } from 'antd';
import { RightOutlined } from "@ant-design/icons";
import Hero from '../../components/Hero';
import Header from "../../components/Header"
import Footer from "../../components/Footer";
import products from "../../product";

const { SubMenu } = Menu;


const Products = () => {
    return (
        <div>
            <Header />
            <Hero
                title="Nos produits"
                image="ourproducts.webp"
            />
            <div className="menu">
                <Row gutter={16} justify="center">
                    <Col xl={4}>
                        <Menu
                            //defaultSelectedKeys={['1']}
                            //defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                        >
                            <SubMenu key="sub1" title="Viandes">
                                <Menu.Item key="1"><RightOutlined className="iconMenu" />Boeuf</Menu.Item>
                                <Menu.Item key="2"><RightOutlined className="iconMenu" />Veau</Menu.Item>
                                <Menu.Item key="3"><RightOutlined className="iconMenu" />Agneau</Menu.Item>
                                <Menu.Item key="4"><RightOutlined className="iconMenu" />Porc</Menu.Item>
                                <Menu.Item key="5"><RightOutlined className="iconMenu" />Lapin</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="6">
                                Volaille
                            </Menu.Item>
                            <Menu.Item key="7">
                                Abats
                            </Menu.Item>
                            <Menu.Item key="8">
                                Barbecue
                            </Menu.Item>
                            <Menu.Item key="9">
                                Charcuterie
                            </Menu.Item>
                            <Menu.Item key="10">
                                Traiteur
                            </Menu.Item>
                            <Menu.Item key="11">
                                Promotions
                            </Menu.Item>
                            <Menu.Item key="12">
                                Nouveautés
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col xl={12}>
                        <Row gutter={16}>
                            <Col xl={8}><div className="product"><p>Bonjour</p></div></Col>
                            <Col xl={8}><div className="product"><p>Bonjour</p></div></Col>
                            <Col xl={8}><div className="product"><p>Bonjour</p></div></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    )
}

export default Products;
