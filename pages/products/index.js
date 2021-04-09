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
    const [produitsFiltres, setProduitsFiltres] = useState(products);
    const [slice, setSlice] = useState(9);

    // Pour le useEffect (appel API)
    // const getProduct = () => {
    //     setProduits(products);
    // }

    const seeMore = () => {
        setSlice(slice+9)
    }

    const renderProducts = () => {
        const listProducts = produitsFiltres.slice(0, slice).map(item => {
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

        if (name != "promotions" && name != "news" ) {
            const filteredProducts = produits.filter((product) => product.categories.includes(name));
            setProduitsFiltres(filteredProducts);
        } else if (name === "promotions") {
            const filteredProducts = produits.filter((product) => product.promotion === true);
            setProduitsFiltres(filteredProducts);
        } else {
            const filteredProducts = produits.filter((product) => product.highlighted === true);
            setProduitsFiltres(filteredProducts);
        }
    }
        
    return (
        <div className="ourproducts">
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
                                <Menu.Item key="2" onClick={() => renderFilteredProducts("veau")}><RightOutlined className="iconMenu" />Veau</Menu.Item>
                                <Menu.Item key="3" onClick={() => renderFilteredProducts("agneau")}><RightOutlined className="iconMenu" />Agneau</Menu.Item>
                                <Menu.Item key="4" onClick={() => renderFilteredProducts("porc")}><RightOutlined className="iconMenu" />Porc</Menu.Item>
                                <Menu.Item key="5" onClick={() => renderFilteredProducts("lapin")}><RightOutlined className="iconMenu" />Lapin</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="6" onClick={() => renderFilteredProducts("volaille")}>
                                Volaille
                            </Menu.Item>
                            <Menu.Item key="7" onClick={() => renderFilteredProducts("abats")}>
                                Abats
                            </Menu.Item>
                            <Menu.Item key="8" onClick={() => renderFilteredProducts("barbecue")}>
                                Barbecue
                            </Menu.Item>
                            <Menu.Item key="9" onClick={() => renderFilteredProducts("charcuterie")}>
                                Charcuterie
                            </Menu.Item>
                            <Menu.Item key="10" onClick={() => renderFilteredProducts("traiteur")}>
                                Traiteur
                            </Menu.Item>
                            <Menu.Item key="11" onClick={() => renderFilteredProducts("promotions")}>
                                Promotions
                            </Menu.Item>
                            <Menu.Item key="12" onClick={() => renderFilteredProducts("news")}>
                                Nouveautés
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col xs={8} sm={10} xl={12}>
                        {renderProducts()}
                    </Col>
                </Row>
                <Row justify="center" align="middle">
                    <Col xs={8} sm={6} xl={4}></Col>
                    <Col xs={8} sm={10} xl={12}><p onClick={() => seeMore() }>Voir plus</p></Col>
                </Row>
                
            </div>
            <Footer />
        </div>
    )
}

export default Products;
