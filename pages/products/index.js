import { useState, useEffect } from 'react';
import { Menu, Row, Col, Input } from 'antd';
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import Hero from '../../components/Hero';
import Footer from "../../components/Footer";
import Seemore from '../../components/Seemore';

const { SubMenu } = Menu;


const Products = ({ data, manager }) => {

    const { Search } = Input;
    const [message, setMessage] = useState('')
    const [produits, setProduits] = useState(data);
    const [produitsFiltres, setProduitsFiltres] = useState(data);
    const [slice, setSlice] = useState(9);

    const seeMore = () => {
        setSlice(slice + 9)
    }

    const onSearch = (value) => {
        setMessage('')
        value = value.toLowerCase();
        const filteredProducts = produits.filter((item) => item.name.toLowerCase().includes(value));
        setProduitsFiltres(filteredProducts);
        if (filteredProducts.length <= 0) {
            setMessage("Aucun produit ne correspond à votre recherche.")
        }
    }

    const renderProducts = () => {
        const listProducts = produitsFiltres.slice(0, slice).map(item => {
            return (
                <Col key={item.id} sm={22} lg={12} xxl={8}>
                    <Link href={`/products/${item._id}`}>
                        <div className="product">
                            <img src={process.env.NEXT_PUBLIC_URL + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.price}€ {item.price_type === "/kg" ? "/kg" : "/pc"}</p>
                        </div>
                    </Link>
                </Col>
            );
        });

        return (
            <Row justify="center" gutter={[16, 16]}>
                {listProducts}
            </Row>
        );
    }

    const renderFilteredProducts = (name) => {
        setMessage('')
        setSlice(+9)
        if (name != "promotions" && name != "news") {
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
            <div className="top-color"></div>
            <Hero
                title="Nos produits"
                image="ourproducts.webp"
            />
            <div className="products">
                <Row gutter={[24, 24]} justify="center">
                    <Col xs={22} xl={16}>
                        <Search className="search-input" placeholder="Chercher un produit par nom" onSearch={onSearch} style={{ width: 250 }}></Search>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col xs={22} xl={16}>
                        <Row gutter={16} justify="space-between">
                            <Col xs={12} xl={6}>
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
                                    <Menu.Item className="mg-bt-0" key="12" onClick={() => renderFilteredProducts("news")}>
                                        Nouveautés
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col xl={18}>
                                {renderProducts()}
                                <p>{message}</p>
                                <Row justify="center">
                                    <Seemore
                                        action={() => seeMore()}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Footer manager={manager} />
        </div>
    )
}

export default Products;

async function getProducts() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS)
        .then(response => response.json())

    return res;

}

// getServerSideProps

export async function getServerSideProps() {
    const data = await getProducts();

    return {
        props: {
            data,
        },
    };
}