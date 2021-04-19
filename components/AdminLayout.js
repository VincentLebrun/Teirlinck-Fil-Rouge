import React from 'react'

import { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    FileAddOutlined,
    CopyOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { Table, Button, Input } from 'antd';
import Link from 'next/link'

const AdminLayout = (props) => {
    const { Header, Sider, Content } = Layout;

    const { Search } = Input;

    const onSearch = value => console.log(value);

    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };


    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo"> <Link href="/"><img src="/logo.svg" alt="" /></Link></div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[props.selectedKey]}>
                    <Menu.Item key="1" icon={<CopyOutlined />}>
                        <Link href="/admin">Produits</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FileAddOutlined />}>
                        <Link href="/admin/addProducts">Ajouter un produit</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                        <Link href="/admin/users">Utilisateurs</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<ShoppingOutlined />}>
                        <Link href="/admin/orders">Commandes</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background header-admin" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => toggle(),
                    })}
                    <Button type="primary" ><Link href="/admin/addProducts">Ajouter un produit</Link></Button>
                </Header>

                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >

                    {props.children}

                </Content>

            </Layout>
        </Layout>
    )
}

export default AdminLayout
