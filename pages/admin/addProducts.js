import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout"
import { Button, Form, Input, Select, Tag, Table } from "antd";
import { Layout } from "antd";

import Link from "next/link";
const AddProducts = ({ token }) => {
  const { Header, Sider, Content } = Layout;

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
    await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendProducts),
    }).catch((err) => {
      console.log(err);
    });
  };
  const optionsAllergenes = [
    { value: "céréales" },
    { value: "oeuf" },
    { value: "céleri" },
    { value: "moutarde" },
    { value: "lait" },
  ];
  const options = [
    { value: "charcuterie" },
    { value: "volaille" },
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
    <AdminLayout selectedKey="2">
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
            <Input.TextArea />
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
            label="Choisissez le type de produit (ex : charcuterie, etc. - choix multiples possibles)"
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
            </Select>
          </Form.Item>
          <Form.Item
            name="allergenes"
            label="Allergènes"
            rules={[
              {
                required: false,
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
            </Select>
          </Form.Item>
          <Form.Item

            label="Type de prix"
            name="price_type"
            rules={[
              {
                required: true,
                message: "Vous avez oublié ce champ",
                whitespace: true,
              },
            ]}
          >
            <Select options={options_price_type}>

            </Select>
            {/* <Select
                  showArrow
                  name="price_type"
                  options={options_price_type}
                  rules={[
                    {
                      required: true,
                      message: "Vous avez oublié ce champ",
                      whitespace: true,
                    },
                  ]}
                >
                  
                </Select> */}
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
            <Input step="0.01" min="0" type="number" />
          </Form.Item>

          <Form.Item>
            {" "}
            <Button className="button" htmlType="submit">
              Ajouter un produit
                </Button>
          </Form.Item>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AddProducts;
