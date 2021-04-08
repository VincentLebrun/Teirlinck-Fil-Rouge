import React, { useState } from 'react';
import { Menu, Row, Col } from 'antd';
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import Hero from '../../components/Hero';
import Header from "../../components/Header"
import Footer from "../../components/Footer";
import products from "../../product";

const { SubMenu } = Menu;

const Products = () => {

    const [produits, setProduits] = useState(products);

    // const getProduct = () => {
    //     setProduits(products);
    // }

    const renderProducts = () => {
        const listProducts = produits.map(item => {
          return (
            <Col key={item.id} xs={24} md={12} xl={8}>
                <Link href={`/products/${item.id}`}>
                    <div className="product">
                        <img src={item.image} alt=""/>
                        <p>{item.name}</p>
                    </div>
                </Link>
            </Col>
          );
        });

        return (
            <Row gutter={[16, 16]}>
              {listProducts}
            </Row>
        );
    }

    const renderFilteredProducts = (name) => {
        const filteredProducts = produits.filter((product) => product.categories.includes(name));
        setProduits(filteredProducts);
    }
        
    return (
        <div>
            <Header />
            <Hero
                title="Nos produits"
                image="ourproducts.webp"
            />
            <div className="products">
                <Row gutter={16} justify="center">
                    <Col xs={8} sm={6} xl={4}>
                        <Menu
                            //defaultSelectedKeys={['1']}
                            //defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                        >
                            <SubMenu key="sub1" title="Viandes">
                                <Menu.Item key="1" onClick={() => renderFilteredProducts("boeuf")}><RightOutlined className="iconMenu" />Boeuf</Menu.Item>
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
                    <Col xs={8} sm={10} xl={12}>
                        {renderProducts()}
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    )
}

export default Products;
