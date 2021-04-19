import React from 'react'
import { useState } from 'react'
import { Layout, Menu, Row, Col } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import Link from 'next/link'

const Order = ({ data }) => {
    const { Header, Sider, Content } = Layout;

    const { Search } = Input;

    const onSearch = value => console.log(value);

    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const convertToDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month:'2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
        const result = date.toLocaleDateString('fr-FR', options);
        return result;
    }

    const listOrderProducts = data.products.map((item) => {
        return(
            <Row key={item.id} justify="start" align="middle">
                <p>{item.name} : {item.quantity} {item.price_type === "/kg" ? "grammes" : "pièce(s)"}</p>
            </Row>
        )
    })


    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo"> <Link href="/"><img src="/logo.svg" alt="" /></Link></div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        Produits
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        Ajouter un produit
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        Utilisateurs
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background header-admin" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => toggle(),
                    })}
                    <Button type="primary" > Ajouter un produit</Button>
                    <Search className="search-input" placeholder="Chercher un produit" onSearch={onSearch} style={{ width: 200 }}></Search>
                </Header>

                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >

                    <div className="orderDetail">
                        <Row>
                            <p>Commande numéro {data.numero} passée le {convertToDate(data.date)} par {data.user_firstname} {data.user_lastname} :</p>
                        </Row>
                        {listOrderProducts}
                        <p>Total estimé de la commande : {data.total} €</p>
                        <p>Numéro de téléphone du client : {data.user_phone}</p>
                        <p>Statut de la commande : {data.ready ? "prête" : "non prête"} et {data.delivered ? "délivrée" : "non délivrée"}</p>
                    </div>

                </Content>

            </Layout>
        </Layout>
    )
}

export default Order;

async function getOrder(id) {
    const res = await fetch("http://localhost:4000/orders/" + id)
        .then(response => response.json())

    return res;

}

export async function getServerSideProps({ params }) {
    const data = await getOrder(params.id);

    return {
        props: {
            data
        }
    }
}
