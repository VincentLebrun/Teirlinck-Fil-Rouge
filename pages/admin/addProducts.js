import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout"
import { Button, Form, Input, Select, Tag, Table } from "antd";
import { Layout } from "antd";
import { admin } from "../../middleware/admin"
import { useRouter } from 'next/router'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const AddProducts = ({ token }) => {
  const { Header, Sider, Content } = Layout;
  const router = useRouter();

  const props = {
    name: 'file',
    multiple: false,
    accept: "image/*",
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
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
  useEffect(() => {
    if (!admin(token)) {
      router.push("/")
    }
  }, [])
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
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Glisser et déposer un fichier dans cette zone pour uploader</p>
            </Dragger>
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
