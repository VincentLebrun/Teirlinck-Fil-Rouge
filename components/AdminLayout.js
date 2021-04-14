import React from 'react'

import { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Table, Button, Input } from 'antd';
import Link from 'next/link'

const AdminLayout = ({columns, data}) => {
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
                <Table columns={columns} dataSource={data} rowKey="id" />


            </Content>

        </Layout>
    </Layout>
    )
}

export default AdminLayout
