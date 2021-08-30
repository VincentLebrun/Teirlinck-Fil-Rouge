import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout"
import { Button, Form, Input, Select, Tag, Table, notification } from "antd";
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
    name: 'productFile',
    multiple: false,
    accept: "image/*",
    maxCount: 1
  };

  function normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      e.fileList.shift();
    }
    return e && e.fileList;
  }

  const [Product] = Form.useForm();
  const onFinish = async (values) => {
    console.log("J'ai ça ", values);

    const formData = new FormData();
    formData.append("productImage", values.image[0].originFileObj);
    formData.append("name", values.name);
    formData.append("description", values.description);
    for (var i = 0; i < values.categories.length; i++) {
      formData.append('categories[]', values.categories[i]);
    }
    for (var i = 0; i < values.allergenes.length; i++) {
      formData.append('allergenes[]', values.allergenes[i]);
    }
    formData.append("price_type", values.price_type);
    formData.append("price", values.price);
    formData.append("promotion", false);
    formData.append("highlighted", false);
    formData.append("available", true);

    const res = await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).catch((err) => {
      console.log(err);
    });

    if (res.status && res.status === 200) {
      notification['success']({
        message: "BRAVO",
        description: "BRAVO, vous venez de rajouter un produit sur le site boucherie-teirlinck.fr ! Vous pouvez maintenant le consulter dans votre liste de produits ",
        placement: "topRight",
        duration: 0,
        style: {
          width: 500,
        }
      })
    } else {
      notification['error']({
        message: "OUPS",
        description: "Une erreur s'est produite, votre produit n'a pas été ajouté, veuillez réessayer",
        placement: "topRight",
        duration: 0,
        style: {
          width: 500,
        }
      })
    }

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
            valuePropName="fileList"
            getValueFromEvent={normFile}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please select your country!',
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
            initialValue={[]}
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
            initialValue={[]}
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
