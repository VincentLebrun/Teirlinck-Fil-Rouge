import React, { useState } from "react";
import { Button, Form, Input, Select, Tag, Table } from "antd";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import Link from "next/link";
const AddProducts = () => {
  const { Header, Sider, Content } = Layout;

  const { Search } = Input;

  const onSearch = (value) => console.log(value);

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const [Product] = Form.useForm();
  const onFinish = async (values) => {
    console.log("J'ai ça ", values);
    const sendProducts = {
      name: values.name,
      description: values.description,
      image: values.image,
      categories: values.categories,
      allergenes: values.allergenes,
      price_type: values.price_type,
      price: values.price,
      promotion: false,
      highlighted: false,
      available: true,
    };
    await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendProducts),
    }).catch((err) => {
      console.log(err);
    });
  };
  const optionsAllergenes = [
    { value: "cereales" },
    { value: "oeuf" },
    { value: "celeri" },
    { value: "moutarde" },
  ];
  const options = [
    { value: "charcuterie" },
    { value: "vollaile" },
    { value: "viande" },
    { value: "porc" },
    { value: "agneau" },
    { value: "boeuf" },
    { value: "traiteur" },
    { value: "barbecue" },
  ];
  const options_price_type = [
    { value: "/kg", label: "/kg" },

    { value: "/pc", label: "/pc" },
  ];
  const tagRender = (props) => {
    const { label, black, closable, onClose } = props;

    return (
      <Tag
        color={black}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {" "}
          <Link href="/">
            <img src="/logo.svg" alt="" />
          </Link>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
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
        <Header
          className="site-layout-background header-admin"
          style={{ padding: 0 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => toggle(),
            }
          )}
          <Button type="primary"> Ajouter un produit</Button>
          <Search
            className="search-input"
            placeholder="Chercher un produit"
            onSearch={onSearch}
            style={{ width: 200 }}
          ></Search>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div>
            <Form
              form={Product}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="name"
                label="Nom du produit"
                rules={[
                  {
                    required: true,
                    message: "Vous avez oublié ce champ",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description du produit"
                rules={[
                  {
                    required: true,
                    message: "Vous avez oublié ce champ",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image du produit"
                rules={[
                  {
                    required: true,
                    message: "Vous avez oublié ce champ",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="categories"
                label="Choisissez le type de produit ex charcuterie etc (Choix multiples possible )"
                rules={[
                  {
                    required: true,
                    message: "Vous oublié ce champ",
                    type: "array",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  name="categories"
                  label="Type de produit ex: charcuterie, agneau..."
                  options={options}
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vous avez oublié ce champ",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Select>
              </Form.Item>
              <Form.Item
                name="allergenes"
                label="Allergenes"
                rules={[
                  {
                    required: true,
                    message: "Vous oublié ce champ",
                    type: "array",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  showArrow
                  name="allergenes"
                  tagRender={tagRender}
                  options={optionsAllergenes}
                  rules={[
                    {
                      required: false,
                      message: "Vous avez oublié ce champ",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Select>
              </Form.Item>
              <Form.Item
                
                label="Type de prix exemple /pc ou /kg"
                rules={[
                  {
                    required: true,
                    message: "Vous avez oublié ce champ",
                    whitespace: true,
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  showArrow
                  name="price_type"
                  tagRender={tagRender}
                  options={options_price_type}
                  rules={[
                    {
                      required: false,
                      message: "Vous avez oublié ce champ",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Select>
              </Form.Item>
              <Form.Item
                initialValue="10"
                name="price"
                label="Prix du produit"
                rules={[
                  {
                    required: true,
                    message: "Vous avez oublié ce champ",
                    whitespace: true,
                  },
                ]}
              >
                <Input step="0.1" min="0" type="number" />
              </Form.Item>

              <Form.Item>
                {" "}
                <Button className="button" htmlType="submit">
                  Ajouter un produit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddProducts;
async function getAdd() {}
