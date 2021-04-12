import React, { useState } from "react";
import { Button, Row, Col, Form, Input, Select } from "antd";
const { Option } = Select;
const RegistrationForm = () => {
  const [form] = Form.useForm();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="+33">+33</Option>
      </Select>
    </Form.Item>
  );
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <main>
      
      <Row   className="container" xl={16}>
        <Col xl={10}>
      <img src="/logo.svg" alt="" />
       <hr/>
       </Col>
        <Col xl={16}>
          
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              prefix: "+33",
            }}
            scrollToFirstError
          >
            <Row className="contain" justify="space-around" xl={24}>
              <Form.Item
                name="fisrtName"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre prénom",
                    whitespace: true,
                  },
                ]}
              >
                <label>Prénom</label>
                <Input />
              </Form.Item>

              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrez votre nom",
                    whitespace: true,
                  },
                ]}
              >
                <label>Nom</label>
                <Input />
              </Form.Item>
            </Row>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir un numéro de téléphone",
                },
              ]}
            >
              {" "}
              <label>Numéro de téléphone</label>
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "L'e-mail n'est pas valide",
                },
                {
                  required: true,
                  message: "Veuillez taper un e-mail",
                },
              ]}
            >
              <label>E-mail</label>
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer un mot de passe",
                },
              ]}
            >
              <label>Mot de passe"</label>
              <Input.Password />
            </Form.Item>{" "}
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Confirmez votre mot de passe",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Les 2 mot de passe ne correspondent pas ")
                    );
                  },
                }),
              ]}
            >
              <label>Confirmez le mot de passe</label>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button className="button" htmlType="submit">
               Se connecter 
              </Button>
            </Form.Item>
            <hr />
          </Form>
        </Col>
      </Row>
    </main>
  );
};

export default RegistrationForm;
